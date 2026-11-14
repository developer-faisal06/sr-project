import React from 'react';
import { Trophy, Handshake, TrendingUp, ShieldCheck } from 'lucide-react';

export default function BottomBar() {
  return (
    <div className="mt-4 pb-4 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-r from-amber-500/20 via-[#071738] to-amber-500/20 border-2 border-amber-400/50 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        
        {/* 3 Trust Highlights */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-6 text-xs sm:text-sm font-bold text-white">
          <div className="flex items-center space-x-2 text-amber-300">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
            <span>Grow Your Wealth with Confidence</span>
          </div>

          <div className="hidden sm:block text-amber-400/40">|</div>

          <div className="flex items-center space-x-2 text-slate-200">
            <Handshake className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
            <span>Transparent &amp; Fair Platform</span>
          </div>

          <div className="hidden lg:block text-amber-400/40">|</div>

          <div className="flex items-center space-x-2 text-slate-200">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
            <span>Maximize Your Earnings</span>
          </div>
        </div>

        {/* Right Badge */}
        <div className="flex-shrink-0">
          <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-[#06132d] border border-amber-400/60 text-white text-xs sm:text-sm font-black shadow-lg">
            <ShieldCheck className="w-4 h-4 text-amber-400 fill-amber-400/20" />
            <span>Your Investment is Safe with Us</span>
          </div>
        </div>

      </div>
    </div>
  );
}

