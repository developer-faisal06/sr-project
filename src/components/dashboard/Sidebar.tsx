import React from 'react';
import { 
  Home, TrendingUp, Users, ArrowLeftRight, Download, Upload, RefreshCw, 
  Headphones, LogOut, X, ArrowLeft, ShieldCheck, BellRing
} from 'lucide-react';

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  onBackHome,
  onDeposit,
  onWithdraw,
  onLogout
}) {
  const navBtn = (id, label, Icon, action) => (
    <button 
      onClick={action || (() => setActiveTab(id))}
      className={`sr-menu-item flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition text-left ${
        activeTab === id && !action
          ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black shadow'
          : 'text-slate-300 hover:text-white hover:bg-[#0c224f]'
      }`}
    >
      <Icon className={`w-4 h-4 ${activeTab === id && !action ? 'text-slate-950 stroke-[2.5]' : 'text-amber-400'}`} />
      <span>{label}</span>
    </button>
  );

  return null;
  /* return (
    <aside className={`sr-push-drawer ${sidebarOpen ? 'is-open' : ''} fixed lg:sticky top-0 left-0 z-50 h-[100dvh] w-[min(86vw,320px)] lg:w-60 bg-gradient-to-b from-[#061433] via-[#05112b] to-[#030a1c] border-r border-[#15346d] flex flex-col justify-between p-3.5 shadow-2xl lg:translate-x-0`}>
      <div className="space-y-4 min-h-0 overflow-y-auto overscroll-contain">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={onBackHome}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow">
              <div className="w-full h-full bg-[#05112b] rounded-md flex items-end justify-center p-1 space-x-0.5">
                <div className="w-1 h-2 bg-amber-400 rounded-xs"></div>
                <div className="w-1 h-3 bg-amber-400 rounded-xs"></div>
                <div className="w-1 h-4 bg-yellow-200 rounded-xs"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black text-white">SR <span className="text-amber-400">Investment</span></span>
              <span className="text-[9px] italic text-amber-300/80">Invest Today, Grow Tomorrow</span>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
        </div>

        <nav className="flex flex-col space-y-1">
          {navBtn('dashboard', 'Dashboard', Home)}
          {navBtn('investments', 'My Investments', TrendingUp)}
          {navBtn('referral', 'Referral', Users)}
          {navBtn('kyc', 'KYC Verification', ShieldCheck)}
          {navBtn('notifications', 'Notifications', BellRing)}
          {navBtn('transactions', 'Recent Transactions', ArrowLeftRight)}
          {navBtn('deposit', 'Deposit', Download, onDeposit)}
          {navBtn('withdraw', 'Withdrawal', Upload, onWithdraw)}
          {navBtn('reinvestment', 'Reinvestment', RefreshCw)}
          <div className="py-1"><div className="h-[1px] w-full bg-[#15346d]"></div></div>
          {navBtn('support', 'Support / Help Center', Headphones)}
          {navBtn('logout', 'Logout', LogOut, onLogout || onBackHome)}
        </nav>
      </div>

      <div className="shrink-0 p-2.5 rounded-xl bg-gradient-to-br from-[#0c265e] to-[#06122c] border border-amber-400/40 text-center">
        <span className="block text-[11px] font-black text-amber-300 mb-1">Grow Your Wealth with Confidence</span>
        <div className="flex justify-center py-1">
          <div className="relative w-20 h-6 flex items-center justify-center">
            <div className="w-12 h-2.5 bg-gradient-to-r from-amber-500 to-yellow-300 rounded-xs shadow transform -rotate-3"></div>
            <div className="w-12 h-2.5 bg-gradient-to-r from-amber-600 to-yellow-400 rounded-xs shadow absolute top-0.5 right-1 transform rotate-6"></div>
          </div>
        </div>
        <button onClick={onBackHome} className="mt-1 w-full py-1 rounded bg-amber-400/15 border border-amber-400/40 text-[10px] font-bold text-amber-300 flex items-center justify-center space-x-1">
          <ArrowLeft className="w-3 h-3" /><span>Back to Home</span>
        </button>
      </div>
    </aside>
  ); */
}
