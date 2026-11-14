import React from 'react';
import { ArrowLeft, ShieldAlert, Compass, Clock, CheckCircle2 } from 'lucide-react';

export default function AboutPage({ onBackHome }) {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      
      <div>
        <button 
          onClick={onBackHome}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#071738] border border-amber-400/40 text-amber-300 hover:text-white text-xs font-bold transition-all shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to home</span>
        </button>
      </div>

      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-black uppercase">
          <Compass className="w-3.5 h-3.5" />
          <span>Demo Concept &amp; Approach</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          About Us <span className="text-amber-400 font-normal text-2xl sm:text-3xl block mt-1">/ আমাদের সম্পর্কে</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto">
          SR Investment is presented here as a demo concept focused on gold and silver market education and trading operations.
        </p>
        <p className="text-xs sm:text-sm text-amber-200/90 font-medium max-w-2xl mx-auto">
          SR Investment এখানে গোল্ড ও সিলভার মার্কেটভিত্তিক ট্রেডিং কার্যক্রমের একটি ডেমো ধারণা হিসেবে উপস্থাপিত।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#071738] border-2 border-amber-400/40 rounded-3xl p-6 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-amber-400">Au</span>
            <span className="px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 text-xs font-extrabold">XAUUSD</span>
          </div>
          <h3 className="text-lg font-black text-white">Gold Trading Focus</h3>
          <p className="text-sm text-slate-300">
            Primary focus on XAUUSD, including structured swing and short-term trading setups.
          </p>
          <div className="flex items-center space-x-2 text-xs text-emerald-400 font-bold pt-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>High Liquidity • Macro Trend Hedging</span>
          </div>
        </div>

        <div className="bg-[#071738] border-2 border-cyan-400/40 rounded-3xl p-6 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-cyan-400">Ag</span>
            <span className="px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-300 text-xs font-extrabold">XAGUSD</span>
          </div>
          <h3 className="text-lg font-black text-white">Silver Trading Focus</h3>
          <p className="text-sm text-slate-300">
            Selective XAGUSD opportunities, with attention to volatility and risk exposure.
          </p>
          <div className="flex items-center space-x-2 text-xs text-cyan-400 font-bold pt-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Dynamic Volatility • Predefined Sizing</span>
          </div>
        </div>
      </div>

      <div className="bg-[#071738] border border-[#173b7d] rounded-3xl p-6 shadow-xl space-y-3">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
          <Clock className="w-5 h-5" />
          <span>Active Trading Sessions</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300">
          Forex market activity focused on Gold (XAUUSD) and Silver (XAGUSD), with market activity during the London and New York sessions.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="bg-[#030a1a] p-3.5 rounded-2xl border border-[#173b7d]">
            <span className="text-xs font-bold text-amber-400">London Session</span>
            <p className="text-xs text-slate-300 mt-0.5">08:00 – 16:00 GMT (Breakouts &amp; Structure)</p>
          </div>
          <div className="bg-[#030a1a] p-3.5 rounded-2xl border border-[#173b7d]">
            <span className="text-xs font-bold text-cyan-400">New York Session</span>
            <p className="text-xs text-slate-300 mt-0.5">13:00 – 21:00 GMT (High Volatility Flow)</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-500/10 border-2 border-amber-400/50 rounded-2xl p-5 text-center space-y-2">
        <div className="flex items-center justify-center space-x-2 text-amber-400 font-bold text-xs uppercase">
          <ShieldAlert className="w-4 h-4" />
          <span>Notice</span>
        </div>
        <p className="text-xs text-amber-200/90 max-w-xl mx-auto font-medium">
          Before public launch, replace this sample content with reviewed, accurate company information and jurisdiction-specific legal documents.
        </p>
      </div>

      <div className="text-center pt-2">
        <button 
          onClick={onBackHome}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg"
        >
          Return to Home Page &rarr;
        </button>
      </div>

    </div>
  );
}
