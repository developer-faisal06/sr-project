import React from 'react';
import { Gem, ArrowRight, Sprout, Coins } from 'lucide-react';
import { defaultPlans } from '../services/api';

export default function InvestmentPlansCard({ plans = defaultPlans, onInvest }) {
  const activePlans = plans && plans.length > 0 ? plans : defaultPlans;

  return (
    <div id="plans" className="bg-[#071738] border-2 border-amber-400/40 rounded-3xl p-5 shadow-2xl flex flex-col justify-between">
      {/* Box Header */}
      <div className="flex items-center space-x-2.5 pb-4">
        <div className="w-7 h-7 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-300">
          <Gem className="w-4 h-4 text-amber-400" />
        </div>
        <h3 className="text-lg font-black text-white tracking-wide">Investment Plans</h3>
      </div>

      {/* Plans Container */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {activePlans.map((p) => (
          <div 
            key={p.id}
            className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 flex flex-col justify-between text-center pb-4 transition-all hover:scale-[1.02]"
          >
            {/* Popular Gold Ribbon */}
            {p.popular && (
              <div className="absolute top-2 -right-7 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 text-[10px] font-black uppercase py-0.5 px-8 rotate-45 shadow-md">
                Popular
              </div>
            )}

            <div>
              {/* Plan Title Header Banner */}
              <div className={`${p.badgeColor || 'bg-blue-600'} text-white font-extrabold text-xs py-2 px-3 mx-3 mt-3 rounded-xl shadow-sm`}>
                {p.name}
              </div>

              {/* Amount */}
              <div className="py-4">
                <span className="block text-2xl font-black text-slate-900 leading-none">
                  {p.amount}
                </span>
                <span className="block text-xs text-slate-500 font-semibold mt-1">
                  Investment
                </span>
              </div>

              {/* Profit */}
              <div className="pb-4">
                <span className="block text-xs text-slate-600 font-bold">
                  Monthly Profit
                </span>
                <span className="block text-xl font-black text-emerald-600 mt-0.5">
                  {p.roi}
                </span>
              </div>
            </div>

            {/* Invest Button */}
            <div className="px-3">
              <button 
                onClick={() => onInvest(p)}
                className={`w-full py-2 rounded-xl ${p.btnColor || 'bg-blue-600 hover:bg-blue-700'} text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-md transition-all`}
              >
                <span>Invest Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

