import React, { useState } from 'react';
import { UserPlus, Search, Eye, X, Edit3, Trash2, Shield, Mail, Phone, Lock, DollarSign, Award, Upload, Camera } from 'lucide-react';
import { notifyWarning, notifySuccess, notifyConfirm } from '../../lib/notify';
import { supabase } from '../../lib/supabaseClient';
export default function UserManagement({ users = [], onToggleRole, onToggleStatus, onCreateUser, onUpdateUser, onDeleteUser }) {
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    password: '',
    avatar_url: '',
    role: 'user', 
    account_tier: 'PROSPECT', 
    invested: 0, 
    balance: 0, 
    country: '', 
    status: 'Active' 
  });
  const filtered = users.filter((u) => ((u.name || '') + ' ' + (u.email || '') + ' ' + (u.id || '')).toLowerCase().includes(query.toLowerCase()));
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const updateEdit = (key, value) => setEditForm((prev) => ({ ...prev, [key]: value }));
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
  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (onCreateUser) await onCreateUser(form);
      setForm({ name: '', email: '', phone: '', password: '', avatar_url: '', role: 'user', account_tier: 'PROSPECT', invested: 0, balance: 0, country: '', status: 'Active' });
      setShowForm(false);
    } finally {
      setSaving(false);
    }
  };
  const openDetails = (u, startEditing = false) => {
    setSelectedUser(u);
    setEditForm({ ...u });
    setEditMode(startEditing);
  };
  const saveEdit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (onUpdateUser) {
        await onUpdateUser(editForm);
      } else {
        const { error } = await supabase.from('profiles').update({
          name: editForm.name,
          email: editForm.email?.trim().toLowerCase(),
          phone: editForm.phone || null,
          country: editForm.country || null,
          role: editForm.role || 'user',
          account_tier: editForm.account_tier || 'PROSPECT',
          invested: Number(editForm.invested || 0),
          balance: Number(editForm.balance || 0),
          status: editForm.status || 'Active'
        }).eq('id', editForm.id);
        if (error) throw error;
      }
      setSelectedUser({ ...editForm });
      setEditMode(false);
      notifySuccess('Profile Updated', 'User saved to database successfully.');
    } catch (err) {
      notifyWarning('Update Failed', err?.message || 'Could not update user in database.');
    } finally {
      setSaving(false);
    }
  };
  const removeUser = async (userId) => {
    const ok = await notifyConfirm('Delete User?', 'Are you sure you want to remove this user from database?', 'Yes, Delete');
    if (!ok) return;
    try {
      if (onDeleteUser) {
        await onDeleteUser(userId);
      } else {
        const { error } = await supabase.from('profiles').delete().eq('id', userId);
        if (error) throw error;
      }
      setSelectedUser(null);
      notifySuccess('Deleted', 'User removed from database successfully.');
    } catch (err) {
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
            <input placeholder="Md. Rahman" value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400" />
          </div>
          <div>
            <label className="text-[11px] font-bold text-amber-300 block mb-1">Email Address</label>
            <input placeholder="user@example.com" value={form.email} onChange={(e) => update('email', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400" />
          </div>
          <div>
            <label className="text-[11px] font-bold text-amber-300 block mb-1">Set Password</label>
            <input type="password" placeholder="Password (optional)" value={form.password} onChange={(e) => update('password', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400" />
          </div>
          <div>
            <label className="text-[11px] font-bold text-amber-300 block mb-1">Phone Number</label>
            <input placeholder="+8801XXXXXXXXX" value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400" />
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
                  value={form.avatar_url.startsWith('data:') ? '' : form.avatar_url}
                  onChange={(e) => update('avatar_url', e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-[#030a1a] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400 text-xs"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="text-[11px] font-bold text-amber-300 block mb-1">Country</label>
            <input placeholder="Bangladesh" value={form.country} onChange={(e) => update('country', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400" />
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
            <label className="text-[11px] font-bold text-amber-300 block mb-1">Initial Investment ($)</label>
            <input type="number" min="0" value={form.invested} onChange={(e) => update('invested', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400 font-bold text-amber-300" />
          </div>
          <div>
            <label className="text-[11px] font-bold text-amber-300 block mb-1">Initial Balance ($)</label>
            <input type="number" min="0" value={form.balance} onChange={(e) => update('balance', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400 font-bold text-emerald-400" />
          </div>
          <div className="sm:col-span-2 lg:col-span-4 flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition">Cancel</button>
            <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-black shadow-lg hover:brightness-110 transition">{saving ? 'Saving...' : 'Save User to Database'}</button>
          </div>
        </form>
      )}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search users or email..." className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#040d24] border border-[#1b3f8a] text-white text-xs outline-none focus:border-amber-400 shadow" />
      </div>
      <div className="sr-table-wrap rounded-2xl border border-[#1b3f8a] bg-[#040d24]/60">
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
            {editMode ? (
              <form onSubmit={saveEdit} className="space-y-4 bg-[#040d24] p-5 rounded-3xl border border-amber-400/40">
                <h4 className="font-black text-amber-400 text-sm mb-2">Modify User Profile & Financial Data (Direct Database Update)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Full Name</label>
                    <input value={editForm.name || ''} onChange={(e) => updateEdit('name', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Email Address</label>
                    <input value={editForm.email || ''} onChange={(e) => updateEdit('email', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Set New Password (optional)</label>
                    <input type="password" placeholder="Leave blank to keep current" value={editForm.password || ''} onChange={(e) => updateEdit('password', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400" />
                  </div>
                  <div className="sm:col-span-2 flex items-center gap-3 bg-[#071738] p-3 rounded-xl border border-[#1b3f8a]">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400/60 bg-[#030a1a] flex items-center justify-center text-amber-300 font-bold shrink-0 shadow">
                      {editForm.avatar_url ? (
                        <img src={editForm.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
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
                        {editForm.avatar_url && (
                          <button type="button" onClick={() => updateEdit('avatar_url', '')} className="px-2.5 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 text-[11px] font-bold">
                            Remove
                          </button>
                        )}
                        <input
                          placeholder="Or paste image URL..."
                          value={(editForm.avatar_url || '').startsWith('data:') ? '' : (editForm.avatar_url || '')}
                          onChange={(e) => updateEdit('avatar_url', e.target.value)}
                          className="flex-1 px-3 py-1.5 bg-[#030a1a] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Phone Number</label>
                    <input value={editForm.phone || ''} onChange={(e) => updateEdit('phone', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Country</label>
                    <input value={editForm.country || ''} onChange={(e) => updateEdit('country', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Account Tier</label>
                    <select value={editForm.account_tier || 'PROSPECT'} onChange={(e) => updateEdit('account_tier', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400">
                      <option value="PROSPECT">Prospect</option>
                      <option value="ACTIVE_INVESTOR">Active Investor</option>
                      <option value="VIP_INSTITUTIONAL">VIP Institutional</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">System Role</label>
                    <select value={editForm.role || 'user'} onChange={(e) => updateEdit('role', e.target.value)} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400">
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Invested Capital ($)</label>
                    <input type="number" value={editForm.invested ?? 0} onChange={(e) => updateEdit('invested', Number(e.target.value))} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Available Balance ($)</label>
                    <input type="number" value={editForm.balance ?? 0} onChange={(e) => updateEdit('balance', Number(e.target.value))} className="w-full px-3.5 py-2.5 bg-[#071738] border border-[#1b3f8a] rounded-xl text-white outline-none focus:border-amber-400" />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-3">
                  <button type="button" onClick={() => setEditMode(false)} className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition">Cancel</button>
                  <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-black shadow-lg hover:brightness-110 transition">{saving ? 'Saving...' : 'Save Changes to Database'}</button>
                </div>
              </form>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-[#040d24] p-3.5 rounded-2xl border border-[#1b3f8a] space-y-1 shadow">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">User Unique ID</span>
                    <span className="font-mono font-black text-amber-300 text-sm">{selectedUser.id}</span>
                  </div>
                  <div className="bg-[#040d24] p-3.5 rounded-2xl border border-[#1b3f8a] space-y-1 shadow">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1"><Mail className="w-3 h-3 text-blue-400" /> Email</span>
                    <span className="font-bold text-white truncate block">{selectedUser.email}</span>
                  </div>
                  <div className="bg-[#040d24] p-3.5 rounded-2xl border border-[#1b3f8a] space-y-1 shadow">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1"><Phone className="w-3 h-3 text-emerald-400" /> Phone</span>
                    <span className="font-bold text-white">{selectedUser.phone || 'Not provided'}</span>
                  </div>
                  <div className="bg-[#040d24] p-3.5 rounded-2xl border border-[#1b3f8a] space-y-1 shadow">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1"><Award className="w-3 h-3 text-purple-400" /> Account Tier</span>
                    <span className="font-black text-blue-300">{selectedUser.account_tier || 'PROSPECT'}</span>
                  </div>
                  <div className="bg-[#040d24] p-3.5 rounded-2xl border border-[#1b3f8a] space-y-1 shadow">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold flex items-center gap-1"><Lock className="w-3 h-3 text-amber-400" /> System Role</span>
                    <span className="font-black text-amber-300 uppercase">{selectedUser.role}</span>
                  </div>
                  <div className="bg-[#040d24] p-3.5 rounded-2xl border border-[#1b3f8a] space-y-1 shadow">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Account Status</span>
                    <span className={'font-black ' + (selectedUser.status === 'Active' ? 'text-emerald-400' : 'text-rose-400')}>{selectedUser.status || 'Active'}</span>
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
