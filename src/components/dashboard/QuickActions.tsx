import React from 'react';
import { Zap, Download, Upload, RefreshCw, Users, FileText } from 'lucide-react';
import { notifySuccess } from '../../lib/notify';

export default function QuickActions({
  onDeposit,
  onWithdraw,
  onReinvest,
  handleCopyLink,
  copied
}) {
  return (
    <div className="lg:col-span-3 bg-[#051330] border border-[#173870] rounded-2xl p-4 flex flex-col justify-between shadow-xl space-y-3">
      <div className="flex items-center space-x-2 text-white font-bold text-sm pb-2 border-b border-[#143063]">
        <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
        <span>Quick Actions</span>
      </div>

      <div className="flex flex-col space-y-2">
        <button 
          onClick={onDeposit}
          className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:brightness-110 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg transition"
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Deposit Now</span>
        </button>

        <button 
          onClick={onWithdraw}
          className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:brightness-110 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg transition"
        >
          <Upload className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Withdraw Funds</span>
        </button>

        <button 
          onClick={onReinvest}
          className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:brightness-110 text-slate-950 font-black text-xs flex items-center justify-center space-x-2 shadow-lg transition"
        >
          <RefreshCw className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Reinvest Now</span>
        </button>

        <button 
          onClick={handleCopyLink}
          className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg transition"
        >
          <Users className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>{copied ? '✓ Link Copied!' : 'Copy Referral Link'}</span>
        </button>

        <button 
          onClick={() => notifySuccess('Transactions', 'Showing full transaction record.')}
          className="w-full py-2.5 px-3 rounded-xl bg-[#091f4d] hover:bg-[#0d2a66] border border-blue-500/30 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow transition"
        >
          <FileText className="w-3.5 h-3.5 text-blue-400" />
          <span>View Transactions</span>
        </button>
      </div>
    </div>
  );
}
