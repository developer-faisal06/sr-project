import React from 'react';
import { Clock } from 'lucide-react';
import { notifySuccess } from '../../lib/notify';

export default function TransactionsTable({ transactions, fmt }) {
  return (
    <div className="md:col-span-2 bg-[#051330] border border-[#173870] rounded-2xl p-4 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#143063]">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Recent Transactions</span>
          </div>
          <button 
            onClick={() => notifySuccess('Transactions', 'Full transaction history loaded.')} 
            className="text-[11px] font-bold text-blue-400 hover:text-blue-300"
          >
            View All ➔
          </button>
        </div>

        <div className="sr-table-wrap sr-scroll-hint mt-2">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[10px] font-bold text-slate-400 border-b border-[#132c5b]">
                <th className="py-2 px-1">#</th>
                <th className="py-2 px-1">Date & Time</th>
                <th className="py-2 px-1">Type</th>
                <th className="py-2 px-1">Amount</th>
                <th className="py-2 px-1">Method</th>
                <th className="py-2 px-1 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#102752]">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 font-semibold text-xs">
                    No transaction records found yet.
                  </td>
                </tr>
              ) : (
                transactions.map((tx, idx) => {
                  const isRed = tx.type.toLowerCase().includes('withdraw');
                  const isOrange = tx.type.toLowerCase().includes('reinvest');
                  const isBlue = tx.type.toLowerCase().includes('referral');
                  const typeColor = isRed ? 'text-rose-400' : isOrange ? 'text-amber-400' : isBlue ? 'text-cyan-400' : 'text-emerald-400';
                  return (
                    <tr key={tx.txn_id || idx} className="hover:bg-[#091f4d]/50 transition">
                      <td className="py-2.5 px-1 font-mono text-[10px] text-slate-400">{idx + 1}</td>
                      <td className="py-2.5 px-1 font-mono text-[11px] text-slate-200">{tx.date_time}</td>
                      <td className={`py-2.5 px-1 font-bold text-[11px] ${typeColor}`}>{tx.type}</td>
                      <td className="py-2.5 px-1 font-black text-[11px] text-white">{fmt(tx.amount)}</td>
                      <td className="py-2.5 px-1 text-[11px] text-slate-300">{tx.method}</td>
                      <td className="py-2.5 px-1 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black border ${
                          tx.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
