import React, { useEffect, useState, useCallback } from 'react';
import { MessagesSquare, Send, RefreshCw, User as UserIcon, Bot, Headset, CircleDot } from 'lucide-react';

function initials(name = 'User') {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'U';
}

function Avatar({ name, src, className = 'w-8 h-8' }) {
  if (src) return <img src={src} alt={name || 'User'} className={`${className} rounded-full object-cover border border-amber-400/40`} />;
  return <div className={`${className} rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 text-slate-950 flex items-center justify-center text-[10px] font-black`}>{initials(name)}</div>;
}
import { notifyError, notifySuccess } from '../../lib/notify';
import { fetchLiveConversations, fetchConversationMessages, markConversationSeen, sendAgentReply, updateConversationStatus } from '../../services/api';

const STATUS_STYLES = {
  OPEN: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  WAITING_FOR_HUMAN: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
  ANSWERED: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
  CLOSED: 'bg-slate-500/20 text-slate-400 border-slate-500/40',
};

export default function SupportMessages({ initialConversationId = null, onConversationOpened }) {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');
  const [busy, setBusy] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [replyStatus, setReplyStatus] = useState('');
  const [replyTarget, setReplyTarget] = useState(null);
  const threadRef = React.useRef(null);

  const loadConversations = useCallback(async () => {
    setLoadingList(true);
    try { setConversations(await fetchLiveConversations()); }
    catch (e) { notifyError('Load Failed', e.message); }
    finally { setLoadingList(false); }
  }, []);

  useEffect(() => {
    if (messages.length && threadRef.current) requestAnimationFrame(() => { threadRef.current.scrollTop = threadRef.current.scrollHeight; });
  }, [messages]);
  useEffect(() => {
    if (!initialConversationId) return;
    setActiveId(initialConversationId);
    markConversationSeen(initialConversationId, 'ADMIN').catch(() => {});
    fetchConversationMessages(initialConversationId).then((rows) => { setMessages(rows); onConversationOpened?.(); requestAnimationFrame(() => { if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight; }); }).catch(() => {});
  }, [initialConversationId]);

  useEffect(() => {
    loadConversations();
    const autoOpen = async (event) => {
      const id = event.detail?.conversationId;
      if (!id) return;
      setActiveId(id);
      setReply('');
      setReplyStatus('');
      setConversations((rows) => rows.map((row) => row.id === id ? { ...row, unread_for_admin: 0 } : row));
      markConversationSeen(id, 'ADMIN').then(() => loadConversations()).catch(() => {});
      try { const rows = await fetchConversationMessages(id); setMessages(rows); requestAnimationFrame(() => requestAnimationFrame(() => { if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight; })); } catch (e) { notifyError('Messages Load Failed', e.message); }
    };
    window.addEventListener('sr:auto-open-support', autoOpen);
    return () => window.removeEventListener('sr:auto-open-support', autoOpen);
  }, [loadConversations]);

  const openConversation = async (id) => {
    setActiveId(id);
    setReply('');
    setReplyStatus('');
    setConversations((rows) => rows.map((row) => row.id === id ? { ...row, unread_for_admin: 0 } : row));
    markConversationSeen(id, 'ADMIN').then(() => loadConversations()).catch((error) => console.warn('Conversation seen update failed:', error.message));
    try {
      const rows = await fetchConversationMessages(id);
      setMessages(rows);
      requestAnimationFrame(() => requestAnimationFrame(() => { if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight; }));
    } catch (e) { notifyError('Messages Load Failed', e.message); }
  };

  const sendReply = async (e) => {
    e.preventDefault();
    const text = reply.trim();
    if (!text || !activeId || busy) return;
    setBusy(true);
    try {
      await sendAgentReply({ conversationId: activeId, content: text, replyToMessageId: replyTarget?.id || null, quotedContent: replyTarget?.content || null });
      setReply('');
      setReplyTarget(null);
      setReplyStatus('SENT');
      setMessages(await fetchConversationMessages(activeId));
      await loadConversations();
    } catch (err) { setReplyStatus('FAILED'); notifyError('Reply Failed', err.message); }
    finally { setBusy(false); }
  };

  const changeStatus = async (status) => {
    if (!activeId) return;
    try {
      await updateConversationStatus(activeId, status);
      await loadConversations();
      notifySuccess('Status Updated', `Conversation marked ${status}.`);
    } catch (err) { notifyError('Status Failed', err.message); }
  };

  const active = conversations.find((c) => c.id === activeId);
  const msgCount = (conv) => {
    const rel = conv.ai_chat_messages;
    if (Array.isArray(rel)) return rel[0]?.count ?? 0;
    return rel?.count ?? 0;
  };

  return (
    <div className="bg-[#071738] border border-[#173b7d] rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#173b7d]">
        <div className="flex items-center gap-2">
          <MessagesSquare className="w-5 h-5 text-amber-400" />
          <h3 className="font-black text-white text-sm">Support Messages</h3>
          <span className="px-2 py-0.5 rounded-full bg-[#030c1f] text-slate-400 text-[10px] font-bold">{conversations.length} conversations</span>
        </div>
        <button onClick={loadConversations} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#030c1f] border border-[#173b7d] text-slate-300 text-[11px] font-bold hover:text-white">
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-4">
        {/* Conversation list */}
        <div className="lg:col-span-4 space-y-2 max-h-[560px] overflow-y-auto pr-1">
          {loadingList && <p className="text-xs text-slate-400 py-6 text-center">Loading conversations...</p>}
          {!loadingList && conversations.length === 0 && <p className="text-xs text-slate-400 py-6 text-center">No live support conversations yet.</p>}
          {conversations.map((conv) => (
            <button key={conv.id} onClick={() => openConversation(conv.id)}
              className={`w-full text-left rounded-xl p-3 border transition ${activeId === conv.id ? 'bg-[#0c265e] border-amber-400/60' : conv.unread_for_admin > 0 ? 'bg-amber-400/10 border-amber-400/60 hover:border-amber-300' : 'bg-[#030c1f] border-[#173b7d] hover:border-[#1d4ed8]'}`}>
              <div className="flex items-center gap-2">
                <Avatar name={conv.display_name} src={conv.display_avatar_url} className="w-8 h-8" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-white truncate">{conv.display_name}</span><span className="px-1.5 py-0.5 rounded text-[8px] font-black bg-slate-700 text-slate-200">{conv.visitor_type === 'LOGGED_USER' || conv.user_id ? 'LOGGED USER' : 'GUEST'}</span>{conv.unread_for_admin > 0 && <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white text-[9px] font-black">{conv.unread_for_admin} NEW</span>}
                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-black border ${STATUS_STYLES[conv.status] || STATUS_STYLES.OPEN}`}>{conv.status}</span>
                  </div>
                  <p className="text-[10px] text-amber-300 truncate">ID: {conv.user_id || (conv.guest_token ? `GUEST-${String(conv.guest_token).slice(0, 8)}` : 'N/A')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                <span className="truncate">{conv.display_email || 'Guest / email unavailable'}</span>
                <span>·</span>
                <span>{conv.message_count || 0} msg(s)</span>
              </div>
              {conv.updated_at && <p className="text-[9px] text-slate-500 mt-1">{new Date(conv.updated_at).toLocaleString()}</p>}
            </button>
          ))}
        </div>

        {/* Message thread */}
        <div className="lg:col-span-8 bg-[#030c1f] border border-[#173b7d] rounded-xl flex flex-col min-h-[420px]">
          {!activeId && (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 gap-2 py-16">
              <Headset className="w-8 h-8" />
              <p className="text-xs">Select a conversation to view messages.</p>
            </div>
          )}
          {activeId && (
            <>
              <div className="p-3 border-b border-[#173b7d] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Avatar name={active?.display_name} src={active?.display_avatar_url} className="w-9 h-9" />
                  <div className="min-w-0">
                    <p className="text-xs font-black text-white truncate">{active?.display_name || active?.title || 'Live Support Conversation'}</p>
                    <p className="text-[10px] text-amber-300 truncate">ID: {active?.user_id || activeId}</p>
                    <p className="text-[10px] text-slate-400 truncate">{active?.display_email || 'Guest / email unavailable'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {active?.status !== 'CLOSED' && <button onClick={() => changeStatus('CLOSED')} className="px-2 py-1 rounded-lg bg-rose-500/15 border border-rose-500/40 text-rose-300 text-[10px] font-bold">Close</button>}
                  {active?.status === 'CLOSED' && <button onClick={() => changeStatus('OPEN')} className="px-2 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold">Reopen</button>}
                </div>
              </div>

              <div ref={threadRef} className="flex-1 overflow-y-auto p-3 space-y-2 max-h-[380px]">
                {messages.length === 0 && <p className="text-center text-xs text-slate-500 py-10">No messages in this conversation.</p>}
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-2 ${msg.sender_type === 'USER' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender_type !== 'USER' && (
                      <div className="w-6 h-6 rounded-lg bg-[#0c265e] flex items-center justify-center shrink-0 mt-0.5">
                        {msg.sender_type === 'AI' ? <Bot className="w-3.5 h-3.5 text-sky-300" /> : <Headset className="w-3.5 h-3.5 text-emerald-300" />}
                      </div>
                    )}
                    <div className="max-w-[75%]">
                      <div className={`rounded-2xl px-3 py-2 text-xs leading-relaxed ${msg.sender_type === 'USER' ? 'bg-amber-400 text-slate-950' : msg.sender_type === 'AI' ? 'bg-[#0c265e] text-slate-200' : 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-100'}`}>
                        {msg.quoted_content && <div className="mb-1 border-l-2 border-amber-300/60 pl-2 text-[10px] opacity-70">↳ {msg.quoted_content}</div>}
                        {msg.content}
                      </div>
                      <p className="text-[9px] text-slate-500 mt-0.5 flex items-center gap-1">
                        <CircleDot className="w-2.5 h-2.5" />
                        {msg.sender_type}{msg.created_at ? ` · ${new Date(msg.created_at).toLocaleTimeString()}` : ''}
                        <button type="button" onClick={() => setReplyTarget(msg)} className="ml-2 text-amber-300 hover:text-amber-200">Reply</button>
                      </p>
                    </div>
                    {msg.sender_type === 'USER' && (
                      <div className="w-6 h-6 rounded-lg bg-amber-400/20 flex items-center justify-center shrink-0 mt-0.5">
                        <UserIcon className="w-3.5 h-3.5 text-amber-300" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={sendReply} className="p-3 border-t border-[#173b7d] flex gap-2 flex-wrap">
                {replyTarget && <div className="w-full text-[10px] text-amber-300 border-l-2 border-amber-400 pl-2">Replying to: {replyTarget.content}<button type="button" onClick={() => setReplyTarget(null)} className="ml-2 text-slate-400">Cancel</button></div>}
                {replyStatus && <span className={`self-center text-[10px] ${replyStatus === 'FAILED' ? 'text-rose-300' : 'text-emerald-300'}`}>{replyStatus === 'SENT' ? '✓ Sent' : '✕ Failed'}</span>}
                <div className="flex-1 min-w-0 rounded-xl bg-[#071738] border border-[#173a78] focus-within:border-amber-400"><textarea value={reply} onChange={(e) => setReply(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); e.currentTarget.form?.requestSubmit(); } }} disabled={busy} rows={2} maxLength={2000} placeholder="Write a professional reply... (Enter to send, Shift+Enter for new line)" className="w-full resize-none bg-transparent px-3 py-2 text-white text-xs outline-none"/><div className="px-3 pb-1 text-right text-[9px] text-slate-500">{reply.length}/2000</div></div>
                <button disabled={busy || !reply.trim()} className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 flex items-center gap-1.5 text-xs font-black disabled:opacity-50">
                  <Send className="w-3.5 h-3.5" /> {busy ? 'Sending...' : 'Send'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}