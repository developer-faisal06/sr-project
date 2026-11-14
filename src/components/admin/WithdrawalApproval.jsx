import React, { useState } from 'react';
import { Check, X, Clock, AlertCircle } from 'lucide-react';

export default function WithdrawalApproval({ withdrawals, onApprove, onReject }) {
  const [filter, setFilter] = useState('All');

  const filtered = withdrawals.filter((w) => filter === 'All' || w.status === filter);

  return (
    <div className="bg-[#071738] border border-[#173b7d] rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-white">Withdrawal Payout Requests</h3>
          <p className="text-xs text-slate-400">Review payout requests submitted via bKash, Nagad, or Crypto.</p>
        </div>

        {/* Filters */}
        <div className="flex space-x-1.5 text-xs font-bold">
          {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filter === status 
                  ? 'bg-amber-400 text-slate-950 font-black' 
                  : 'bg-[#030a1a] text-slate-400 border border-[#173b7d] hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="sr-table-wrap">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#173b7d] text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Method &amp; Account</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#173b7d]/50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-400">
                  No withdrawal requests found for filter: {filter}
                </td>
              </tr>
            ) : (
              filtered.map((w) => (
                <tr key={w.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-white">{w.userName}</div>
                    <div className="text-[11px] text-slate-400">{w.userEmail}</div>
                  </td>
                  <td className="py-3 px-4 font-black text-amber-400 text-sm">${w.amount}</td>
                  <td className="py-3 px-4">
                    <span className="font-bold uppercase text-white">{w.method}</span>
                    <div className="text-[11px] text-slate-400 font-mono">{w.account}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{w.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase ${
                      w.status === 'Approved' 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : w.status === 'Rejected' 
                          ? 'bg-rose-500/20 text-rose-400' 
                          : 'bg-amber-500/20 text-amber-300 animate-pulse'
                    }`}>
                      {w.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    {w.status === 'Pending' ? (
                      <>
                        <button 
                          onClick={() => onApprove(w.id)}
                          className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-colors"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => onReject(w.id)}
                          className="px-3 py-1 rounded-lg bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white font-bold text-[11px] transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-[11px] text-slate-500 font-semibold">Processed</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
