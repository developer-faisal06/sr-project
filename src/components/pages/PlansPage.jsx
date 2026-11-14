import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { defaultPlans } from '../../services/api';

export default function PlansPage({ onBackHome, onOpenAuth, onInvest, plans = defaultPlans, referralRates }) {
  const activePlans = plans && plans.length > 0 ? plans : defaultPlans;
  const lvl1 = referralRates?.lvl1_commission ?? referralRates?.lvl1 ?? 15;
  const lvl2 = referralRates?.lvl2_commission ?? referralRates?.lvl2 ?? 10;
  const lvl3 = referralRates?.lvl3_commission ?? referralRates?.lvl3 ?? 5;
  const lvl4 = referralRates?.lvl4_commission ?? referralRates?.lvl4 ?? 1;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <div>
        <button 
          onClick={onBackHome}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#071738] border border-amber-400/40 text-amber-300 hover:text-white text-xs font-bold transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to home</span>
        </button>
      </div>

      <div className="text-center space-y-2">
        <span className="text-xs font-black text-amber-400 uppercase tracking-wider">DEMO PLANNER</span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">Investment planning</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Example amounts are for interface testing only. They are not live offers or promised returns.
        </p>
      </div>

      {/* Dynamic Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activePlans.map((p) => (
          <div key={p.id} className="relative bg-[#071738] border-2 border-amber-400/40 rounded-3xl p-6 shadow-2xl flex flex-col justify-between text-center">
            {p.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                POPULAR DEMO
              </div>
            )}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">{p.name}</span>
              <h3 className="text-3xl font-black text-white mt-2">{p.amount}</h3>
              <p className="text-xs text-emerald-400 font-extrabold mt-1">Monthly ROI: {p.roi}</p>
            </div>
            <div className="pt-6">
              <button 
                onClick={() => onInvest?.(p)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs uppercase"
              >
                Invest Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Referral Framework */}
      <div className="bg-[#071738] border border-[#173b7d] rounded-3xl p-6 sm:p-8 space-y-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase">REFERRAL FRAMEWORK</span>
          <h2 className="text-xl font-black text-white mt-1">Four-level referral settings</h2>
          <p className="text-xs text-slate-400">
            Admin-configurable example rates. No referral rewards are credited or paid in this demo.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-[#030a1a] p-4 rounded-2xl border border-purple-500/30">
            <span className="text-xs text-slate-400 font-bold block">Level 1</span>
            <span className="text-2xl font-black text-purple-400">{lvl1}%</span>
          </div>
          <div className="bg-[#030a1a] p-4 rounded-2xl border border-blue-500/30">
            <span className="text-xs text-slate-400 font-bold block">Level 2</span>
            <span className="text-2xl font-black text-blue-400">{lvl2}%</span>
          </div>
          <div className="bg-[#030a1a] p-4 rounded-2xl border border-teal-500/30">
            <span className="text-xs text-slate-400 font-bold block">Level 3</span>
            <span className="text-2xl font-black text-teal-400">{lvl3}%</span>
          </div>
          <div className="bg-[#030a1a] p-4 rounded-2xl border border-amber-500/30">
            <span className="text-xs text-slate-400 font-bold block">Level 4</span>
            <span className="text-2xl font-black text-amber-400">{lvl4}%</span>
          </div>
        </div>
      </div>

      {/* Payment Options */}
      <div className="bg-[#071738] border border-[#173b7d] rounded-3xl p-6 space-y-3">
        <span className="text-xs font-bold text-amber-400 uppercase">PAYMENT OPTIONS</span>
        <h3 className="text-lg font-black text-white">Payment methods configured by admin</h3>
        <p className="text-xs text-slate-400">
          Displayed for future integration planning only. No payment is collected in this demo.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <span className="px-4 py-2 rounded-xl bg-[#030a1a] border border-[#173b7d] text-xs font-bold text-slate-300">
            Binance (display only)
          </span>
          <span className="px-4 py-2 rounded-xl bg-[#030a1a] border border-[#173b7d] text-xs font-bold text-slate-300">
            Touch 'n Go eWallet (display only)
          </span>
        </div>
      </div>

    </div>
  );
}

