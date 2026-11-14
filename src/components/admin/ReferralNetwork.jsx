import React, { useState, useEffect } from 'react';
import { Users, DollarSign, Clock, CheckCircle2, Save } from 'lucide-react';
import { notifySuccess, notifyWarning } from '../../lib/notify';

export default function ReferralNetwork({ users, settings, onSaveSettings }) {
  const [formData, setFormData] = useState({
    lvl1_commission: settings?.lvl1_commission ?? 15,
    lvl2_commission: settings?.lvl2_commission ?? 10,
    lvl3_commission: settings?.lvl3_commission ?? 5,
    lvl4_commission: settings?.lvl4_commission ?? 1,
    min_referral_withdrawal: settings?.min_referral_withdrawal ?? 20
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        lvl1_commission: settings.lvl1_commission ?? 15,
        lvl2_commission: settings.lvl2_commission ?? 10,
        lvl3_commission: settings.lvl3_commission ?? 5,
        lvl4_commission: settings.lvl4_commission ?? 1,
        min_referral_withdrawal: settings.min_referral_withdrawal ?? 20
      });
    }
  }, [settings]);

  const totalReferrals = users?.length || 0;
  const totalReferralEarnings = users?.reduce((acc, u) => acc + (u.referral_earned || 0), 0) || 0;
  const totalReferralWithdrawn = users?.reduce((acc, u) => acc + (u.referral_withdrawn || 0), 0) || 0;
  const totalReferralAvailable = totalReferralEarnings - totalReferralWithdrawn;

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await onSaveSettings({
        lvl1_commission: Number(formData.lvl1_commission),
        lvl2_commission: Number(formData.lvl2_commission),
        lvl3_commission: Number(formData.lvl3_commission),
        lvl4_commission: Number(formData.lvl4_commission),
        min_referral_withdrawal: Number(formData.min_referral_withdrawal)
      });
      notifySuccess('Referral Settings Saved!', 'Commission rates & min withdrawal saved to database.');
    } catch (err) {
      console.error('Referral save error:', err);
      notifyWarning('Database Error', 'Could not save referral settings to database.');
    }
  };

  return (
    <div className="bg-[#071738] border border-[#173b7d] rounded-2xl p-5 shadow-xl space-y-5 text-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-black text-white text-lg">Referral Network Manager</h3>
          <p className="text-[10px] text-slate-400">Admin control over multi-level referral commission & user earnings.</p>
        </div>
        <div className="bg-[#030a1a] p-3 rounded-xl border border-[#173b7d] flex flex-col gap-2">
          <span className="font-bold text-amber-400 text-[10px]">Total Registered</span>
          <span className="text-xl font-black text-white">{totalReferrals}</span>
        </div>
        <div className="bg-[#030a1a] p-3 rounded-xl border border-[#173b7d] flex flex-col gap-2">
          <span className="font-bold text-emerald-400 text-[10px]">Total Referral Earned</span>
          <span className="text-xl font-black text-emerald-400">$ {totalReferralEarnings}</span>
        </div>
        <div className="bg-[#030a1a] p-3 rounded-xl border border-[#173b7d] flex flex-col gap-2">
          <span className="font-bold text-rose-400 text-[10px]">Available for Withdraw</span>
          <span className="text-xl font-black text-rose-400">$ {totalReferralAvailable}</span>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-[#030a1a] border border-[#173b7d] rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-slate-300 text-xs">Commission Rates (%)</span>
          <span className="text-[10px] text-slate-400">Stored in system_settings table</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          <div className="bg-[#030a1a] p-2 rounded border border-[#173b7d]">
            <label className="font-bold text-amber-400 text-[9px] block uppercase">Level 1</label>
            <input 
              type="number" step="0.1" value={formData.lvl1_commission} 
              onChange={(e) => setFormData({ ...formData, lvl1_commission: e.target.value })} 
              className="w-full p-1 rounded bg-[#071738] border border-[#173b7d] text-white text-[10px] font-bold" 
            />
          </div>
          <div className="bg-[#030a1a] p-2 rounded border border-[#173b7d]">
            <label className="font-bold text-slate-300 text-[9px] block uppercase">Level 2</label>
            <input 
              type="number" value={formData.lvl2_commission} 
              onChange={(e) => setFormData({ ...formData, lvl2_commission: e.target.value })} 
              className="w-full p-1 rounded bg-[#071738] border border-[#173b7d] text-white text-[10px] font-bold" 
            />
          </div>
          <div className="bg-[#030a1a] p-2 rounded border border-[#173b7d]">
            <label className="font-bold text-slate-300 text-[9px] block uppercase">Level 3</label>
            <input 
              type="number" value={formData.lvl3_commission} 
              onChange={(e) => setFormData({ ...formData, lvl3_commission: e.target.value })} 
              className="w-full p-1 rounded bg-[#071738] border border-[#173b7d] text-white text-[10px] font-bold" 
            />
          </div>
          <div className="bg-[#030a1a] p-2 rounded border border-[#173b7d]">
            <label className="font-bold text-slate-300 text-[9px] block uppercase">Level 4</label>
            <input 
              type="number" value={formData.lvl4_commission} 
              onChange={(e) => setFormData({ ...formData, lvl4_commission: e.target.value })} 
              className="w-full p-1 rounded bg-[#071738] border border-[#173b7d] text-white text-[10px] font-bold" 
            />
          </div>
          <div className="bg-[#030a1a] p-3 rounded-xl border border-[#173b7d] flex flex-col items-center justify-center">
            <span className="font-bold text-slate-400 text-[10px] block uppercase">Min Referral Withdrawal ($)</span>
            <input 
              type="number" value={formData.min_referral_withdrawal} 
              onChange={(e) => setFormData({ ...formData, min_referral_withdrawal: e.target.value })} 
              className="w-full p-2 rounded bg-[#071738] border border-[#173b7d] text-white text-[10px] font-bold" 
            />
          </div>
        </div>
        <button type="submit" className="px-6 py-2 rounded-xl bg-amber-400 text-slate-950 font-black uppercase shadow-lg flex items-center space-x-1">
          <Save className="w-3.5 h-3.5" />
          <span>Save Referral Settings to Database</span>
        </button>
      </form>

      <div className="bg-[#030a1a] border border-[#173b7d] rounded-2xl p-4 space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-[#173b7d]">
          <span className="font-bold text-amber-400 text-xs">Referral Earnings Directory</span>
          <span className="text-[10px] text-slate-400">Total: {totalReferrals} users</span>
        </div>
        <div className="sr-table-wrap">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#173b7d] text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Invested</th>
                <th className="py-3 px-4">Referral Earned</th>
                <th className="py-3 px-4">Referral Withdrawn</th>
                <th className="py-3 px-4 text-right">Available</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#173b7d]/50">
              {(users || []).map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">{u.name}</td>
                  <td className="py-3 px-4 text-[10px] text-slate-400 font-mono">{u.email}</td>
                  <td className="py-3 px-4 font-bold text-slate-200">$ {(u.invested || 0)}</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">$ {(u.referral_earned || 0)}</td>
                  <td className="py-3 px-4 font-bold text-slate-500">$ {(u.referral_withdrawn || 0)}</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">$ {(u.referral_earned || 0) - (u.referral_withdrawn || 0)}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold ${u.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
                      {u.status === 'Active' ? 'Active' : 'Suspended'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}