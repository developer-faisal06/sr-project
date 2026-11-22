import React from 'react';

export default function GoldBullionGlobe({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex flex-col items-center justify-center pointer-events-none select-none ${className}`}>
      
      {/* Ambient Radial Golden Glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/20 via-yellow-400/25 to-transparent rounded-full blur-2xl opacity-80 animate-pulse" />

      {/* Holographic Earth / Grid Sphere */}
      <div className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-full border border-amber-400/30 bg-gradient-to-b from-[#0e2756]/60 to-[#030a1a]/80 shadow-[0_0_50px_rgba(245,158,11,0.25)] flex items-center justify-center overflow-hidden backdrop-blur-sm">
        {/* Geometric Grid Lines */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#facc15_1px,transparent_1px)] [background-size:14px_14px]" />
        <div className="w-full h-full border border-amber-400/20 rounded-full scale-90" />
        <div className="w-full h-full border border-cyan-400/20 rounded-full scale-60" />
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-amber-400/40 to-transparent" />
        
        {/* Orbit Ring */}
        <div className="absolute w-44 h-44 sm:w-60 sm:h-60 border border-dashed border-amber-400/30 rounded-full animate-spin [animation-duration:25s]" />
      </div>

      {/* Upward Growth Trajectory Vector */}
      <div className="absolute -top-3 right-0 sm:right-2 z-20">
        <svg width="100" height="100" viewBox="0 0 120 120" fill="none" className="drop-shadow-[0_0_16px_rgba(250,204,21,0.9)]">
          <path 
            d="M 12 108 Q 50 75 100 16" 
            stroke="url(#goldGrad)" 
            strokeWidth="7" 
            strokeLinecap="round" 
          />
          <polygon points="102,6 116,20 96,28" fill="#facc15" />
          <defs>
            <linearGradient id="goldGrad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 3D Gold Bar Component */}
      <div className="absolute bottom-2 sm:bottom-3 z-10">
        <div className="relative w-36 sm:w-44 h-20 sm:h-22 bg-gradient-to-tr from-amber-700 via-yellow-400 to-amber-200 rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.6)] border-2 border-yellow-200/90 transform -rotate-6 flex flex-col items-center justify-center p-2.5 transition-transform duration-500 hover:rotate-0">
          <div className="border border-amber-950/40 rounded-lg w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-amber-400/20 to-amber-600/30">
            <span className="text-[8px] sm:text-[9px] font-black tracking-widest text-amber-950 uppercase">FINE GOLD</span>
            <span className="text-base sm:text-lg font-black text-amber-950 tracking-wider">999.9</span>
            <span className="text-[8px] sm:text-[9px] font-black text-amber-900 tracking-wider">NET WT 1000g</span>
          </div>
          {/* Shimmer Light Bar */}
          <div className="absolute top-1.5 left-3 right-3 h-0.5 bg-white/70 rounded-full" />
        </div>

        {/* Stacked Gold Bullion Coins */}
        <div className="absolute -bottom-2 -left-4 sm:-left-6 flex -space-x-3.5">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 border-2 border-yellow-100 shadow-xl flex items-center justify-center text-amber-950 font-black text-xs transform rotate-12">
            Au
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-slate-400 via-slate-100 to-slate-300 border-2 border-white shadow-xl flex items-center justify-center text-slate-900 font-black text-xs transform -rotate-12">
            Ag
          </div>
        </div>

        {/* Floating Mini Live Badge */}
        <div className="absolute -top-3 -left-3 sm:-left-5 bg-[#030a1a]/95 border border-emerald-400/60 rounded-full px-2.5 py-1 flex items-center gap-1.5 shadow-lg backdrop-blur">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[9px] font-black text-emerald-400 tracking-wider">LIVE 24/5</span>
        </div>
      </div>

    </div>
  );
}
