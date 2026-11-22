import React, { useEffect, useState, useMemo } from 'react';
import { 
  Bell, CheckCheck, RefreshCw, ArrowUpRight, Clock, Shield, CreditCard, DollarSign, Users, Headphones, Sparkles, Inbox
} from 'lucide-react';
import { fetchNotifications, markNotificationRead, markAllNotificationsRead, markNotificationSeen } from '../../../services/api';
import { supabase } from '../../../lib/supabaseClient';
import { notifySuccess, notifyError } from '../../../lib/notify';

const CATEGORY_MAP = {
  ALL: { label: 'All', icon: Bell, color: 'text-amber-400 bg-amber-400/10 border-amber-400/30' },
  DEPOSIT: { label: 'Deposit', icon: CreditCard, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
  WITHDRAWAL: { label: 'Withdrawal', icon: DollarSign, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  INVESTMENT: { label: 'Investment', icon: Sparkles, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
  REFERRAL: { label: 'Referral', icon: Users, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
  SUPPORT: { label: 'Support', icon: Headphones, color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
  TICKET: { label: 'Ticket', icon: Inbox, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' },
  SYSTEM: { label: 'System', icon: Shield, color: 'text-slate-300 bg-slate-500/10 border-slate-500/30' }
};

export default function UserNotificationsView({ user, onNavigateTab, onWithdraw, onDeposit }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [filterRead, setFilterRead] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const load = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const data = await fetchNotifications({ recipientId: user.id, isAdmin: false, limit: 100 });
      setNotifications(data || []);
    } catch (error) {
      console.warn('Could not load notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    if (!user?.id) return;
    const channel = supabase.channel(`user-notifications-${user.id}-${Math.random().toString(36).slice(2, 9)}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications', filter: `recipient_id=eq.${user.id}` }, (payload) => {
        if (payload.eventType === 'INSERT') setNotifications((prev) => [payload.new, ...prev.filter((n) => n.id !== payload.new.id)]);
        else if (payload.eventType === 'UPDATE') setNotifications((prev) => prev.map((n) => n.id === payload.new.id ? payload.new : n));
        else if (payload.eventType === 'DELETE') setNotifications((prev) => prev.filter((n) => n.id !== payload.old.id));
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user?.id]);

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationSeen(id);
      await markNotificationRead(id);
      setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, is_read: true, is_seen: true } : n));
    } catch {
      notifyError('Failed', 'Could not mark notification as read.');
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead({ recipientId: user?.id, isAdmin: false });
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true, is_seen: true })));
      notifySuccess('All Marked Read', 'All notifications marked as read.');
    } catch {
      notifyError('Failed', 'Could not mark all notifications as read.');
    }
  };

  const handleActionClick = (notification) => {
    handleMarkAsRead(notification.id);
    const cat = (notification.category || notification.related_type || '').toUpperCase();
    if (cat === 'DEPOSIT') { if (onDeposit) onDeposit(); else if (onNavigateTab) onNavigateTab('deposit'); }
    else if (cat === 'WITHDRAWAL') { if (onWithdraw) onWithdraw(); else if (onNavigateTab) onNavigateTab('withdraw'); }
    else if (cat === 'INVESTMENT') { if (onNavigateTab) onNavigateTab('investments'); }
    else if (cat === 'REFERRAL') { if (onNavigateTab) onNavigateTab('referral'); }
    else if (cat === 'SUPPORT' || cat === 'TICKET') { if (onNavigateTab) onNavigateTab('support'); }
  };

  const filtered = useMemo(() => {
    return notifications.filter((item) => {
      if (selectedCategory !== 'ALL' && (item.category || 'SYSTEM').toUpperCase() !== selectedCategory) return false;
      if (filterRead === 'UNREAD' && item.is_read) return false;
      if (filterRead === 'READ' && !item.is_read) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!(item.title || '').toLowerCase().includes(q) && !(item.message || '').toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [notifications, selectedCategory, filterRead, searchQuery]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#091f4d] via-[#09245c] to-[#0e3b91] border border-amber-400/40 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold text-xs mb-1">
            <Bell className="w-3.5 h-3.5" /> Notifications Center
          </div>
          <h2 className="text-2xl font-black text-white">System Alerts &amp; Updates</h2>
          <p className="text-slate-300 text-xs">Stay informed with live alerts on deposits, payouts, profit, and support.</p>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button onClick={handleMarkAllRead} className="px-4 py-2 rounded-xl bg-[#051330] border border-amber-400/50 hover:bg-amber-400/20 text-amber-300 font-bold text-xs flex items-center gap-1.5 transition shadow">
              <CheckCheck className="w-4 h-4" /> Mark All Read ({unreadCount})
            </button>
          )}
          <button onClick={load} disabled={loading} className="p-2.5 rounded-xl bg-[#051330] border border-[#173870] hover:border-amber-400 text-slate-300 hover:text-white transition shadow" title="Refresh">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-400' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#051330] border border-[#173870] rounded-2xl p-4 shadow-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Alerts</span>
          <span className="text-2xl font-black text-white mt-1 block">{notifications.length}</span>
        </div>
        <div className="bg-[#051330] border border-amber-400/30 rounded-2xl p-4 shadow-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">Unread</span>
          <span className="text-2xl font-black text-amber-400 mt-1 block">{unreadCount}</span>
        </div>
        <div className="bg-[#051330] border border-emerald-500/30 rounded-2xl p-4 shadow-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">Read</span>
          <span className="text-2xl font-black text-emerald-400 mt-1 block">{notifications.length - unreadCount}</span>
        </div>
        <div className="bg-[#051330] border border-blue-500/30 rounded-2xl p-4 shadow-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 block">Live Status</span>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold text-white">Live Sync Active</span>
          </div>
        </div>
      </div>

      <div className="bg-[#051330] border border-[#173870] rounded-2xl p-4 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 bg-[#030c1f] p-1 rounded-xl border border-[#143269]">
            {['ALL', 'UNREAD', 'READ'].map((status) => (
              <button key={status} onClick={() => setFilterRead(status)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition capitalize ${filterRead === status ? 'bg-amber-400 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'}`}>
                {status.toLowerCase()} {status === 'UNREAD' && unreadCount > 0 ? `(${unreadCount})` : ''}
              </button>
            ))}
          </div>
          <input type="text" placeholder="Search alerts..." value={(searchQuery ?? '')} onChange={(e) => setSearchQuery(e.target.value)} className="px-3.5 py-2 rounded-xl bg-[#030c1f] border border-[#173a78] text-white text-xs outline-none focus:border-amber-400 w-full sm:w-64" />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {Object.entries(CATEGORY_MAP).map(([key, config]) => {
            const Icon = config.icon;
            const active = selectedCategory === key;
            return (
              <button key={key} onClick={() => setSelectedCategory(key)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition border ${active ? 'bg-amber-400 text-slate-950 border-amber-400 font-black shadow' : 'bg-[#030c1f] text-slate-400 border-[#143269] hover:text-white hover:border-[#1d4ed8]'}`}>
                <Icon className="w-3.5 h-3.5" />
                <span>{config.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-[#051330] border border-[#173870] rounded-3xl p-6 shadow-xl space-y-3">
        {loading ? (
          <div className="p-12 text-center text-amber-300 flex items-center justify-center gap-2"><RefreshCw className="w-5 h-5 animate-spin" /><span>Loading alerts...</span></div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-slate-800/60 border border-slate-700 mx-auto flex items-center justify-center text-slate-400"><Bell className="w-6 h-6" /></div>
            <p className="text-sm font-bold text-slate-300">No notifications found</p>
            <p className="text-xs text-slate-500">You have no matching system alerts at this time.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#173870]/60">
            {filtered.map((item) => {
              const catKey = (item.category || 'SYSTEM').toUpperCase();
              const categoryConfig = CATEGORY_MAP[catKey] || CATEGORY_MAP.SYSTEM;
              const Icon = categoryConfig.icon;
              const isUnread = !item.is_read;
              return (
                <div key={item.id} className={`py-4 px-3 sm:px-4 rounded-2xl transition flex flex-col sm:flex-row items-start justify-between gap-4 ${isUnread ? 'bg-gradient-to-r from-amber-400/5 via-transparent to-transparent border-l-4 border-amber-400' : 'hover:bg-[#07193d]/50'}`}>
                  <div className="flex items-start gap-3.5 min-w-0 flex-1">
                    <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 ${categoryConfig.color}`}><Icon className="w-5 h-5" /></div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${categoryConfig.color}`}>{categoryConfig.label}</span>
                        <h4 className="text-sm font-black text-white truncate">{item.title}</h4>
                        {isUnread && <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" title="Unread" />}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed break-words">{item.message}</p>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 pt-1 font-mono">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-500" />{item.created_at ? new Date(item.created_at).toLocaleString() : 'Recent'}</span>
                        {item.related_type && <span className="text-amber-300 font-bold uppercase tracking-wider">Ref: {item.related_type}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {item.related_type && (
                      <button type="button" onClick={() => handleActionClick(item)} className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs hover:brightness-110 transition flex items-center gap-1 shadow">
                        <span>View</span><ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {isUnread && (
                      <button type="button" onClick={() => handleMarkAsRead(item.id)} className="px-3 py-1.5 rounded-xl bg-[#030c1f] border border-[#173870] hover:border-amber-400 text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-1" title="Mark as read">
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /><span>Read</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

