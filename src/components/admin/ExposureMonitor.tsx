import React from 'react';
import { Activity, ShieldCheck, TrendingUp, BarChart3, Globe } from 'lucide-react';

export default function ExposureMonitor() {
  return (
    <div className="space-y-6">
      
      {/* 2 Column Exposure Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Gold Exposure */}
        <div className="bg-[#071738] border border-amber-400/40 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center font-black text-sm">
                Au
              </span>
              <div>
                <h4 className="font-black text-white text-base">XAUUSD Spot Gold Exposure</h4>
                <p className="text-xs text-slate-400">London &amp; NY Institutional Hedging</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
              Low Risk (1.2x)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 bg-[#030a1a] p-4 rounded-xl border border-[#173b7d] text-center">
            <div>
              <span className="text-[11px] text-slate-400 font-bold block">Open Long Volume</span>
              <span className="text-lg font-black text-emerald-400 mt-0.5">$240,500</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-bold block">Open Short Hedged</span>
              <span className="text-lg font-black text-amber-400 mt-0.5">$180,200</span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex justify-between font-bold">
              <span>Hedge Ratio</span>
              <span className="text-amber-400">85% Hedged (Neutral Market Risk)</span>
            </div>
            <div className="w-full bg-[#030a1a] rounded-full h-2 overflow-hidden border border-[#173b7d]">
              <div className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>

        {/* Silver Exposure */}
        <div className="bg-[#071738] border border-cyan-400/40 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-lg bg-cyan-400/20 text-cyan-300 flex items-center justify-center font-black text-sm">
                Ag
              </span>
              <div>
                <h4 className="font-black text-white text-base">XAGUSD Spot Silver Exposure</h4>
                <p className="text-xs text-slate-400">High Volatility Swing Liquidity</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold">
              Stable Buffer
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 bg-[#030a1a] p-4 rounded-xl border border-[#173b7d] text-center">
            <div>
              <span className="text-[11px] text-slate-400 font-bold block">Open Net Volume</span>
              <span className="text-lg font-black text-cyan-400 mt-0.5">$92,300</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-bold block">Liquidity Depth</span>
              <span className="text-lg font-black text-white mt-0.5">Tier 1 LPs</span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex justify-between font-bold">
              <span>Volatility Reserve</span>
              <span className="text-cyan-400">92% Capital Solvency</span>
            </div>
            <div className="w-full bg-[#030a1a] rounded-full h-2 overflow-hidden border border-[#173b7d]">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
        </div>

      </div>

      {/* Institutional Liquidity Providers */}
      <div className="bg-[#071738] border border-[#173b7d] rounded-2xl p-6 shadow-xl space-y-3">
        <h4 className="font-bold text-white text-sm flex items-center space-x-2">
          <Globe className="w-4 h-4 text-amber-400" />
          <span>Active Institutional Session Status</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-[#030a1a] p-3 rounded-xl border border-[#173b7d] flex items-center justify-between">
            <div>
              <span className="font-bold text-white block">London Fix Session (LSE / LBMA)</span>
              <span className="text-slate-400">Spread: 0.12 pips (Tight Institutional)</span>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
          <div className="bg-[#030a1a] p-3 rounded-xl border border-[#173b7d] flex items-center justify-between">
            <div>
              <span className="font-bold text-white block">New York COMEX / NYMEX Session</span>
              <span className="text-slate-400">Spread: 0.14 pips (Deep Order Book)</span>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          </div>
        </div>
      </div>

    </div>
  );
}
