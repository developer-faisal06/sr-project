import React from 'react';
import { TrendingUp, Plus, CheckCircle2, ShieldCheck, Clock, ArrowRight } from 'lucide-react';

export default function UserInvestmentsView({ portfolio = [], user, fmt, onDeposit }) {
  const activePortfolio = portfolio.filter(item => {
    const st = (item.status || 'Active').toLowerCase();
    return st === 'active' || st === 'running' || st === 'approved';
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#091f4d] via-[#09245c] to-[#0e3b91] border border-amber-400/40 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">Investment Portfolio</span>
          <h2 className="text-2xl font-black text-white mt-1">My Active Investments</h2>
          <p className="text-slate-300 text-xs mt-0.5">Real-time performance of your currently active Gold & Silver commodity portfolios.</p>
        </div>
        <button 
          onClick={onDeposit}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs shadow-lg hover:brightness-110 flex items-center space-x-1.5 transition"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Invest in New Plan</span>
        </button>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#051330] border border-[#173870] rounded-2xl p-4 shadow-xl">
          <span className="text-xs font-semibold text-slate-400 block">Total Active Investment</span>
          <span className="text-2xl font-black text-white mt-1 block">{fmt(user.active_investment)}</span>
          <span className="text-[11px] font-bold text-blue-400 mt-1 block">↑ {activePortfolio.length} Active Contracts</span>
        </div>
        <div className="bg-[#051330] border border-[#173870] rounded-2xl p-4 shadow-xl">
          <span className="text-xs font-semibold text-slate-400 block">Total Profit Generated</span>
          <span className="text-2xl font-black text-emerald-400 mt-1 block">+{fmt(user.profit)}</span>
          <span className="text-[11px] font-bold text-emerald-400 mt-1 block">↑ Lifetime Payouts</span>
        </div>
        <div className="bg-[#051330] border border-[#173870] rounded-2xl p-4 shadow-xl">
          <span className="text-xs font-semibold text-slate-400 block">Average Monthly Return</span>
          <span className="text-2xl font-black text-amber-300 mt-1 block">~ {user.monthly_profit_pct || 7.00}%</span>
          <span className="text-[11px] font-bold text-amber-300 mt-1 block">↑ {fmt(user.monthly_profit)} / mo</span>
        </div>
      </div>

      {/* Investment Plans Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-white uppercase tracking-wider">Currently Active Contracts</h3>
        {activePortfolio.length === 0 ? (
          <div className="bg-[#051330] border border-[#173870] rounded-2xl p-12 text-center space-y-3">
            <TrendingUp className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm font-bold text-slate-300">No active investment plans right now</p>
            <p className="text-xs text-slate-500">Make a deposit and get your investment approved to see active contracts here.</p>
            {onDeposit && (
              <button onClick={onDeposit} className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">
                Invest Now
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activePortfolio.map((item, idx) => (
              <div key={item.id || idx} className="bg-[#051330] border border-[#173870] hover:border-amber-400/50 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4 transition">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#143063]">
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 font-bold">{item.id || `INV-00${idx + 1}`}</span>
                      <h4 className="text-base font-black text-white mt-0.5">{item.name || `Commodity Swing Tier ${idx + 1}`}</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                  </div>

                  <div className="space-y-2 mt-4 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Principal Amount:</span>
                      <strong className="text-white font-mono">{fmt(item.amount)}</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Current Valuation:</span>
                      <strong className="text-emerald-400 font-mono">{fmt(item.current_value || item.amount)}</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Profit Accrued:</span>
                      <strong className="text-emerald-400 font-bold">+{fmt(item.profit || 0)} ({item.rate_pct || 7}%)</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Start Date:</span>
                      <span>{item.date_str || 'Today'}</span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-4 pt-3 border-t border-[#122b59]">
                    <div className="flex justify-between text-[10px] text-slate-400 mb-1 font-semibold">
                      <span>Contract Progress</span>
                      <span className="text-amber-400">Active &amp; Generating Daily ROI</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#030c1f] overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full w-[45%]" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-slate-400 flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    <span>SIPC Insured</span>
                  </span>
                  <span className="text-amber-300 font-bold">Automated Reinvest: ON</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
