import React, { useEffect, useRef, useState } from 'react';
import { Bell, CheckCheck, ExternalLink } from 'lucide-react';
import { fetchNotifications, markAllNotificationsRead, markNotificationRead, markNotificationSeen } from '../services/api';
import { supabase } from '../lib/supabaseClient';

const ICONS = { SUPPORT: '💬', TICKET: '🎫', DEPOSIT: '💳', WITHDRAWAL: '💸', INVESTMENT: '📈', INBOX: '✉️', ACCOUNT: '👤', SYSTEM: '🔔' };

export default function NotificationCenter({ userId, isAdmin = false, onNavigate }) {
  const [open, setOpen] = useState(false); const [items, setItems] = useState([]);
  const known = useRef(new Set()); const initialized = useRef(false);
  const load = async () => {
    try {
      const next = await fetchNotifications({ recipientId: userId, isAdmin });
      const incoming = next.filter((item) => !known.current.has(item.id) && !item.is_read);
      next.forEach((item) => known.current.add(item.id));
      if (initialized.current && incoming.length) {
        const latest = incoming[0];
        if (latest.related_type === 'SUPPORT' || latest.related_type === 'TICKET') {
          window.dispatchEvent(new CustomEvent('sr:auto-open-support', { detail: { conversationId: latest.related_id, ticketId: latest.related_id } }));
        } else if (latest.related_type === 'INBOX') {
          window.dispatchEvent(new CustomEvent('sr:auto-open-inbox', { detail: { messageId: latest.related_id } }));
        }
      }
      initialized.current = true;
      setItems(next.filter((item) => !item.is_seen));
    } catch {}
  };
  useEffect(() => {
    load();
    if (!userId && !isAdmin) return undefined;
    const filter = isAdmin ? 'recipient_type=eq.ADMIN' : `recipient_id=eq.${userId}`;
    const channel = supabase.channel(`notifications-${userId || 'admin'}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications', filter }, (payload) => {
        if (payload.eventType === 'DELETE') setItems((rows) => rows.filter((row) => row.id !== payload.old.id));
        else if (payload.eventType === 'INSERT') setItems((rows) => [payload.new, ...rows.filter((row) => row.id !== payload.new.id)]);
        else setItems((rows) => rows.map((row) => row.id === payload.new.id ? payload.new : row).filter((row) => !row.is_seen));
      }).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [userId, isAdmin]);
  const unread = items.filter((item) => !item.is_read).length;
  const read = async (item) => { try { await markNotificationSeen(item.id); if (!item.is_read) await markNotificationRead(item.id); setItems((rows) => rows.filter((row) => row.id !== item.id)); } catch {} setOpen(false); if (item.related_type && onNavigate) onNavigate(item.related_type, item.related_id); };
  const markAll = async () => { await markAllNotificationsRead({ recipientId: userId, isAdmin }); setItems((rows) => rows.map((row) => ({ ...row, is_read: true }))); };
  return <div className="relative"><button type="button" onClick={() => setOpen((value) => !value)} className="relative w-8 h-8 rounded-full bg-[#081d45] border border-[#1b3d7d] flex items-center justify-center text-slate-200 hover:text-white shadow"><Bell className="w-4 h-4"/>{unread > 0 && <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-rose-500 text-white font-bold text-[9px] rounded-full flex items-center justify-center ring-2 ring-[#040d21]">{unread > 9 ? '9+' : unread}</span>}</button>{open && <div className="absolute right-0 mt-2 w-[min(92vw,360px)] bg-[#07193d] border border-amber-400/40 rounded-2xl shadow-2xl z-[100] overflow-hidden"><div className="flex items-center justify-between p-3 border-b border-[#173a78]"><div><p className="text-sm font-black text-white">Notifications</p><p className="text-[10px] text-slate-400">{unread} unread</p></div><button type="button" onClick={markAll} className="text-[10px] text-amber-300 flex items-center gap-1"><CheckCheck className="w-3 h-3"/> Mark all read</button></div><div className="max-h-[380px] overflow-y-auto">{items.length === 0 && <p className="p-8 text-center text-xs text-slate-500">No notifications yet.</p>}{items.map((item) => <button type="button" key={item.id} onClick={() => read(item)} className={`w-full text-left p-3 border-b border-[#173a78]/60 hover:bg-[#0c265e] flex gap-2 ${item.is_read ? 'opacity-60' : 'bg-[#0c265e]/30'}`}><span className="text-base">{ICONS[item.category] || ICONS.SYSTEM}</span><span className="min-w-0 flex-1"><span className="flex items-center justify-between gap-2"><strong className="text-xs text-white truncate">{item.title}</strong>{!item.is_read && <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0"/>}</span><span className="block text-[11px] text-slate-300 mt-0.5">{item.message}</span><span className="text-[9px] text-slate-500">{item.created_at ? new Date(item.created_at).toLocaleString() : ''} {item.related_type && <ExternalLink className="inline w-2.5 h-2.5 ml-1"/>}</span></span></button>)}</div></div>}</div>;
}