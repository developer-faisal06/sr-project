import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, TrendingUp } from 'lucide-react';

export default function RoiCalculator({ onInvest, onOpenAuth }: any) {
  const [amount, setAmount] = useState(1000);
  const [months, setMonths] = useState(6);
  const [tier, setTier] = useState<'starter' | 'popular' | 'vip'>('popular');

  const rates = {
    starter: { rate: 0.08, label: 'Starter (8%/mo)' },
    popular: { rate: 0.10, label: 'Popular (10%/mo)' },
    vip: { rate: 0.12, label: 'VIP (12%/mo)' }
  };

  const monthlyRate = rates[tier].rate;
  const estimatedMonthly = Math.round(amount * monthlyRate);
  const totalReturn = Math.round(amount * (1 + monthlyRate * months));
  const netProfit = totalReturn - amount;

  const handleAction = () => {
    if (onInvest) {
      onInvest({
        id: tier,
        name: rates[tier].label,
        amount: `$${amount}`,
        min_amount: amount,
        roi: `~ ${Math.round(monthlyRate * 100)}%`
      });
    } else if (onOpenAuth) {
      onOpenAuth('register');
    }
  };

  return (
    <section id="calculator" className="py-6 sm:py-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#061430]/95 border-2 border-amber-400/40 rounded-3xl p-5 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <div className="text-center max-w-2xl mx-auto mb-6 space-y-1.5">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] font-black uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Yield Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-500">
            Simulate Your Bullion Growth
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Estimate session returns based on algorithmic liquidity pool performance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div>
              <label className="block text-xs font-black text-amber-300 uppercase tracking-wider mb-2">
                Strategy Tier
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['starter', 'popular', 'vip'] as const).map((s) => (
                  <button 
                    key={s} type="button" onClick={() => setTier(s)}
                    className={`py-2.5 rounded-xl text-xs font-black uppercase transition-all cursor-pointer ${
                      tier === s 
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md' 
                        : 'bg-[#091a3a] text-slate-300 border border-slate-700'
                    }`}
                  >
                    {s === 'starter' ? '8% Starter' : s === 'popular' ? '10% Popular' : '12% VIP'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 bg-[#091a3a]/60 p-3.5 rounded-2xl border border-amber-400/20">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300">Deposit Capital</span>
                <span className="text-base font-black text-amber-400">${amount.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="200" max="25000" step="100" value={amount} 
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full accent-amber-400 bg-slate-950 cursor-pointer h-2 rounded-lg"
              />
            </div>

            <div className="space-y-1.5 bg-[#091a3a]/60 p-3.5 rounded-2xl border border-amber-400/20">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300">Duration</span>
                <span className="text-base font-black text-cyan-400">{months} Months</span>
              </div>
              <input 
                type="range" min="1" max="12" step="1" value={months} 
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-950 cursor-pointer h-2 rounded-lg"
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-[#091a3a] to-[#040c1d] border border-amber-400/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Projected Total</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-amber-300">
                    ${totalReturn.toLocaleString()}
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-300 border border-amber-400/30">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Monthly Yield</span>
                  <span className="font-bold text-emerald-400">+${estimatedMonthly.toLocaleString()}/mo</span>
                </div>
                <div className="flex justify-between">
                  <span>Net Profit</span>
                  <span className="font-black text-emerald-400">+${netProfit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Capital Safety</span>
                  <span className="font-bold text-amber-300 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Principal Protected
                  </span>
                </div>
              </div>

              <button 
                type="button" onClick={handleAction}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <span>Invest in This Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
