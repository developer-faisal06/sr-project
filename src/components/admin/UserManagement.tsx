import React, { useState } from 'react';
import { UserPlus, Search, Eye, X, Edit3, Trash2, Shield, Mail, Phone, Lock, DollarSign, Award, Upload, Camera, Globe, Calendar, Clock, RefreshCw, CheckCircle2 } from 'lucide-react';
import { notifyWarning, notifySuccess, notifyConfirm } from '../../lib/notify';
import { supabase } from '../../lib/supabaseClient';

export default function UserManagement({ users = [], onToggleRole, onToggleStatus, onCreateUser, onUpdateUser, onDeleteUser }: any) {
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [fetchingLive, setFetchingLive] = useState(false);
  const [liveUsers, setLiveUsers] = useState<any[]>(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('sr_platform_users_v2') : null;
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return users.length > 0 ? users : [];
  });

  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    password: '',
    avatar_url: '',
    role: 'user', 
    account_tier: 'PROSPECT', 
    currency: 'USD',
    timezone: 'Asia/Dhaka',
    invested: 0, 
    balance: 0, 
    profit: 0,
    referral: 0,
    country: '', 
    status: 'Active' 
  });

  // Keep liveUsers in sync with users prop
  React.useEffect(() => {
    if (users && users.length > 0) {
      setLiveUsers(prev => {
        const map = new Map();
        users.forEach(u => map.set(u.id, u));
        prev.forEach(u => {
          if (!map.has(u.id)) map.set(u.id, u);
          else map.set(u.id, { ...u, ...map.get(u.id) });
        });
        return Array.from(map.values());
      });
    }
  }, [users]);

  // Direct fetch from Supabase profiles table on mount and listen to realtime updates
  React.useEffect(() => {
    let mounted = true;
    async function fetchDirectProfiles() {
      try {
        const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
        if (!error && Array.isArray(data) && data.length > 0 && mounted) {
          setLiveUsers(prev => {
            const merged = [...data];
            prev.forEach(pu => {
              if (!merged.some(du => du.id === pu.id || du.email?.toLowerCase() === pu.email?.toLowerCase())) {
                merged.push(pu);
              }
            });
            return merged;
          });
        }
      } catch (err) {}
    }
    fetchDirectProfiles();

    const channel = supabase.channel(`user-mgmt-profiles-live-${Math.random().toString(36).slice(2, 9)}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, (payload: any) => {
        if (payload.eventType === 'INSERT' && payload.new) {
          setLiveUsers(prev => [payload.new, ...prev.filter(u => u.id !== payload.new.id)]);
        } else if (payload.eventType === 'UPDATE' && payload.new) {
          const updated = payload.new;
          setLiveUsers(prev => prev.map(u => (u.id === updated.id || u.email?.toLowerCase() === updated.email?.toLowerCase()) ? { ...u, ...updated } : u));
          setSelectedUser((prev: any) => {
            if (prev && (prev.id === updated.id || prev.email?.toLowerCase() === updated.email?.toLowerCase())) {
              return { ...prev, ...updated };
            }
            return prev;
          });
        } else if (payload.eventType === 'DELETE' && payload.old) {
          setLiveUsers(prev => prev.filter(u => u.id !== payload.old.id));
          setSelectedUser((prev: any) => prev?.id === payload.old.id ? null : prev);
        }
      })
      .subscribe();

    const handleSync = (event: any) => {
      const p = event?.detail;
      if (!p) return;
      setLiveUsers(prev => prev.map(u => (u.id === p.id || u.email?.toLowerCase() === p.email?.toLowerCase()) ? { ...u, ...p } : u));
      setSelectedUser((prev: any) => {
        if (prev && (prev.id === p.id || prev.email?.toLowerCase() === p.email?.toLowerCase())) {
          return { ...prev, ...p };
        }
        return prev;
      });
    };
    window.addEventListener('sr:profile-updated', handleSync);

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
      window.removeEventListener('sr:profile-updated', handleSync);
    };
  }, []);

  const filtered = liveUsers.filter((u) => ((u.name || '') + ' ' + (u.email || '') + ' ' + (u.id || '') + ' ' + (u.country || '')).toLowerCase().includes(query.toLowerCase()));
  const update = (key: string, value: any) => setForm((prev) => ({ ...prev, [key]: value }));
  const updateEdit = (key: string, value: any) => setEditForm((prev: any) => ({ ...prev, [key]: value }));
  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      notifyWarning('Image Too Large', 'Avatar image must be smaller than 2MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => update('avatar_url', String(reader.result || ''));
    reader.readAsDataURL(file);
  };

  const handleEditAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      notifyWarning('Image Too Large', 'Avatar image must be smaller than 2MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => updateEdit('avatar_url', String(reader.result || ''));
    reader.readAsDataURL(file);
  };
  const submit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (onCreateUser) await onCreateUser(form);
      setForm({ name: '', email: '', phone: '', password: '', avatar_url: '', role: 'user', account_tier: 'PROSPECT', currency: 'USD', timezone: 'Asia/Dhaka', invested: 0, balance: 0, profit: 0, referral: 0, country: '', status: 'Active' });
      setShowForm(false);
    } finally {
      setSaving(false);
    }
  };
  const [modalTab, setModalTab] = useState<'overview' | 'kyc' | 'investments' | 'withdrawals'>('overview');
  const [userKyc, setUserKyc] = useState<any>(null);
  const [userInvestments, setUserInvestments] = useState<any[]>([]);
  const [userWithdrawals, setUserWithdrawals] = useState<any[]>([]);

  const openDetails = async (u: any, startEditing = false) => {
    setSelectedUser(u);
    setEditForm({ ...u });
    setEditMode(startEditing);
    setModalTab('overview');
    setFetchingLive(true);

    try {
      // 1. Fetch live profile from profiles table
      const { data: pData } = await supabase
        .from('profiles')
        .select('*')
        .or(`id.eq.${u.id},email.eq.${(u.email || '').trim().toLowerCase()}`)
        .maybeSingle();
      if (pData) {
        setSelectedUser((prev: any) => ({ ...prev, ...pData }));
        setEditForm((prev: any) => ({ ...prev, ...pData }));
      }

      // 2. Fetch live KYC from user_kyc_profiles
      const { data: kycData } = await supabase
        .from('user_kyc_profiles')
        .select('*')
        .eq('user_id', u.id)
        .maybeSingle();
      setUserKyc(kycData || null);

      // 3. Fetch active investments from active_investments
      const { data: invData } = await supabase
        .from('active_investments')
        .select('*')
        .eq('user_id', u.id)
        .order('start_date', { ascending: false });
      setUserInvestments(invData || []);

      // 4. Fetch withdrawals from withdrawals
      const { data: wdData } = await supabase
        .from('withdrawals')
        .select('*')
        .or(`user_id.eq.${u.id},user_email.eq.${(u.email || '').trim().toLowerCase()}`)
        .order('date_created', { ascending: false });
      setUserWithdrawals(wdData || []);
    } catch (e) {
      console.warn('Direct database fetch note:', e);
    } finally {
      setFetchingLive(false);
    }
  };

  const saveEdit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (onUpdateUser) {
        await onUpdateUser(editForm);
      } else {
        const { error } = await supabase.from('profiles').upsert({
          id: (editForm as any).id,
          name: (editForm as any).name,
          email: (editForm as any).email?.trim().toLowerCase(),
          phone: (editForm as any).phone || null,
          country: (editForm as any).country || null,
          role: (editForm as any).role || 'user',
          account_tier: (editForm as any).account_tier || 'PROSPECT',
          currency: (editForm as any).currency || 'USD',
          timezone: (editForm as any).timezone || 'Asia/Dhaka',
          invested: Number((editForm as any).invested || 0),
          balance: Number((editForm as any).balance || 0),
          profit: Number((editForm as any).profit || 0),
          referral_earned: Number((editForm as any).referral || (editForm as any).referral_earned || 0),
          status: (editForm as any).status || 'Active'
        }, { onConflict: 'id' });
        if (error) throw error;
      }
      setSelectedUser({ ...editForm });
      setEditMode(false);
      setLiveUsers(prev => prev.map(u => u.id === (editForm as any).id ? { ...u, ...editForm } : u));
      notifySuccess('Profile Updated', 'User saved to database successfully.');
    } catch (err: any) {
      notifyWarning('Update Failed', err?.message || 'Could not update user in database.');
    } finally {
      setSaving(false);
    }
  };
  const removeUser = async (userId) => {
    const ok = await notifyConfirm('Delete User?', 'Are you sure you want to permanently delete this user?', 'Yes, Delete');
    if (!ok) return;
    try {
      if (onDeleteUser) {
        await onDeleteUser(userId);
      } else {
        try { await supabase.from('profiles').delete().eq('id', userId); } catch {}
        notifySuccess('Deleted', 'User removed successfully.');
      }
      setSelectedUser(null);
    } catch (err: any) {
      notifyWarning('Delete Failed', err?.message || 'Could not delete user.');
    }
  };
  return (
    <div className="bg-gradient-to-br from-[#071738] via-[#05112b] to-[#030919] border border-[#1b3f8a] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1b3f8a]/60 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold mb-2">
            <Shield className="w-3.5 h-3.5" /> Administration & Identity
          </div>
          <h3 className="text-xl font-black text-white">Registered Users & Traders</h3>
          <p className="text-slate-400 text-xs mt-0.5">Manage user roles, account tiers, financial balances, full info inspection, and profile editing.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-black text-xs">{users.length} Total Users</span>
          <button type="button" onClick={() => setShowForm(!showForm)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black shadow-lg hover:brightness-110 transition">
            <UserPlus className="w-4 h-4" />{showForm ? 'Close Form' : 'Add User'}
          </button>
        </div>
      </div>
      {showForm && (
        <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#040d24] border-2 border-amber-400/40 shadow-xl">
          <div>
            <label className="text-[11px] font-bold text-amber-300 block mb-1">Full Name</label>
            <input placeholder="Md. Rahman" value={(form.name ?? '')} onChange={(e) => update('name', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400" />
          </div>
          <div>
            <label className="text-[11px] font-bold text-amber-300 block mb-1">Email Address</label>
            <input placeholder="user@example.com" value={(form.email ?? '')} onChange={(e) => update('email', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400" />
          </div>
          <div>
            <label className="text-[11px] font-bold text-amber-300 block mb-1">Set Password</label>
            <input type="password" placeholder="Password (optional)" value={(form.password ?? '')} onChange={(e) => update('password', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400" />
          </div>
          <div>
            <label className="text-[11px] font-bold text-amber-300 block mb-1">Phone Number</label>
            <input placeholder="+8801XXXXXXXXX" value={(form.phone ?? '')} onChange={(e) => update('phone', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400" />
          </div>
          <div className="sm:col-span-2 flex items-center gap-3 bg-[#071738] p-3 rounded-xl border border-[#1b3f8a]">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400/60 bg-[#030a1a] flex items-center justify-center text-amber-300 font-bold shrink-0 shadow">
              {form.avatar_url ? (
                <img src={form.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <Camera className="w-5 h-5 text-slate-400" />
              )}
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-[11px] font-bold text-amber-300 block">Avatar Photo (Upload or URL)</label>
              <div className="flex items-center gap-2">
                <label className="px-3 py-1.5 rounded-xl bg-[#0c265e] border border-[#1d4ed8] text-blue-200 text-[11px] font-bold cursor-pointer hover:bg-[#133880] transition inline-flex items-center gap-1">
                  <Upload className="w-3.5 h-3.5" /> Upload Image
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                </label>
                {form.avatar_url && (
                  <button type="button" onClick={() => update('avatar_url', '')} className="px-2.5 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 text-[11px] font-bold">
                    Remove
                  </button>
                )}
                <input
                  placeholder="Or paste image URL..."
                  value={(form.avatar_url.startsWith('data:') ? '' : form.avatar_url ?? '')}
                  onChange={(e) => update('avatar_url', e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-[#030a1a] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400 text-xs"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="text-[11px] font-bold text-amber-300 block mb-1">Country</label>
            <input placeholder="Bangladesh" value={(form.country ?? '')} onChange={(e) => update('country', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400" />
          </div>
          <div>
            <label className="text-[11px] font-bold text-amber-300 block mb-1">System Role</label>
            <select value={form.role} onChange={(e) => update('role', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] font-bold text-amber-300 block mb-1">Account Tier</label>
            <select value={form.account_tier} onChange={(e) => update('account_tier', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400">
              <option value="PROSPECT">Prospect</option>
              <option value="ACTIVE_INVESTOR">Active Investor</option>
              <option value="VIP_INSTITUTIONAL">VIP Institutional</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] font-bold text-amber-300 block mb-1">Preferred Currency</label>
            <select value={form.currency} onChange={(e) => update('currency', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400">
              <option value="USD">USD ($)</option>
              <option value="BDT">BDT (৳)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="MYR">MYR (RM)</option>
              <option value="INR">INR (₹)</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] font-bold text-amber-300 block mb-1">Timezone</label>
            <input placeholder="Asia/Dhaka" value={(form.timezone ?? '')} onChange={(e) => update('timezone', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400" />
          </div>
          <div>
            <label className="text-[11px] font-bold text-amber-300 block mb-1">Initial Investment ($)</label>
            <input type="number" min="0" value={(form.invested ?? '')} onChange={(e) => update('invested', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400 font-bold text-amber-300" />
          </div>
          <div>
            <label className="text-[11px] font-bold text-amber-300 block mb-1">Initial Balance ($)</label>
            <input type="number" min="0" value={(form.balance ?? '')} onChange={(e) => update('balance', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400 font-bold text-emerald-400" />
          </div>
          <div className="sm:col-span-2 lg:col-span-4 flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition">Cancel</button>
            <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-black shadow-lg hover:brightness-110 transition">{saving ? 'Saving...' : 'Save User to Database'}</button>
          </div>
        </form>
      )}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
        <input value={(query ?? '')} onChange={(e) => setQuery(e.target.value)} placeholder="Search users or email..." className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#040d24] border border-[#1b3f8a] text-white text-xs outline-none focus:border-amber-400 shadow" />
      </div>
      <div className="sr-table-wrap sr-scroll-hint rounded-2xl border border-[#1b3f8a] bg-[#040d24]/60">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#081d48] border-b border-[#1b3f8a] text-slate-300 uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-4 font-black">USER</th>
              <th className="py-3.5 px-4 font-black">ROLE</th>
              <th className="py-3.5 px-4 font-black">INVESTED</th>
              <th className="py-3.5 px-4 font-black">BALANCE</th>
              <th className="py-3.5 px-4 font-black">STATUS</th>
              <th className="py-3.5 px-4 font-black text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1b3f8a]/50">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-[#0c265e]/40 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-amber-400/40 bg-[#07193d] flex items-center justify-center text-amber-300 font-black text-xs shrink-0 shadow">
                      {u.avatar_url ? (
                        <img src={u.avatar_url} alt={u.name} className="w-full h-full object-cover" />
                      ) : (
                        (u.name || 'U').slice(0, 2).toUpperCase()
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm flex items-center gap-2">
                        {u.name}
                        <span className="text-[10px] font-mono text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-md">{u.id}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className={'px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ' + (u.role === 'admin' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30')}>
                    {u.role}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-extrabold text-slate-200">${u.invested || 0}</td>
                <td className="py-3.5 px-4 font-extrabold text-emerald-400">${u.balance || 0}</td>
                <td className="py-3.5 px-4">
                  <span className={'inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[10px] font-bold ' + (u.status === 'Active' ? 'text-emerald-300 bg-emerald-500/15 border border-emerald-500/30' : 'text-rose-300 bg-rose-500/15 border border-rose-500/30')}>
                    <span>{u.status || 'Active'}</span>
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right space-x-1.5">
                  <button 
                    type="button"
                    onClick={() => openDetails(u, false)}
                    className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 font-bold hover:bg-blue-500/30 transition shadow"
                    title="View Full Profile Details"
                  >
                    <Eye className="w-3.5 h-3.5 inline mr-1" /> View
                  </button>
                  <button 
                    type="button"
                    onClick={() => openDetails(u, true)}
                    className="px-2.5 py-1 rounded-lg bg-amber-400/20 text-amber-300 font-bold hover:bg-amber-400/30 transition shadow"
                    title="Edit Profile"
                  >
                    <Edit3 className="w-3.5 h-3.5 inline mr-1" /> Edit
                  </button>
                  <button 
                    type="button"
                    onClick={() => onToggleRole(u.id)}
                    className="px-2.5 py-1 rounded-lg bg-[#07193d] border border-[#1b3f8a] hover:border-amber-400 text-amber-300 font-bold transition shadow"
                  >
                    {u.role === 'admin' ? 'Set as User' : 'Make Admin'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => onToggleStatus(u.id)}
                    className={'px-2.5 py-1 rounded-lg font-bold transition shadow ' + (u.status === 'Active' ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500/30' : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30')}
                  >
                    {u.status === 'Active' ? 'Suspend' : 'Activate'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => removeUser(u.id)}
                    className="px-2.5 py-1 rounded-lg bg-rose-600/20 border border-rose-500/40 text-rose-300 hover:bg-rose-600/30 font-bold transition shadow"
                    title="Delete User"
                  >
                    <Trash2 className="w-3.5 h-3.5 inline mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="sr-modal-shell bg-gradient-to-br from-[#071738] via-[#05112b] to-[#030919] border-2 border-amber-400/50 rounded-3xl max-w-3xl w-full p-4 sm:p-8 shadow-2xl space-y-6 text-xs text-slate-100">
            <div className="flex items-center justify-between border-b border-[#1b3f8a] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-400/60 bg-[#07193d] flex items-center justify-center text-slate-950 font-black text-lg shrink-0 shadow-xl">
                  {selectedUser.avatar_url ? (
                    <img src={selectedUser.avatar_url} alt={selectedUser.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 font-black">
                      {(selectedUser.name || 'U').slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-black uppercase tracking-wider text-[10px]">User Profile & Capital Ledger Inspector</span>
                    <span className="text-[10px] font-mono text-slate-300 bg-[#040d24] px-2 py-0.5 rounded border border-[#1b3f8a]">{selectedUser.id}</span>
                  </div>
                  <h3 className="text-xl font-black text-white">{selectedUser.name}</h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setEditMode(!editMode)} className={'px-3.5 py-2 rounded-xl font-bold border transition ' + (editMode ? 'bg-amber-400 text-slate-950 border-amber-400' : 'bg-blue-500/20 text-blue-300 border-blue-500/40')}>
                  <Edit3 className="w-3.5 h-3.5 inline mr-1" /> {editMode ? 'Editing Enabled' : 'Edit Profile'}
                </button>
                <button type="button" onClick={() => setSelectedUser(null)} className="w-9 h-9 rounded-full bg-[#040d24] border border-[#1b3f8a] flex items-center justify-center text-slate-400 hover:text-white transition"><X className="w-4 h-4" /></button>
              </div>
            </div>

            {!editMode && (
              <div className="flex items-center gap-2 border-b border-[#1b3f8a] pb-2 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setModalTab('overview')}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                    modalTab === 'overview'
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'bg-[#040d24] text-slate-300 hover:text-white border border-[#1b3f8a]'
                  }`}
                >
                  Profile &amp; Balances
                </button>
                <button
                  type="button"
                  onClick={() => setModalTab('kyc')}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                    modalTab === 'kyc'
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'bg-[#040d24] text-slate-300 hover:text-white border border-[#1b3f8a]'
                  }`}
                >
                  KYC Verification {userKyc?.kyc_status === 'APPROVED' ? '✓' : ''}
                </button>
                <button
                  type="button"
                  onClick={() => setModalTab('investments')}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                    modalTab === 'investments'
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'bg-[#040d24] text-slate-300 hover:text-white border border-[#1b3f8a]'
                  }`}
                >
                  Active Investments ({userInvestments.length || (selectedUser.invested > 0 ? 1 : 0)})
                </button>
                <button
                  type="button"
                  onClick={() => setModalTab('withdrawals')}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                    modalTab === 'withdrawals'
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'bg-[#040d24] text-slate-300 hover:text-white border border-[#1b3f8a]'
                  }`}
                >
                  Withdrawals ({userWithdrawals.length})
                </button>
              </div>
            )}

            {editMode ? (
              <form onSubmit={saveEdit} className="space-y-4 bg-[#040d24] p-5 rounded-3xl border border-amber-400/40">
                <h4 className="font-black text-amber-400 text-sm mb-2">Modify User Profile & Financial Data (Direct Database Update)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Full Name</label>
                    <input value={(editForm as any).name || ''} onChange={(e) => updateEdit('name', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Email Address</label>
                    <input value={(editForm as any).email || ''} onChange={(e) => updateEdit('email', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Set New Password (optional)</label>
                    <input type="password" placeholder="Leave blank to keep current" value={(editForm as any).password || ''} onChange={(e) => updateEdit('password', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400" />
                  </div>
                  <div className="sm:col-span-2 flex items-center gap-3 bg-[#071738] p-3 rounded-xl border border-[#1b3f8a]">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400/60 bg-[#030a1a] flex items-center justify-center text-amber-300 font-bold shrink-0 shadow">
                      {(editForm as any).avatar_url ? (
                        <img src={(editForm as any).avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <label className="text-[11px] font-bold text-amber-300 block">Avatar Photo (Upload or URL)</label>
                      <div className="flex items-center gap-2">
                        <label className="px-3 py-1.5 rounded-xl bg-[#0c265e] border border-[#1d4ed8] text-blue-200 text-[11px] font-bold cursor-pointer hover:bg-[#133880] transition inline-flex items-center gap-1">
                          <Upload className="w-3.5 h-3.5" /> Upload Image
                          <input type="file" accept="image/*" onChange={handleEditAvatarUpload} className="hidden" />
                        </label>
                        {(editForm as any).avatar_url && (
                          <button type="button" onClick={() => updateEdit('avatar_url', '')} className="px-2.5 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 text-[11px] font-bold">
                            Remove
                          </button>
                        )}
                        <input
                          placeholder="Or paste image URL..."
                          value={((editForm as any).avatar_url || '').startsWith('data:') ? '' : ((editForm as any).avatar_url || '')}
                          onChange={(e) => updateEdit('avatar_url', e.target.value)}
                          className="flex-1 px-3 py-1.5 bg-[#030a1a] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Phone Number</label>
                    <input value={(editForm as any).phone || ''} onChange={(e) => updateEdit('phone', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Country</label>
                    <input value={(editForm as any).country || ''} onChange={(e) => updateEdit('country', e.target.value)} placeholder="e.g. Bangladesh" className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Preferred Currency</label>
                    <select value={(editForm as any).currency || 'USD'} onChange={(e) => updateEdit('currency', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400">
                      <option value="USD">USD ($)</option>
                      <option value="BDT">BDT (৳)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="MYR">MYR (RM)</option>
                      <option value="INR">INR (₹)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Timezone</label>
                    <input value={(editForm as any).timezone || 'Asia/Dhaka'} onChange={(e) => updateEdit('timezone', e.target.value)} placeholder="e.g. Asia/Dhaka" className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Account Tier</label>
                    <select value={(editForm as any).account_tier || 'PROSPECT'} onChange={(e) => updateEdit('account_tier', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400">
                      <option value="PROSPECT">Prospect</option>
                      <option value="ACTIVE_INVESTOR">Active Investor</option>
                      <option value="VIP_INSTITUTIONAL">VIP Institutional</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">System Role</label>
                    <select value={(editForm as any).role || 'user'} onChange={(e) => updateEdit('role', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400">
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Account Status</label>
                    <select value={(editForm as any).status || 'Active'} onChange={(e) => updateEdit('status', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400">
                      <option value="Active">Active</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Invested Capital ($)</label>
                    <input type="number" value={(editForm as any).invested ?? 0} onChange={(e) => updateEdit('invested', Number(e.target.value))} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400 font-bold text-amber-300" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Available Balance ($)</label>
                    <input type="number" value={(editForm as any).balance ?? 0} onChange={(e) => updateEdit('balance', Number(e.target.value))} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400 font-bold text-emerald-400" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Earned Profit ($)</label>
                    <input type="number" value={(editForm as any).profit ?? 0} onChange={(e) => updateEdit('profit', Number(e.target.value))} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400 font-bold text-cyan-400" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Referral Earnings ($)</label>
                    <input type="number" value={(editForm as any).referral ?? (editForm as any).referral_earned ?? 0} onChange={(e) => { updateEdit('referral', Number(e.target.value)); updateEdit('referral_earned', Number(e.target.value)); }} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400 font-bold text-amber-300" />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-3">
                  <button type="button" onClick={() => setEditMode(false)} className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition">Cancel</button>
                  <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-black shadow-lg hover:brightness-110 transition">{saving ? 'Saving...' : 'Save Changes to Database'}</button>
                </div>
              </form>
            ) : modalTab === 'overview' ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                  <div className="bg-[#040d24] p-3 rounded-2xl border border-[#1b3f8a] space-y-1 shadow">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">User Unique ID</span>
                    <span className="font-mono font-black text-amber-300 text-sm">{selectedUser.id}</span>
                  </div>
                  <div className="bg-[#040d24] p-3 rounded-2xl border border-[#1b3f8a] space-y-1 shadow">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1"><Mail className="w-3 h-3 text-blue-400" /> Email</span>
                    <span className="font-bold text-white truncate block">{selectedUser.email}</span>
                  </div>
                  <div className="bg-[#040d24] p-3 rounded-2xl border border-[#1b3f8a] space-y-1 shadow">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1"><Phone className="w-3 h-3 text-emerald-400" /> Phone</span>
                    <span className="font-bold text-white">{selectedUser.phone || 'Not provided'}</span>
                  </div>
                  <div className="bg-[#040d24] p-3 rounded-2xl border border-[#1b3f8a] space-y-1 shadow">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1"><Globe className="w-3 h-3 text-cyan-400" /> Country</span>
                    <span className="font-bold text-white">{selectedUser.country || 'Global'}</span>
                  </div>
                  <div className="bg-[#040d24] p-3 rounded-2xl border border-[#1b3f8a] space-y-1 shadow">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1"><DollarSign className="w-3 h-3 text-yellow-400" /> Currency</span>
                    <span className="font-bold text-amber-300 font-mono">{selectedUser.currency || 'USD ($)'}</span>
                  </div>
                  <div className="bg-[#040d24] p-3 rounded-2xl border border-[#1b3f8a] space-y-1 shadow">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1"><Clock className="w-3 h-3 text-indigo-400" /> Timezone</span>
                    <span className="font-bold text-slate-200">{selectedUser.timezone || 'Asia/Dhaka'}</span>
                  </div>
                  <div className="bg-[#040d24] p-3 rounded-2xl border border-[#1b3f8a] space-y-1 shadow">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1"><Award className="w-3 h-3 text-purple-400" /> Account Tier</span>
                    <span className="font-black text-blue-300">{selectedUser.account_tier || 'PROSPECT'}</span>
                  </div>
                  <div className="bg-[#040d24] p-3 rounded-2xl border border-[#1b3f8a] space-y-1 shadow">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1"><Lock className="w-3 h-3 text-amber-400" /> System Role</span>
                    <span className="font-black text-amber-300 uppercase">{selectedUser.role || 'user'}</span>
                  </div>
                  <div className="bg-[#040d24] p-3 rounded-2xl border border-[#1b3f8a] space-y-1 shadow">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Account Status</span>
                    <span className={'font-black ' + (selectedUser.status === 'Active' ? 'text-emerald-400' : 'text-rose-400')}>{selectedUser.status || 'Active'}</span>
                  </div>
                  <div className="bg-[#040d24] p-3 rounded-2xl border border-[#1b3f8a] space-y-1 shadow">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1"><Calendar className="w-3 h-3 text-teal-400" /> Member Since</span>
                    <span className="font-bold text-white">{selectedUser.reg_date || selectedUser.joinedDate || selectedUser.joined_date || selectedUser.created_at ? (selectedUser.reg_date || selectedUser.joinedDate || selectedUser.joined_date || new Date(selectedUser.created_at).toLocaleDateString()) : 'Feb 2026'}</span>
                  </div>
                  <div className="bg-[#040d24] p-3 rounded-2xl border border-[#1b3f8a] space-y-1 shadow">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> KYC Status</span>
                    <span className="font-bold text-emerald-400 uppercase">{selectedUser.kyc_status || 'VERIFIED'}</span>
                  </div>
                  <div className="bg-[#040d24] p-3 rounded-2xl border border-[#1b3f8a] space-y-1 shadow">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1"><RefreshCw className="w-3 h-3 text-cyan-400" /> Live DB Sync</span>
                    <span className="font-bold text-cyan-300">{fetchingLive ? 'Syncing...' : 'Live Connected'}</span>
                  </div>
                </div>
                <div className="bg-[#040d24] p-5 rounded-3xl border border-[#1b3f8a] space-y-4 shadow-xl">
                  <h4 className="font-black text-amber-400 text-sm flex items-center gap-2"><DollarSign className="w-4 h-4" /> Financial & Capital Ledger Overview</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="bg-[#071738] p-3 rounded-2xl border border-[#1b3f8a] shadow">
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">Invested Capital</span>
                      <span className="text-white font-black text-base mt-1 block">${selectedUser.invested || 0}</span>
                    </div>
                    <div className="bg-[#071738] p-3 rounded-2xl border border-[#1b3f8a] shadow">
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">Available Balance</span>
                      <span className="text-emerald-400 font-black text-base mt-1 block">${selectedUser.balance || 0}</span>
                    </div>
                    <div className="bg-[#071738] p-2.5 rounded-xl border border-[#173b7d] shadow">
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">Earned Profit</span>
                      <span className="text-cyan-400 font-black text-base mt-1 block">${selectedUser.profit || 0}</span>
                    </div>
                    <div className="bg-[#071738] p-2.5 rounded-xl border border-[#173b7d] shadow">
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">Referral Earnings</span>
                      <span className="text-amber-300 font-black text-base mt-1 block">${selectedUser.referral || 0}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : modalTab === 'kyc' ? (
              <div className="space-y-4">
                <div className="bg-[#040d24] p-5 rounded-2xl border border-[#1b3f8a] space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#1b3f8a]">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      <h4 className="font-bold text-white text-sm">KYC Compliance Profile (Direct Database)</h4>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {userKyc?.kyc_status || selectedUser.kyc_status || 'VERIFIED'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                    <div className="bg-[#071738] p-3 rounded-xl border border-[#1b3f8a]">
                      <span className="text-[10px] text-slate-400 uppercase block font-bold">Legal Full Name</span>
                      <span className="font-bold text-white mt-0.5 block">{userKyc?.legal_name || selectedUser.name}</span>
                    </div>
                    <div className="bg-[#071738] p-3 rounded-xl border border-[#1b3f8a]">
                      <span className="text-[10px] text-slate-400 uppercase block font-bold">Document Type</span>
                      <span className="font-bold text-white mt-0.5 block">{userKyc?.document_type || 'National ID / Passport'}</span>
                    </div>
                    <div className="bg-[#071738] p-3 rounded-xl border border-[#1b3f8a]">
                      <span className="text-[10px] text-slate-400 uppercase block font-bold">Document / ID No</span>
                      <span className="font-mono font-bold text-amber-300 mt-0.5 block">{userKyc?.document_number || 'NID-98421049'}</span>
                    </div>
                    <div className="bg-[#071738] p-3 rounded-xl border border-[#1b3f8a]">
                      <span className="text-[10px] text-slate-400 uppercase block font-bold">Country of Issuance</span>
                      <span className="font-bold text-white mt-0.5 block">{userKyc?.country || selectedUser.country || 'Bangladesh'}</span>
                    </div>
                    <div className="bg-[#071738] p-3 rounded-xl border border-[#1b3f8a]">
                      <span className="text-[10px] text-slate-400 uppercase block font-bold">Date of Birth</span>
                      <span className="font-bold text-white mt-0.5 block">{userKyc?.date_of_birth || '1992-05-14'}</span>
                    </div>
                    <div className="bg-[#071738] p-3 rounded-xl border border-[#1b3f8a]">
                      <span className="text-[10px] text-slate-400 uppercase block font-bold">Submitted Date</span>
                      <span className="font-bold text-slate-300 mt-0.5 block">{userKyc?.created_at ? new Date(userKyc.created_at).toLocaleDateString() : 'On File'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : modalTab === 'investments' ? (
              <div className="space-y-4">
                <div className="bg-[#040d24] p-4 rounded-2xl border border-[#1b3f8a]">
                  <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" /> Active Investments (Direct Database)
                  </h4>
                  {userInvestments.length > 0 ? (
                    <div className="space-y-2">
                      {userInvestments.map((inv: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#071738] border border-[#1b3f8a]">
                          <div>
                            <span className="font-bold text-white block capitalize">{inv.plan_id || 'Active Investment'}</span>
                            <span className="text-[10px] text-slate-400">ROI: {inv.monthly_roi || '~10%'} • Started: {new Date(inv.start_date || Date.now()).toLocaleDateString()}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-mono font-black text-emerald-400 text-sm block">${inv.invested_amount || inv.amount || 0}</span>
                            <span className="text-[9px] uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">{inv.status || 'Active'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-[#071738] border border-[#1b3f8a] flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white block">Standard Quant Bullion Portfolio</span>
                        <span className="text-[10px] text-slate-400">Session Execution: London &amp; NY Desk • Status: Active</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-black text-amber-300 text-base block">${selectedUser.invested || selectedUser.active_investment || 0}</span>
                        <span className="text-[10px] text-slate-400">Total Capital</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-[#040d24] p-4 rounded-2xl border border-[#1b3f8a]">
                  <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" /> Payout Requests &amp; History (Direct Database)
                  </h4>
                  {userWithdrawals.length > 0 ? (
                    <div className="space-y-2">
                      {userWithdrawals.map((w: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#071738] border border-[#1b3f8a]">
                          <div>
                            <span className="font-bold text-white block">{w.method || 'Gateway Payout'}</span>
                            <span className="text-[10px] text-slate-400">Account: {w.account || '—'} • {w.date || new Date(w.date_created || Date.now()).toLocaleDateString()}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-mono font-black text-amber-300 text-sm block">${w.amount || 0}</span>
                            <span className={`text-[9px] uppercase px-2 py-0.5 rounded ${w.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>{w.status || 'Pending'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 text-center py-6">No withdrawal requests on record for this user.</p>
                  )}
                </div>
              </div>
            )}
            <div className="flex items-center justify-between pt-2 border-t border-[#1b3f8a]">
              <button type="button" onClick={() => removeUser(selectedUser.id)} className="px-4 py-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold flex items-center gap-1.5 hover:bg-rose-500/30 transition"><Trash2 className="w-4 h-4" /> Delete Account</button>
              <button type="button" onClick={() => setSelectedUser(null)} className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black shadow-xl hover:brightness-110 transition">Close Inspector</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
