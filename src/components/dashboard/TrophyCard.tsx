import React from 'react';
import { Award } from 'lucide-react';

export default function TrophyCard() {
  return (
    <div className="bg-gradient-to-br from-[#0c2457] via-[#08183b] to-[#040e24] border-2 border-amber-400/40 rounded-2xl p-4 text-center shadow-xl relative overflow-hidden">
      <div className="flex items-center justify-center space-x-2 py-1">
        <span className="text-2xl text-amber-400">🌿</span>
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 p-0.5 shadow-lg shadow-amber-400/30 flex items-center justify-center">
          <Award className="w-6 h-6 text-slate-950 fill-slate-950" />
        </div>
        <span className="text-2xl text-amber-400">🌿</span>
      </div>

      <h4 className="text-sm font-black text-white mt-1.5">
        Together We Grow with <span className="text-amber-400">SR Investment</span>
      </h4>

      <div className="inline-block mt-2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[10px] font-black tracking-wider uppercase shadow-md">
        Invest • Earn • Prosper
      </div>
    </div>
  );
}
