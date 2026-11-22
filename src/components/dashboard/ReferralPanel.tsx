import React from 'react';
import { Users } from 'lucide-react';

export default function ReferralPanel({ user, fmt, handleCopyLink }) {
  return (
    <div className="bg-[#051330] border border-[#173870] rounded-2xl p-4 shadow-xl flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#143063]">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <Users className="w-4 h-4 text-amber-400" />
            <span>Referral Rewards & Commission</span>
          </div>
          <button onClick={handleCopyLink} className="text-[11px] font-bold text-blue-400 hover:text-blue-300">
            View Details ➔
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="bg-[#030c1f] border border-[#143269] rounded-xl p-2.5 text-center">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-1 text-xs">
              👥
            </div>
            <span className="text-[9px] font-bold text-slate-400 block">Total Referral</span>
            <span className="text-xs font-black text-white block mt-0.5">{fmt(user.referral)}</span>
          </div>

          <div className="bg-[#030c1f] border border-[#143269] rounded-xl p-2.5 text-center">
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 mx-auto flex items-center justify-center mb-1 text-xs">
              💼
            </div>
            <span className="text-[9px] font-bold text-slate-400 block">Available Comm.</span>
            <span className="text-xs font-black text-emerald-400 block mt-0.5">{fmt(user.available_commission)}</span>
          </div>

          <div className="bg-[#030c1f] border border-[#143269] rounded-xl p-2.5 text-center">
            <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-1 text-xs">
              ⏳
            </div>
            <span className="text-[9px] font-bold text-slate-400 block">Pending Comm.</span>
            <span className="text-xs font-black text-amber-300 block mt-0.5">{fmt(user.pending_commission)}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#122b59] text-center text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block">Total Referrals</span>
            <span className="text-sm font-black text-white mt-0.5 block">{user.total_referrals}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Team Members</span>
            <span className="text-sm font-black text-white mt-0.5 block">{user.team_members}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Active Referrals</span>
            <span className="text-sm font-black text-emerald-400 mt-0.5 block">{user.active_referrals}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
