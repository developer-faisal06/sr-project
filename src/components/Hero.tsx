import React from 'react';
import { Compass, UserPlus, ShieldCheck, Award } from 'lucide-react';
import RegisterCard from './RegisterCard';

export default function Hero({ onOpenAuth, onWatchVideo, onRegisterSuccess, onExploreApproach, isLoggedIn, authUser, userRole, onGoToDashboard }: any) {
  return (
    <div id="home" className="relative bg-gradient-to-b from-[#06132d] via-[#091c3e] to-[#040c1d] pt-6 sm:pt-10 pb-12 sm:pb-16 text-white border-b border-[#173b7d]/40 overflow-hidden">
      
      {/* Ambient Radial Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Pitch & Live Tickers */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
            
            <div className="inline-flex items-center space-x-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-inner max-w-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span className="truncate">INSTITUTIONAL BULLION DESK • LONDON &amp; NY</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-500 leading-[1.18] tracking-tight">
              Trade Gold &amp; Silver Markets with Algorithmic Precision.
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              SR Investment operates session-driven quantitative strategies across XAU/USD and XAG/USD liquidity pools. Experience automated session execution, dynamic capital protection, and transparent monthly yield distribution.
            </p>

            {/* CTAs Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-2 w-full">
              <button 
                type="button"
                onClick={() => onOpenAuth('register')}
                className="flex items-center justify-center space-x-2 px-7 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create a Account</span>
              </button>

              <button 
                type="button"
                onClick={onExploreApproach} 
                className="flex items-center justify-center space-x-2 px-6 py-4 rounded-full bg-[#0a1f49] border border-amber-400/40 text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#133372] transition-colors cursor-pointer"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Explore Approach</span>
              </button>
            </div>

            {/* Desk Executive Supervision Trust Badge - Enlarged & Prominent */}
            <div className="pt-3 w-full flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-4 sm:gap-5 p-3.5 sm:p-4 pr-6 sm:pr-8 rounded-3xl bg-gradient-to-r from-[#071738]/95 via-[#0c2452]/90 to-[#071738]/95 border-2 border-amber-400/40 backdrop-blur-xl shadow-2xl text-left max-w-full">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=240&auto=format&fit=crop&q=80" 
                  alt="Desk Executive" 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover object-top border-2 border-amber-400 shadow-xl shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                    <span className="text-base sm:text-lg font-black text-white tracking-wide">Sharif Rahman</span>
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-[10px] sm:text-xs bg-amber-400/25 text-amber-300 px-2.5 py-0.5 rounded-full font-black border border-amber-400/40">
                      DESK LEAD
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-200/90 font-semibold mt-1">
                    Head of Bullion Trading &amp; Market Execution
                  </p>
                  <p className="text-[11px] text-slate-300 leading-tight mt-0.5">
                    Supervised Institutional Protocol • London &amp; New York Sessions
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Registration Card OR VIP Investor Pass + Market Tickers */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center gap-3.5 w-full">
            {isLoggedIn ? (
              <div className="w-full max-w-md mx-auto">
                <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 px-6 py-3.5 rounded-t-3xl font-black text-sm flex items-center justify-between shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 fill-slate-950" />
                    <span className="uppercase tracking-wider">VIP Investor Portal</span>
                  </div>
                  <span className="bg-slate-950/20 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                    SESSION ACTIVE
                  </span>
                </div>
                <div className="bg-gradient-to-b from-[#08183a]/95 via-[#061430]/95 to-[#030919]/95 rounded-b-3xl p-6 border-x-2 border-b-2 border-amber-400/40 shadow-2xl space-y-4 text-center backdrop-blur-xl">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 font-black text-2xl shadow-xl">
                    {(authUser?.name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">{authUser?.name || 'Authorized Trader'}</h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{authUser?.email}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${userRole === 'admin' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/40'}`}>
                      {userRole === 'admin' ? '🛡️ Master Admin' : '📊 Verified Trader'}
                    </span>
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/40">
                      Tier-1 Liquidity
                    </span>
                  </div>
                  <button
                    onClick={onGoToDashboard}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 flex items-center justify-center space-x-2 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>{userRole === 'admin' ? 'Open Master Admin Panel →' : 'Launch Trading Terminal →'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <RegisterCard onOpenAuth={onOpenAuth} onRegisterSuccess={onRegisterSuccess} />
            )}

            {/* Real-time Tickers Bar directly under the Form */}
            <div className="w-full max-w-md mx-auto">
              <div className="bg-gradient-to-r from-[#061430]/95 via-[#081b3f]/95 to-[#061430]/95 border-2 border-amber-400/35 rounded-2xl p-3 sm:p-3.5 shadow-xl backdrop-blur-xl">
                <div className="flex items-center justify-between px-1 pb-2 border-b border-amber-400/20 mb-2.5">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest">
                      Real-Time Session Feed
                    </span>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase">
                    Live Quotes
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                  {/* Gold Card */}
                  <div className="bg-[#030919]/90 p-2 sm:p-2.5 rounded-xl border border-amber-400/40 text-center shadow-md hover:border-amber-400 transition-all">
                    <div className="flex items-center justify-center space-x-1">
                      <span className="text-xs font-black text-amber-400">XAUUSD</span>
                      <span className="text-[9px] font-bold text-emerald-400">▲</span>
                    </div>
                    <span className="block text-xs sm:text-sm font-black text-white mt-0.5">$2,684.50</span>
                    <span className="block text-[8px] sm:text-[9px] text-amber-300/80 font-bold uppercase tracking-wider">Gold</span>
                  </div>

                  {/* Silver Card */}
                  <div className="bg-[#030919]/90 p-2 sm:p-2.5 rounded-xl border border-cyan-400/40 text-center shadow-md hover:border-cyan-400 transition-all">
                    <div className="flex items-center justify-center space-x-1">
                      <span className="text-xs font-black text-cyan-400">XAGUSD</span>
                      <span className="text-[9px] font-bold text-emerald-400">▲</span>
                    </div>
                    <span className="block text-xs sm:text-sm font-black text-white mt-0.5">$31.85</span>
                    <span className="block text-[8px] sm:text-[9px] text-cyan-300/80 font-bold uppercase tracking-wider">Silver</span>
                  </div>

                  {/* 2 Sessions Card */}
                  <div className="bg-[#030919]/90 p-2 sm:p-2.5 rounded-xl border border-blue-400/40 text-center shadow-md hover:border-blue-400 transition-all">
                    <span className="block text-xs font-black text-blue-400 leading-tight">2 Sessions</span>
                    <span className="block text-[11px] sm:text-xs font-bold text-slate-100 mt-0.5">London/NY</span>
                    <span className="block text-[8px] sm:text-[9px] text-emerald-400 font-black uppercase tracking-wider">24/5 Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}



