import React from 'react';
import { Users, User, Share2 } from 'lucide-react';

export default function ReferralCard({ rates, onCopyReferral }: any) {
  const r = (rates || {}) as any;
  const lvl1 = r?.lvl1_commission ?? r?.lvl1 ?? 15;
  const lvl2 = r?.lvl2_commission ?? r?.lvl2 ?? 10;
  const lvl3 = r?.lvl3_commission ?? r?.lvl3 ?? 5;
  const lvl4 = r?.lvl4_commission ?? r?.lvl4 ?? 1;

  return (
    <div id="referral" className="h-full bg-[#071738] border-2 border-amber-400/40 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between">
      {/* Box Header */}
      <div className="flex items-center space-x-2.5 pb-4">
        <div className="w-7 h-7 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-300">
          <Users className="w-4 h-4 text-amber-400" />
        </div>
        <h3 className="text-lg font-black text-white tracking-wide">Referral Commission</h3>
      </div>

      {/* Inside White Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-lg text-center flex-1 flex flex-col justify-between">
        
        <div className="w-full">
          <h4 className="text-sm sm:text-base font-black text-slate-800 mb-3 sm:mb-4">
            Invite Your Friends &amp; Earn More!
          </h4>

          {/* 4-Tier Pyramid with Full Responsive Scaling */}
          <div className="flex flex-col items-center justify-center space-y-2 py-1 sm:py-2 w-full max-w-sm mx-auto">
            
            {/* 4th Level */}
            <div className="flex items-center justify-center space-x-2.5 sm:space-x-3 w-full">
              <div className="w-20 sm:w-28 h-8 sm:h-9 bg-gradient-to-r from-amber-400 to-amber-500 rounded-t-xl flex items-center justify-center shadow-md text-white font-bold shrink-0">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
              </div>
              <div className="text-left leading-tight w-20 sm:w-24 shrink-0">
                <span className="block text-[10px] sm:text-[11px] font-bold text-slate-600">4th Level</span>
                <span className="block text-xs sm:text-sm font-black text-amber-500">{lvl4}%</span>
              </div>
            </div>

            {/* 3rd Level */}
            <div className="flex items-center justify-center space-x-2.5 sm:space-x-3 w-full">
              <div className="w-28 sm:w-40 h-8 sm:h-9 bg-gradient-to-r from-teal-400 to-teal-500 rounded-md flex items-center justify-center shadow-md text-white font-bold shrink-0">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
              </div>
              <div className="text-left leading-tight w-20 sm:w-24 shrink-0">
                <span className="block text-[10px] sm:text-[11px] font-bold text-slate-600">3rd Level</span>
                <span className="block text-xs sm:text-sm font-black text-teal-600">{lvl3}%</span>
              </div>
            </div>

            {/* 2nd Level */}
            <div className="flex items-center justify-center space-x-2.5 sm:space-x-3 w-full">
              <div className="w-36 sm:w-52 h-8 sm:h-9 bg-gradient-to-r from-blue-500 to-blue-600 rounded-md flex items-center justify-center shadow-md text-white font-bold shrink-0">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
              </div>
              <div className="text-left leading-tight w-20 sm:w-24 shrink-0">
                <span className="block text-[10px] sm:text-[11px] font-bold text-slate-600">2nd Level</span>
                <span className="block text-xs sm:text-sm font-black text-blue-600">{lvl2}%</span>
              </div>
            </div>

            {/* 1st Level */}
            <div className="flex items-center justify-center space-x-2.5 sm:space-x-3 w-full">
              <div className="w-44 sm:w-64 h-9 sm:h-10 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-b-xl flex items-center justify-center shadow-md text-white font-bold shrink-0">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
              </div>
              <div className="text-left leading-tight w-20 sm:w-24 shrink-0">
                <span className="block text-[10px] sm:text-[11px] font-bold text-slate-600">1st Level</span>
                <span className="block text-xs sm:text-sm font-black text-purple-700">{lvl1}%</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Banner Button */}
        <div className="pt-3 sm:pt-4 w-full">
          <button 
            type="button"
            onClick={onCopyReferral}
            className="w-full py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wide shadow-md hover:shadow-lg active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Get Commission from Your Referrals</span>
          </button>
        </div>

      </div>
    </div>
  );
}


