import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function GoldBullionGlobe() {
  return (
    <div className="relative hidden xl:flex flex-col items-center justify-center w-64 h-72 pointer-events-none select-none">
      
      {/* Background Glowing Earth Globe Grid */}
      <div className="absolute top-2 w-48 h-48 rounded-full border border-blue-400/40 bg-gradient-to-b from-blue-600/20 to-transparent shadow-[0_0_50px_rgba(37,99,235,0.4)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]"></div>
        {/* Longitudinal & Latitudinal Lines */}
        <div className="w-full h-full border border-blue-300/20 rounded-full scale-75"></div>
        <div className="w-full h-full border border-blue-300/20 rounded-full scale-50"></div>
        <div className="absolute w-full h-[1px] bg-blue-400/30"></div>
      </div>

      {/* Upward Golden Trajectory Arrow */}
      <div className="absolute top-0 right-4 z-20">
        <div className="relative">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]">
            <path 
              d="M 10 110 Q 50 80 100 15" 
              stroke="url(#goldGrad)" 
              strokeWidth="8" 
              strokeLinecap="round" 
            />
            <polygon points="100,5 115,20 95,28" fill="#facc15" />
            <defs>
              <linearGradient id="goldGrad" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="50%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#fef08a" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* 3D Gold Bar */}
      <div className="absolute bottom-6 z-10">
        <div className="relative w-36 h-20 bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 rounded-lg shadow-2xl border-2 border-yellow-200 transform -rotate-12 flex flex-col items-center justify-center p-2">
          <div className="border border-amber-950/30 rounded w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-transparent to-amber-500/20">
            <span className="text-[9px] font-black tracking-widest text-amber-950 uppercase">FINE GOLD</span>
            <span className="text-sm font-black text-amber-950 tracking-wider">999.9</span>
            <span className="text-[8px] font-extrabold text-amber-900 tracking-tighter">SR GOLD ASSET</span>
          </div>
          {/* Shineline */}
          <div className="absolute top-1 left-2 right-2 h-0.5 bg-white/60 rounded-full"></div>
        </div>

        {/* Gold Coins Stack next to gold bar */}
        <div className="absolute -bottom-2 -left-6 flex -space-x-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 border-2 border-yellow-100 shadow-lg flex items-center justify-center text-amber-950 font-black text-[10px] transform rotate-12">
            $
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 border-2 border-yellow-100 shadow-lg flex items-center justify-center text-amber-950 font-black text-[10px] transform -rotate-6">
            $
          </div>
        </div>
      </div>

    </div>
  );
}
