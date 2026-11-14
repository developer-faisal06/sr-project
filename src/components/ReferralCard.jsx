import React from 'react';
import { Users, User, Share2 } from 'lucide-react';

export default function ReferralCard({ rates = { lvl1: 15, lvl2: 10, lvl3: 5, lvl4: 1 }, onCopyReferral }) {
  const lvl1 = rates?.lvl1_commission ?? rates?.lvl1 ?? 15;
  const lvl2 = rates?.lvl2_commission ?? rates?.lvl2 ?? 10;
  const lvl3 = rates?.lvl3_commission ?? rates?.lvl3 ?? 5;
  const lvl4 = rates?.lvl4_commission ?? rates?.lvl4 ?? 1;

  return (
    <div id="referral" className="bg-[#071738] border-2 border-amber-400/40 rounded-3xl p-5 shadow-2xl flex flex-col justify-between">
      {/* Box Header */}
      <div className="flex items-center space-x-2.5 pb-4">
        <div className="w-7 h-7 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-300">
          <Users className="w-4 h-4 text-amber-400" />
        </div>
        <h3 className="text-lg font-black text-white tracking-wide">Referral Commission</h3>
      </div>

      {/* Inside White Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-lg text-center flex-1 flex flex-col justify-between">
        
        <div>
          <h4 className="text-sm font-black text-slate-800 mb-4">
            Invite Your Friends &amp; Earn More!
          </h4>

          {/* 4-Tier Pyramid */}
          <div className="flex flex-col items-center justify-center space-y-1.5 py-2">
            
            {/* 4th Level */}
            <div className="flex items-center space-x-3">
              <div className="w-24 h-9 bg-gradient-to-r from-amber-400 to-amber-500 rounded-t-xl flex items-center justify-center shadow-md text-white font-bold">
                <User className="w-4 h-4 fill-white" />
              </div>
              <div className="text-left leading-tight w-20">
                <span className="block text-[11px] font-bold text-slate-600">4th Level</span>
                <span className="block text-sm font-black text-amber-500">{lvl4}%</span>
              </div>
            </div>

            {/* 3rd Level */}
            <div className="flex items-center space-x-3">
              <div className="w-36 h-9 bg-gradient-to-r from-teal-400 to-teal-500 rounded-md flex items-center justify-center shadow-md text-white font-bold">
                <User className="w-4 h-4 fill-white" />
              </div>
              <div className="text-left leading-tight w-20">
                <span className="block text-[11px] font-bold text-slate-600">3rd Level</span>
                <span className="block text-sm font-black text-teal-600">{lvl3}%</span>
              </div>
            </div>

            {/* 2nd Level */}
            <div className="flex items-center space-x-3">
              <div className="w-48 h-9 bg-gradient-to-r from-blue-500 to-blue-600 rounded-md flex items-center justify-center shadow-md text-white font-bold">
                <User className="w-4 h-4 fill-white" />
              </div>
              <div className="text-left leading-tight w-20">
                <span className="block text-[11px] font-bold text-slate-600">2nd Level</span>
                <span className="block text-sm font-black text-blue-600">{lvl2}%</span>
              </div>
            </div>

            {/* 1st Level */}
            <div className="flex items-center space-x-3">
              <div className="w-60 h-10 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-b-xl flex items-center justify-center shadow-md text-white font-bold">
                <User className="w-4 h-4 fill-white" />
              </div>
              <div className="text-left leading-tight w-20">
                <span className="block text-[11px] font-bold text-slate-600">1st Level</span>
                <span className="block text-sm font-black text-purple-700">{lvl1}%</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Banner Button */}
        <div className="pt-4">
          <button 
            onClick={onCopyReferral}
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wide shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Get Commission from Your Referrals</span>
          </button>
        </div>

      </div>
    </div>
  );
}

