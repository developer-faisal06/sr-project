import React, { useState } from 'react';
import { Users, Copy, Check, Share2, Award, ArrowUpRight } from 'lucide-react';
import { notifySuccess } from '../../../lib/notify';
import { fetchReferralCommissionLocks } from '../../../services/api';

export default function UserReferralView({ user, fmt }) {
  const [copied, setCopied] = useState(false);
  const [lockedCommissions, setLockedCommissions] = useState([]);

  React.useEffect(() => {
    let active = true;
    fetchReferralCommissionLocks(user?.id).then((rows) => { if (active) setLockedCommissions(rows); }).catch(() => {});
    return () => { active = false; };
  }, [user?.id]);

  const referralLink = `https://srinvestment.com/join?ref=${user.id}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(referralLink);
    setCopied(true);
    notifySuccess('Referral Link Copied!', referralLink);
    setTimeout(() => setCopied(false), 2000);
  };

  const downline = [
    { id: 'SR-201', name: 'Tanvir Ahmed', level: 'Level 1', invested: 1000, commission: 150, status: 'Active' },
    { id: 'SR-202', name: 'Sharmin Sultana', level: 'Level 1', invested: 500, commission: 75, status: 'Active' },
    { id: 'SR-305', name: 'Kamal Hossain', level: 'Level 2', invested: 200, commission: 20, status: 'Active' },
    { id: 'SR-412', name: 'Nadia Islam', level: 'Level 3', invested: 100, commission: 5, status: 'Active' }
  ];

  return (
    <div className="space-y-6">
      {/* Referral Link Card */}
      <div className="bg-gradient-to-r from-[#091f4d] via-[#09245c] to-[#0e3b91] border border-amber-400/40 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">Multi-Tier Network</span>
          <h2 className="text-2xl font-black text-white">Refer & Earn Real Commission</h2>
          <p className="text-slate-300 text-xs">Invite partners to earn up to 4 levels of passive income.</p>
        </div>

        <div className="flex items-center space-x-2 bg-[#051330]/90 border border-amber-400/50 p-1.5 rounded-xl w-full md:w-auto">
          <span className="text-xs font-mono text-slate-300 px-3 truncate max-w-[220px]">{referralLink}</span>
          <button 
            onClick={handleCopy}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs shadow flex items-center space-x-1.5 flex-shrink-0 hover:brightness-110 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>

      {/* 4 Levels Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { lvl: 'Level 1', rate: '15%', note: 'Direct Referrals', color: 'from-amber-400/20 to-yellow-500/10 border-amber-400/40 text-amber-300' },
          { lvl: 'Level 2', rate: '10%', note: 'Sub-Referrals', color: 'from-blue-500/20 to-indigo-500/10 border-blue-400/40 text-blue-300' },
          { lvl: 'Level 3', rate: '5%', note: '3rd Tier Network', color: 'from-emerald-500/20 to-teal-500/10 border-emerald-400/40 text-emerald-300' },
          { lvl: 'Level 4', rate: '1%', note: '4th Tier Network', color: 'from-purple-500/20 to-pink-500/10 border-purple-400/40 text-purple-300' }
        ].map((tier, i) => (
          <div key={i} className={`bg-gradient-to-br ${tier.color} border rounded-2xl p-4 text-center shadow-lg`}>
            <span className="text-xs font-bold text-slate-400 block">{tier.lvl}</span>
            <span className={`text-2xl font-black ${tier.text || 'text-white'} block mt-1`}>{tier.rate}</span>
            <span className="text-[10px] text-slate-400 mt-1 block">{tier.note}</span>
          </div>
        ))}
      </div>

      <div className="bg-[#051330] border border-amber-400/30 rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between"><div><h3 className="text-sm font-black text-white">Referral Commission Lock</h3><p className="text-[11px] text-slate-400">Referral commissions are shown here while their 45 working-day lock is active.</p></div><span className="text-xs font-black text-amber-300">{fmt(lockedCommissions.filter((item) => item.status === 'LOCKED' || item.status === 'PENDING').reduce((sum, item) => sum + Number(item.commission_amount || 0), 0))} locked</span></div>
        {lockedCommissions.length > 0 ? <div className="space-y-2">{lockedCommissions.slice(0, 5).map((item) => <div key={item.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#030c1f] border border-[#173a78] p-3 text-xs"><span className="text-slate-300">{item.status}</span><span className="font-black text-amber-300">{fmt(item.commission_amount)}</span><span className="text-slate-500">Unlock: {item.unlock_date ? new Date(item.unlock_date).toLocaleDateString() : 'Calculating...'}</span></div>)}</div> : <p className="text-xs text-slate-500">No referral lock records available yet.</p>}
      </div>

      {/* Downline Members Table */}
      <div className="bg-[#051330] border border-[#173870] rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-[#143063]">
          <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2">
            <Users className="w-4 h-4 text-amber-400" />
            <span>Downline Team Members</span>
          </h3>
          <span className="text-xs text-slate-400 font-bold">{user.team_members} Active Members</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[10px] font-bold text-slate-400 border-b border-[#132c5b]">
                <th className="py-2.5 px-2">Member ID</th>
                <th className="py-2.5 px-2">Name</th>
                <th className="py-2.5 px-2">Tier Level</th>
                <th className="py-2.5 px-2">Invested</th>
                <th className="py-2.5 px-2">Earned Commission</th>
                <th className="py-2.5 px-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#102752]">
              {downline.map((m, i) => (
                <tr key={i} className="hover:bg-[#091f4d]/50 transition">
                  <td className="py-2.5 px-2 font-mono text-slate-300 font-bold">{m.id}</td>
                  <td className="py-2.5 px-2 font-semibold text-white">{m.name}</td>
                  <td className="py-2.5 px-2 text-amber-400 font-bold">{m.level}</td>
                  <td className="py-2.5 px-2 font-mono text-white">{fmt(m.invested)}</td>
                  <td className="py-2.5 px-2 font-mono font-bold text-emerald-400">+{fmt(m.commission)}</td>
                  <td className="py-2.5 px-2 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {m.status}
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
