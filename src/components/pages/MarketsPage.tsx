import React, { useState } from 'react';
import { ArrowLeft, Clock } from 'lucide-react';

export default function MarketsPage({ onBackHome }) {
  const [activeTab, setActiveTab] = useState('gold');

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
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
        <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
          MARKET FOCUS ● DEMO
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">Gold &amp; Silver Markets</h1>
        <p className="text-xs sm:text-sm text-amber-300 font-semibold">
          Illustrative visual only — not live market data.
        </p>
      </div>

      <div className="bg-[#071738] border-2 border-amber-400/40 rounded-3xl p-6 shadow-2xl space-y-5">
        <div className="flex border-b border-[#173b7d] pb-3 space-x-4">
          <button 
            onClick={() => setActiveTab('gold')}
            className={`px-4 py-2 rounded-xl text-xs font-black ${activeTab === 'gold' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'}`}
          >
            Gold XAUUSD
          </button>
          <button 
            onClick={() => setActiveTab('silver')}
            className={`px-4 py-2 rounded-xl text-xs font-black ${activeTab === 'silver' ? 'bg-cyan-400 text-slate-950' : 'text-slate-400'}`}
          >
            Silver XAGUSD
          </button>
        </div>

        {activeTab === 'gold' ? (
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-black text-amber-400">$2,348.50</span>
              <span className="text-xs font-bold text-emerald-400">+1.42%</span>
            </div>
            <p className="text-xs text-slate-300">
              Primary focus on XAUUSD, including structured swing and short-term trading setups.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-black text-cyan-400">$28.45</span>
              <span className="text-xs font-bold text-emerald-400">+2.10%</span>
            </div>
            <p className="text-xs text-slate-300">
              Selective XAGUSD opportunities, with attention to volatility and risk exposure.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase">WHAT WE FOCUS ON</span>
          <h2 className="text-xl font-black text-white">A disciplined market approach</h2>
          <p className="text-xs text-slate-400">Our proposed activity and strategy areas.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-[#071738] p-4 rounded-2xl border border-amber-400/30">
            <span className="text-lg font-black text-amber-400">Au</span>
            <h4 className="font-bold text-white mt-1">Gold Trading</h4>
            <p className="text-slate-300 mt-1">Primary focus on XAUUSD, including structured swing and short-term trading setups.</p>
          </div>
          <div className="bg-[#071738] p-4 rounded-2xl border border-cyan-400/30">
            <span className="text-lg font-black text-cyan-400">Ag</span>
            <h4 className="font-bold text-white mt-1">Silver Trading</h4>
            <p className="text-slate-300 mt-1">Selective XAGUSD opportunities, with attention to volatility and risk exposure.</p>
          </div>
          <div className="bg-[#071738] p-4 rounded-2xl border border-blue-400/30">
            <span className="text-lg font-black text-blue-400">↗</span>
            <h4 className="font-bold text-white mt-1">Trading Sessions</h4>
            <p className="text-slate-300 mt-1">Market observation during the London and New York sessions, subject to market conditions.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase">TRADING STYLE</span>
          <h2 className="text-xl font-black text-white">Strategy is more than an entry signal.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-[#030a1a] p-4 rounded-2xl border border-[#173b7d]">
            <h4 className="font-bold text-amber-300">Swing Trading</h4>
            <p className="text-slate-300 mt-1">Following broader market structure and holding positions when the setup and risk plan allow.</p>
          </div>
          <div className="bg-[#030a1a] p-4 rounded-2xl border border-[#173b7d]">
            <h4 className="font-bold text-cyan-300">Scalping</h4>
            <p className="text-slate-300 mt-1">Short-term opportunities with strict position sizing and predefined exit criteria.</p>
          </div>
          <div className="bg-[#030a1a] p-4 rounded-2xl border border-rose-500/40">
            <h4 className="font-bold text-rose-300">Risk Management</h4>
            <p className="text-rose-200 mt-1">Capital is at risk in financial markets. Losses can occur, including loss of principal.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
