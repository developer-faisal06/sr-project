import React from 'react';
import { User, Calendar, CheckCircle2, Phone, Plus } from 'lucide-react';

export default function HeroBanner({ user, onDeposit, onWithdraw }) {
  return (
    <div className="relative rounded-3xl bg-gradient-to-r from-[#091f4d] via-[#09245c] to-[#0e3b91] border-2 border-amber-400/40 p-5 sm:p-7 shadow-2xl overflow-hidden">
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        {/* Left Column: Greeting, Badges, Buttons */}
        <div className="space-y-4 max-w-xl">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Welcome Back, <span className="text-amber-400">{user.name}!</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base font-medium mt-1">
              Your Investment Journey at a Glance
            </p>
          </div>

          {/* 4 Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <div className="flex items-center space-x-1.5 bg-[#051330]/80 border border-[#1b3f7f] px-2.5 py-1.5 rounded-lg text-slate-200">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>User ID <strong className="text-white font-mono ml-0.5">{user.id}</strong></span>
            </div>
            <div className="flex items-center space-x-1.5 bg-[#051330]/80 border border-[#1b3f7f] px-2.5 py-1.5 rounded-lg text-slate-200">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Reg. Date <strong className="text-white ml-0.5">{user.reg_date}</strong></span>
            </div>
            <div className="flex items-center space-x-1 bg-[#051330]/80 border border-emerald-500/30 px-2.5 py-1.5 rounded-lg text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Email Verified</span>
            </div>
            <div className="flex items-center space-x-1 bg-[#051330]/80 border border-emerald-500/30 px-2.5 py-1.5 rounded-lg text-emerald-300">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Phone Verified</span>
            </div>
          </div>

          {/* 2 CTA Buttons */}
          <div className="flex items-center space-x-3 pt-1">
            <button 
              onClick={onDeposit}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-xl hover:brightness-110 flex items-center space-x-2 transition transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Deposit Now</span>
            </button>
            <button 
              onClick={onWithdraw}
              className="px-6 py-2.5 rounded-xl bg-[#0e3b91]/90 hover:bg-[#1248b3] border border-blue-400/50 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center space-x-2 transition transform hover:-translate-y-0.5"
            >
              <span>➔ Withdraw Funds</span>
            </button>
          </div>
        </div>

        {/* Right Column: Visual illustration matching photo */}
        <div className="relative flex items-center justify-center w-full lg:w-auto">
          <div className="absolute -top-3 right-0 sm:right-4 z-20 flex items-center space-x-2 bg-[#05173d]/90 border border-emerald-500/60 px-3 py-1.5 rounded-2xl shadow-xl">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-left leading-none">
              <span className="text-[9px] text-slate-400 uppercase font-semibold block">Account Status:</span>
              <span className="text-xs font-black text-emerald-400">Active</span>
            </div>
          </div>

          <div className="relative w-64 sm:w-72 h-44 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-700 via-cyan-500 to-indigo-800 opacity-80 blur-sm absolute left-10 top-3"></div>
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 280 180" fill="none">
              <path d="M 30 145 Q 140 125, 235 45" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" />
              <polygon points="235,45 218,45 230,58" fill="#f59e0b" />
            </svg>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-400 via-blue-600 to-indigo-900 p-1 shadow-2xl">
                <div className="w-full h-full rounded-full bg-[#07193d] flex items-center justify-center text-4xl font-black text-amber-300">
                  👍
                </div>
              </div>
            </div>
            <div className="absolute -bottom-1 right-2 flex flex-col items-end z-20">
              <div className="w-14 h-3.5 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 rounded-sm shadow border border-yellow-100"></div>
              <div className="w-16 h-3.5 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-600 rounded-sm shadow border border-yellow-100 -mt-0.5"></div>
              <div className="w-18 h-3.5 bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-500 rounded-sm shadow border border-yellow-100 -mt-0.5"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
