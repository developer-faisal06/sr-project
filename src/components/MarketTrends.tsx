import React from 'react';
import { marketTrends } from '../data/mockData';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export default function MarketTrends() {
  return (
    <section id="markets" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-indigo-400 font-semibold text-sm tracking-wider uppercase">Live Markets</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Real-Time Asset Ticker</h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md mt-4 md:mt-0">
            Monitor real-time prices across major cryptocurrencies, global indices, and blue-chip equities.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="sr-table-wrap">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6 font-semibold">Asset</th>
                  <th className="py-4 px-6 font-semibold">Symbol</th>
                  <th className="py-4 px-6 font-semibold">Price (USD)</th>
                  <th className="py-4 px-6 font-semibold">24h Change</th>
                  <th className="py-4 px-6 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {marketTrends.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-white flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-indigo-600/20 flex items-center justify-center text-indigo-400 font-bold text-xs">
                        {item.symbol.slice(0, 3)}
                      </div>
                      <span>{item.name}</span>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-400 font-mono">{item.symbol}</td>
                    <td className="py-4 px-6 font-bold text-white">{item.price}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                        item.isUp ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {item.isUp ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : <TrendingDown className="w-3.5 h-3.5 mr-1" />}
                        <span>{item.change}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors">
                        Trade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
