import React, { useState } from 'react';
import { ArrowLeftRight, Search, Download, Filter } from 'lucide-react';

export default function UserTransactionsView({ transactions, fmt }) {
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = transactions.filter(tx => {
    const matchType = filterType === 'All' || tx.type.toLowerCase().includes(filterType.toLowerCase());
    const matchSearch = tx.txn_id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        tx.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        tx.method.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-[#051330] border border-[#173870] rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">Financial Audit Trail</span>
          <h2 className="text-2xl font-black text-white mt-1">Transaction Ledger</h2>
          <p className="text-slate-300 text-xs">Complete transparent records of all debits, credits and returns.</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input 
            type="text" 
            placeholder="Search txn ID / method..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#030c1f] border border-[#173a78] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {['All', 'Deposit', 'Withdrawal', 'Profit', 'Referral', 'Reinvestment'].map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterType === type 
                ? 'bg-amber-400 text-slate-950 shadow-md' 
                : 'bg-[#051330] border border-[#173870] text-slate-300 hover:text-white'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Ledger Table */}
      <div className="bg-[#051330] border border-[#173870] rounded-2xl p-5 shadow-xl">
        <div className="sr-table-wrap sr-scroll-hint">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[10px] font-bold text-slate-400 border-b border-[#132c5b]">
                <th className="py-2.5 px-2">#</th>
                <th className="py-2.5 px-2">Transaction ID</th>
                <th className="py-2.5 px-2">Date & Time</th>
                <th className="py-2.5 px-2">Type</th>
                <th className="py-2.5 px-2">Amount</th>
                <th className="py-2.5 px-2">Payment Method</th>
                <th className="py-2.5 px-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#102752]">
              {filtered.map((tx, idx) => {
                const isRed = tx.type.toLowerCase().includes('withdraw');
                const isOrange = tx.type.toLowerCase().includes('reinvest');
                const isBlue = tx.type.toLowerCase().includes('referral');
                const typeColor = isRed ? 'text-rose-400' : isOrange ? 'text-amber-400' : isBlue ? 'text-cyan-400' : 'text-emerald-400';
                return (
                  <tr key={tx.txn_id || idx} className="hover:bg-[#091f4d]/50 transition">
                    <td className="py-3 px-2 font-mono text-[10px] text-slate-400">{idx + 1}</td>
                    <td className="py-3 px-2 font-mono text-slate-200 font-bold">{tx.txn_id}</td>
                    <td className="py-3 px-2 font-mono text-slate-300">{tx.date_time}</td>
                    <td className={`py-3 px-2 font-bold ${typeColor}`}>{tx.type}</td>
                    <td className="py-3 px-2 font-black text-white text-sm">{fmt(tx.amount)}</td>
                    <td className="py-3 px-2 text-slate-300">{tx.method}</td>
                    <td className="py-3 px-2 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${
                        tx.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
