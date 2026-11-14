import React from 'react';
import { investmentPlans } from '../data/mockData';
import { Check, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

export default function InvestmentPlans({ onSelectPlan }) {
  return (
    <section id="plans" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-indigo-400 font-semibold text-sm tracking-wider uppercase">Tailored Strategies</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Choose Your Investment Plan</h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Whether you are starting small or scaling an enterprise portfolio, we have a curated plan designed for your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {investmentPlans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative bg-slate-900 border rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:border-indigo-500 shadow-xl ${
                plan.popular ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950/40' : 'border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg flex items-center space-x-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Most Popular Choice</span>
                </div>
              )}

              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">Duration: {plan.duration}</p>
                  </div>
                  <span className="px-3 py-1 rounded-xl bg-slate-800 text-indigo-300 text-xs font-semibold">
                    Risk: {plan.risk}
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 mb-6">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-slate-400">Target ROI</span>
                    <span className="text-lg font-extrabold text-emerald-400">{plan.targetRoi}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Min. Deposit</span>
                    <span className="text-sm font-bold text-white">{plan.minDeposit}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Plan Features</span>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3 text-sm text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => onSelectPlan(plan)}
                className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all ${
                  plan.popular 
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30' 
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                <span>Invest in {plan.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
