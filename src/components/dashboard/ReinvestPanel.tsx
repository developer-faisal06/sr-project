import React from 'react';
import { RefreshCw } from 'lucide-react';

export default function ReinvestPanel({
  user,
  fmt,
  cur,
  reinvestAmount,
  setReinvestAmount,
  handleConfirmReinvest
}) {
  return (
    <div className="bg-[#051330] border border-[#173870] rounded-2xl p-4 shadow-xl flex flex-col justify-between space-y-3">
      <div>
        <div className="flex items-center space-x-2 text-white font-bold text-sm pb-3 border-b border-[#143063]">
          <RefreshCw className="w-4 h-4 text-amber-400" />
          <span>Reinvest & Grow Your Capital</span>
        </div>

        <div className="flex items-center justify-between mt-2.5">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🌱</span>
            <div>
              <span className="text-[10px] text-slate-400 block">Available for Reinvestment</span>
              <span className="text-sm font-black text-emerald-400 block">{fmt(user.reinvestment_balance)}</span>
            </div>
          </div>

          <div className="w-28">
            <span className="text-[9px] text-slate-400 block">Amount ({cur})</span>
            <input 
              type="number" 
              value={(reinvestAmount ?? '')}
              onChange={(e) => setReinvestAmount(e.target.value)}
              className="w-full px-2.5 py-1 rounded-lg bg-[#030c1f] border border-[#173a78] text-white font-bold text-xs focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div className="mt-3 pt-2">
          <button 
            onClick={handleConfirmReinvest}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg transition"
          >
            Confirm Reinvestment
          </button>
          <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 mt-1.5 px-1">
            <span>Est. Monthly Profit:</span>
            <span className="text-emerald-400 font-bold">
              +{fmt(Number(reinvestAmount || 0) * 0.07)} (7%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
