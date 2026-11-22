import React, { useEffect, useRef, useState } from 'react';
import { Bot, X, Send, MessageCircle, Bell, BellOff, Check, CheckCheck } from 'lucide-react';
import { notifyError } from '../lib/notify';
import { createLiveConversation, fetchLiveMessages, fetchUserLiveConversation, getLiveGuestToken, linkGuestConversationToUser, markConversationSeen, saveLiveMessage, requestLiveAi, updateMessageStatus } from '../services/api';

const conversationKey = (user, guestToken) => user?.id ? `sr_live_support_user_conversation_id_${user.id}` : `sr_live_support_guest_conversation_id_${guestToken}`;

export default function AiChatWidget({ enabled = true, user, settings = {} }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const guestToken = getLiveGuestToken();
  const [conversationId, setConversationId] = useState(() => localStorage.getItem(conversationKey(user, guestToken)));
  const [messages, setMessages] = useState([]);
  const [busy, setBusy] = useState(false);
  const messageListRef = useRef(null);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [unread, setUnread] = useState(0);
  const [sound, setSound] = useState(() => localStorage.getItem('sr_live_support_sound_enabled') !== 'false');
  const knownIds = useRef(new Set());
  const firstLoad = useRef(true);
  const alertSound = () => { try { const c = new (window.AudioContext || (window as any).webkitAudioContext)(); const o = c.createOscillator(); const g = c.createGain(); o.frequency.value = 880; g.gain.setValueAtTime(.08, c.currentTime); g.gain.exponentialRampToValueAtTime(.001, c.currentTime + .3); o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + .3); } catch {} };

  const loadMessages = async (cid) => {
    if (!cid) return;
    try {
      const rows = await fetchLiveMessages(cid);
      const next = rows.map((row) => ({ ...row, role: row.sender_type === 'USER' ? 'user' : 'assistant', text: row.content }));
      const incoming = next.filter((row) => !knownIds.current.has(row.id) && ['AI', 'AGENT'].includes(row.sender_type));
      next.forEach((row) => knownIds.current.add(row.id));
      if (!firstLoad.current && incoming.length && !open) {
        setUnread((value) => value + incoming.length);
        if (sound) alertSound();
        if ('Notification' in window && Notification.permission === 'granted') {
          const notification = new Notification('New reply from SR Support', { body: incoming[incoming.length - 1].content, tag: 'sr-live-support' });
          notification.onclick = () => { window.focus(); window.dispatchEvent(new Event('sr:open-live-support')); notification.close(); };
        }
      }
      firstLoad.current = false;
      if (open) {
        const list = messageListRef.current;
        const nearBottom = !list || list.scrollHeight - list.scrollTop - list.clientHeight < 100;
        if (nearBottom || incoming.length === 0) requestAnimationFrame(() => { if (list) list.scrollTop = list.scrollHeight; });
        else if (incoming.length) setShowNewMessage(true);
      }
      setMessages(next);
    } catch {}
  };

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        if (user?.id) await linkGuestConversationToUser({ guestToken, userId: user.id, userName: user.name, userEmail: user.email, userAvatarUrl: user.avatar_url });
        const existing = await fetchUserLiveConversation({ userId: user?.id || null, guestToken: user ? null : guestToken });
        if (active && existing?.id) { localStorage.setItem(conversationKey(user, guestToken), existing.id); setConversationId(existing.id); }
      } catch {}
    })();
    loadMessages(conversationId);
    // Poll for agent replies while the widget is open so manual support replies appear live.
    const timer = setInterval(() => { if (conversationId) loadMessages(conversationId); }, 3000);
    return () => { active = false; clearInterval(timer); };
  }, [conversationId, open, sound, user?.id]);
  useEffect(() => { if (open) { setUnread(0); if (conversationId) markConversationSeen(conversationId, 'USER').catch(() => {}); } }, [open, conversationId]);
  const toggleOpen = () => { setOpen((value) => !value); setUnread(0); };
  useEffect(() => {
    const openFromNotification = (event) => {
      const targetId = event.detail?.conversationId;
      if (targetId && targetId !== conversationId) { localStorage.setItem(conversationKey(user, guestToken), targetId); setConversationId(targetId); }
      setOpen(true); setUnread(0);
    };
    window.addEventListener('sr:open-live-support', openFromNotification);
    window.addEventListener('sr:auto-open-support', openFromNotification);
    return () => { window.removeEventListener('sr:open-live-support', openFromNotification); window.removeEventListener('sr:auto-open-support', openFromNotification); };
  }, [conversationId, user?.id, guestToken]);
  useEffect(() => {
    if (open && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {});
    }
  }, [open]);
  const toggleSound = () => { const value = !sound; setSound(value); localStorage.setItem('sr_live_support_sound_enabled', String(value)); };

  const ensureConversation = async () => {
    if (conversationId) return conversationId;
    const conversation = await createLiveConversation({
      userId: user?.id || null,
      guestToken: user ? null : getLiveGuestToken(),
      userName: user?.name || null,
      userEmail: user?.email || null,
      userAvatarUrl: user?.avatar_url || null,
      title: user?.name ? `Support: ${user.name} (${user.id})` : 'Guest Live Support Conversation'
    });
    localStorage.setItem(conversationKey(user, guestToken), conversation.id);
    setConversationId(conversation.id);
    return conversation.id;
  };

  if (!enabled) return null;

  const send = async (event) => {
    event.preventDefault();
    const text = message.trim();
    if (!text || busy) return;
    setBusy(true);
    try {
      const id = await ensureConversation();
      const saved = await saveLiveMessage({ conversation_id: id, guest_token: user ? null : getLiveGuestToken(), sender_type: 'USER', sender_id: user?.id || null, content: text, message_status: 'SENT' });
      setMessages((previous) => [...previous, { ...saved, role: 'user', text, message_status: 'SENT' }]); setMessage('');
      try {
        const ai = await requestLiveAi({ conversationId: id, message: text, userId: user?.id || null });
        await updateMessageStatus(saved.id, 'DELIVERED');
        const answer = ai?.answer || 'I could not generate an answer right now.';
        setMessages((previous) => [...previous, { role: 'assistant', text: answer }]);
        if (ai?.handoff_requested) {
          setMessages((previous) => [...previous, { role: 'assistant', text: 'Your request has been forwarded to our support team. Please stay in this conversation.' }]);
        }
      } catch {
        const fallback = 'Your message was saved. Live Support is temporarily unavailable; please stay in this conversation for a response.';
        await saveLiveMessage({ conversation_id: id, guest_token: user ? null : getLiveGuestToken(), sender_type: 'AI', content: fallback, provider: 'fallback', model: 'offline' });
        setMessages((previous) => [...previous, { role: 'assistant', text: fallback }]);
      }
    } catch (error) { notifyError('Live Support Unavailable', error?.message || 'Your message could not be saved.'); }
    finally { setBusy(false); }
  };

  const positionClass = (settings as any).support_widget_position === 'bottom-left' ? 'left-5 bottom-5' : (settings as any).support_widget_position === 'top-left' ? 'left-5 top-5' : (settings as any).support_widget_position === 'top-right' ? 'right-5 top-5' : 'right-5 bottom-5';
  const sizeClass = (settings as any).support_widget_size === 'compact' ? 'w-[min(92vw,320px)] h-[440px]' : (settings as any).support_widget_size === 'large' ? 'w-[min(95vw,440px)] h-[620px]' : 'w-[min(92vw,360px)] h-[500px]';
  const radiusClass = (settings as any).support_border_radius === 'small' ? 'rounded-xl' : (settings as any).support_border_radius === 'square' ? 'rounded-none' : 'rounded-3xl';
  const animationClass = (settings as any).support_open_animation === 'fade' ? 'animate-fade-in' : (settings as any).support_open_animation === 'scale' ? 'animate-scale-in' : (settings as any).support_open_animation === 'none' ? '' : 'animate-slide-up';
  const widgetStyle = { '--support-primary': (settings as any).support_primary_color || '#071738', '--support-accent': (settings as any).support_accent_color || '#fbbf24', '--support-header': (settings as any).support_header_color || '#0e3b91', '--support-agent': (settings as any).support_agent_bubble_color || '#0c265e' };
  return (
    <div className={`fixed ${positionClass} z-[9999] pointer-events-auto`} style={widgetStyle as any}>
      {open && (
        <div className={`mb-3 ${sizeClass} ${radiusClass} border border-amber-400/40 bg-[var(--support-primary)] shadow-2xl flex flex-col overflow-hidden ${animationClass}`}>
          <div className="p-4 bg-gradient-to-r from-[#0e3b91] to-[#071738] border-b border-[#173b7d] flex items-center justify-between">
            <div className="flex items-center gap-2"><div className="w-9 h-9 rounded-full bg-[var(--support-accent)] text-slate-950 flex items-center justify-center overflow-hidden">{(settings as any).support_logo_url || (settings as any).support_agent_avatar_url || (settings as any).support_ai_avatar_url ? <img src={(settings as any).support_logo_url || (settings as any).support_agent_avatar_url || (settings as any).support_ai_avatar_url} alt="Support" className="w-full h-full object-cover" /> : <Bot className="w-5 h-5" />}</div><div><p className="text-sm font-black text-white">{(settings as any).live_support_label || 'Live Support'}</p><p className="text-[10px] text-emerald-300">● Online · conversation saved</p></div></div>
            <div className="flex items-center gap-2"><button type="button" onClick={toggleSound} title="Toggle notification sound" className="text-slate-300 hover:text-white">{sound ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}</button><button onClick={() => setOpen(false)} className="text-slate-300 hover:text-white"><X className="w-5 h-5" /></button></div>
          </div>
          <div ref={messageListRef} onScroll={(event) => { const list = event.currentTarget; if (list.scrollHeight - list.scrollTop - list.clientHeight < 80) setShowNewMessage(false); }} className="relative flex-1 overflow-y-auto p-3 space-y-3">{showNewMessage && <button type="button" onClick={() => { setShowNewMessage(false); if (messageListRef.current) messageListRef.current.scrollTop = messageListRef.current.scrollHeight; }} className="sticky top-1 z-10 mx-auto block rounded-full bg-amber-400 px-3 py-1 text-[10px] font-black text-slate-950 shadow-lg">↓ New message</button>}{messages.length === 0 && <p className="text-center text-xs text-slate-400 py-10">Ask anything about SR Investment.</p>}{messages.map((item, index) => <div key={item.id || index} className={`flex gap-2 ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${item.role === 'user' ? 'bg-[var(--support-accent)] text-slate-950' : 'bg-[var(--support-agent)] text-slate-200'}`}>{item.quoted_content && <div className="mb-2 rounded-lg border-l-2 border-amber-300/70 bg-black/15 px-2 py-1.5 text-[10px] leading-snug opacity-80"><span className="block font-black text-amber-200">Replying to your message</span><span className="block truncate">“{item.quoted_content}”</span></div>}{item.text}<div className={`mt-1 text-[9px] ${item.role === 'user' ? 'text-right' : 'text-slate-400'}`}>{item.role === 'user' && (item.message_status === 'DELIVERED' || item.message_status === 'SEEN' ? <CheckCheck className="inline w-3 h-3 text-emerald-400" /> : <Check className="inline w-3 h-3" />)} {item.sender_type === 'AGENT' ? 'Support agent' : item.sender_type === 'AI' ? 'Live Support' : ''}</div></div></div>)}</div>
          <form onSubmit={send} className="p-3 border-t border-[#173b7d] flex gap-2"><input value={(message ?? '')} onChange={(e) => setMessage(e.target.value)} disabled={busy} placeholder={busy ? 'Saving...' : 'Ask Live Support...'} className="flex-1 min-w-0 px-3 py-2 rounded-xl bg-[#030c1f] border border-[#173a78] text-white text-xs" /><button disabled={busy} className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center"><Send className="w-4 h-4" /></button></form>
        </div>
      )}
      <button type="button" onClick={toggleOpen} className={`relative w-14 h-14 rounded-full text-slate-950 shadow-2xl flex items-center justify-center hover:scale-105 transition ${(settings as any).support_button_animation === 'none' ? '' : 'animate-pulse'}`} style={{ background: (settings as any).support_accent_color || '#fbbf24' }} aria-label="Open Live Support"><MessageCircle className="w-6 h-6" />{unread > 0 && <span className="absolute -right-1 -top-1 min-w-5 h-5 px-1 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center border-2 border-[#071738]">{unread > 9 ? '9+' : unread}</span>}</button>
    </div>
  );
}
