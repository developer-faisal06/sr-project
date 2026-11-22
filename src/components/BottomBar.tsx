import React from 'react';
import { Trophy, Handshake, ShieldCheck, Zap } from 'lucide-react';

export default function BottomBar() {
  return (
    <div className="my-4 pb-4 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-r from-amber-500/10 via-[#061430]/95 to-amber-500/10 border-2 border-amber-400/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-4 text-center lg:text-left">
        
        {/* Trust Credentials */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 text-xs sm:text-sm font-bold text-white">
          <div className="flex items-center space-x-2.5 text-amber-300">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
            <span>Institutional Bullion Desk</span>
          </div>

          <div className="hidden sm:block text-amber-400/30">|</div>

          <div className="flex items-center space-x-2.5 text-slate-200">
            <Handshake className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
            <span>Segregated Client Capital</span>
          </div>

          <div className="hidden md:block text-amber-400/30">|</div>

          <div className="flex items-center space-x-2.5 text-slate-200">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
            <span>Instant Multi-Gateway Payouts</span>
          </div>
        </div>

        {/* Security Verified Pill */}
        <div className="shrink-0">
          <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-[#030919] border border-amber-400/50 text-white text-xs sm:text-sm font-black shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300">Capital Protected Desk</span>
          </div>
        </div>

      </div>
    </div>
  );
}

