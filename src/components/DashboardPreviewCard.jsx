import React from 'react';
import { Wallet, ShoppingBag, TrendingUp, Users, Check, ArrowRight, RefreshCw, Banknote } from 'lucide-react';

export default function DashboardPreviewCard({ onWithdraw, onReinvest, userData }) {
  const user = userData || {
    name: 'Md. Rahman',
    id: 'SR100245',
    status: 'Active',
    invested: 500,
    profit: 50,
    referral: 75,
    balance: 75
  };

  return (
    <div id="dashboard" className="bg-[#071738] border-2 border-amber-400/40 rounded-3xl p-5 shadow-2xl flex flex-col justify-between">
      {/* Box Header */}
      <div className="flex items-center space-x-2.5 pb-4">
        <div className="w-7 h-7 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-300">
          <Wallet className="w-4 h-4 text-amber-400" />
        </div>
        <h3 className="text-lg font-black text-white tracking-wide">Your Dashboard Preview</h3>
      </div>

      {/* Inside White Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-lg text-slate-800 flex-1 flex flex-col justify-between space-y-4">
        
        {/* User Profile Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md">
              <span className="font-extrabold text-sm">MR</span>
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm">{user.name}</h4>
              <p className="text-[11px] font-semibold text-slate-500">ID: {user.id}</p>
            </div>
          </div>
          <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-bold shadow-sm">
            <Check className="w-3 h-3 stroke-[3]" />
            <span>Active</span>
          </span>
        </div>

        {/* 2x2 Grid of Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          
          {/* Total Invested */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-3 text-center shadow-md">
            <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-white/20 flex items-center justify-center">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
            <span className="block text-[10px] font-semibold opacity-90 leading-tight">Total Invested</span>
            <span className="block text-base font-black mt-0.5">${user.invested}</span>
          </div>

          {/* Total Profit */}
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl p-3 text-center shadow-md">
            <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-white/20 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <span className="block text-[10px] font-semibold opacity-90 leading-tight">Total Profit</span>
            <span className="block text-base font-black mt-0.5">${user.profit}</span>
          </div>

          {/* Referral Earned */}
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-xl p-3 text-center shadow-md">
            <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-white/20 flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
            <span className="block text-[10px] font-semibold opacity-90 leading-tight">Referral Earned</span>
            <span className="block text-base font-black mt-0.5">${user.referral}</span>
          </div>

          {/* Available Balance */}
          <div className="bg-gradient-to-br from-amber-500 to-yellow-600 text-white rounded-xl p-3 text-center shadow-md">
            <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-white/20 flex items-center justify-center">
              <Wallet className="w-3.5 h-3.5" />
            </div>
            <span className="block text-[10px] font-semibold opacity-90 leading-tight">Available Balance</span>
            <span className="block text-base font-black mt-0.5">${user.balance}</span>
          </div>

        </div>

        {/* Action Buttons: Withdraw & Reinvest */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button 
            onClick={onWithdraw}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-600/30 transition-all"
          >
            <Banknote className="w-3.5 h-3.5" />
            <span>Withdraw &rarr;</span>
          </button>
          
          <button 
            onClick={onReinvest}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-md shadow-blue-600/30 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reinvest &rarr;</span>
          </button>
        </div>

      </div>
    </div>
  );
}
