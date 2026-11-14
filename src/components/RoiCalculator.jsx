import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function RoiCalculator() {
  const [amount, setAmount] = useState(10000);
  const [months, setMonths] = useState(12);
  const [strategy, setStrategy] = useState('growth');

  const rates = { starter: 0.10, growth: 0.18, elite: 0.30 };
  const annualRate = rates[strategy];
  const totalReturn = amount * Math.pow(1 + annualRate / 12, months);
  const netProfit = totalReturn - amount;

  return (
    <section id="calculator" className="py-20 bg-slate-900/50 border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-indigo-400 font-semibold text-sm tracking-wider uppercase">Interactive Tools</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Compound ROI Calculator</h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Estimate your potential earnings over time based on our historical strategy performance.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Strategy</label>
                <div className="grid grid-cols-3 gap-2">
                  {['starter', 'growth', 'elite'].map((s) => (
                    <button 
                      key={s}
                      onClick={() => setStrategy(s)}
                      className={`py-2.5 rounded-xl text-xs font-bold uppercase transition-all ${strategy === s ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-950 text-slate-400 border border-slate-800'}`}
                    >
                      {s} ({rates[s]*100}%)
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-300">Principal Deposit</label>
                  <span className="text-lg font-bold text-indigo-400">${amount.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="500" max="100000" step="500" value={amount} 
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-950 cursor-pointer h-2 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-300">Duration (Months)</label>
                  <span className="text-lg font-bold text-indigo-400">{months} Mos</span>
                </div>
                <input 
                  type="range" min="3" max="36" step="1" value={months} 
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-950 cursor-pointer h-2 rounded-lg"
                />
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold">Projected Outcome</span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">${Math.round(totalReturn).toLocaleString()}</h3>
                <p className="text-xs text-slate-500 mt-1">Estimated balance at maturity</p>
              </div>

              <div className="space-y-4 py-4 border-t border-b border-slate-800">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Principal</span>
                  <span className="text-sm font-bold text-white">${amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Net Profit</span>
                  <span className="text-sm font-bold text-emerald-400">+${Math.round(netProfit).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">APY</span>
                  <span className="text-sm font-bold text-indigo-400">{annualRate * 100}%</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>Historical averages compounding.</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
