import React from 'react';
import { Compass, UserPlus, Play } from 'lucide-react';
import RegisterCard from './RegisterCard';
import GoldBullionGlobe from './GoldBullionGlobe';

export default function Hero({ onOpenAuth, onWatchVideo, onRegisterSuccess, onExploreApproach, isLoggedIn, authUser, userRole, onGoToDashboard }) {
  return (
    <div id="home" className="relative bg-gradient-to-b from-[#06132d] via-[#091c3e] to-[#040c1d] pt-8 pb-12 text-white border-b border-[#173b7d]/40">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Column: Executive Photo + Pitch */}
          <div className="lg:col-span-8 flex flex-col md:flex-row items-center gap-6">
            <div className="w-48 sm:w-56 flex-shrink-0 rounded-3xl overflow-hidden border-2 border-amber-400/40 shadow-2xl bg-[#0a1f49]">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=80" 
                alt="Executive" 
                className="w-full h-80 object-cover object-top"
              />
              <div className="p-2.5 bg-[#0a1f49] text-center border-t border-amber-400/30">
                <span className="text-xs font-bold text-amber-300">Au &amp; Ag Focused Demo</span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-3.5">
              
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-[11px] font-black uppercase tracking-wider">
                <span>MARKET-FOCUSED • RISK-AWARE</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-500 leading-tight">
                Trade the Gold &amp; Silver markets with a clear process.
              </h1>
              
              <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
                SR Investment is a proposed trading business focused on XAUUSD and XAGUSD, with market activity during the London and New York sessions.
              </p>

              {/* 3 Key Market Stat Badges */}
              <div className="grid grid-cols-3 gap-2.5 py-2 max-w-md mx-auto md:mx-0 text-center">
                <div className="bg-[#030a1a] p-2.5 rounded-2xl border border-amber-400/30">
                  <span className="block text-xs sm:text-sm font-black text-amber-400">XAUUSD</span>
                  <span className="block text-[10px] text-slate-400">Gold market</span>
                </div>
                <div className="bg-[#030a1a] p-2.5 rounded-2xl border border-cyan-400/30">
                  <span className="block text-xs sm:text-sm font-black text-cyan-400">XAGUSD</span>
                  <span className="block text-[10px] text-slate-400">Silver market</span>
                </div>
                <div className="bg-[#030a1a] p-2.5 rounded-2xl border border-blue-400/30">
                  <span className="block text-xs sm:text-sm font-black text-blue-400">2 Sessions</span>
                  <span className="block text-[10px] text-slate-400">London &amp; New York</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
                <button 
                  onClick={() => onOpenAuth('register')}
                  className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Create demo account</span>
                </button>
                <button 
                  onClick={onExploreApproach} 
                  className="flex items-center space-x-2 px-6 py-3 rounded-full bg-[#0a1f49] border border-[#1e4693] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#133372] transition-colors"
                >
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span>Explore our approach</span>
                </button>
              </div>

            </div>

            {/* Glowing 3D Gold Bar + Globe Center Feature */}
            <GoldBullionGlobe />
          </div>

          {/* Right Column: Registration Card OR Welcome Back Card */}
          <div className="lg:col-span-4">
            {isLoggedIn ? (
              <div className="max-w-md mx-auto">
                <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 px-6 py-3 rounded-t-3xl font-black text-base flex items-center justify-center space-x-2">
                  <span>👋</span>
                  <span>Welcome Back!</span>
                </div>
                <div className="bg-[#071738] rounded-b-3xl p-6 border-x border-b border-amber-400/40 shadow-2xl space-y-4 text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg">
                    {(authUser?.name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <h3 className="text-xl font-black text-white">{authUser?.name || 'User'}</h3>
                  <p className="text-xs text-slate-400 font-mono">{authUser?.email}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${userRole === 'admin' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/40'}`}>
                    {userRole === 'admin' ? '🛡️ Master Admin' : '📊 Active Trader'}
                  </span>
                  <button
                    onClick={onGoToDashboard}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-sm shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span>{userRole === 'admin' ? 'Open Admin Panel →' : 'Go to Dashboard →'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <RegisterCard onOpenAuth={onOpenAuth} onRegisterSuccess={onRegisterSuccess} />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}



