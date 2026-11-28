import React, { useState } from 'react';
import { ArrowLeftRight, Search, Download, Filter, CheckCircle2, Clock, XCircle } from 'lucide-react';

export default function UserTransactionsView({ transactions = [], fmt }) {
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = (transactions || []).filter(tx => {
    const matchType = filterType === 'All' || (tx.type || '').toLowerCase().includes(filterType.toLowerCase());
    
    const s = (tx.status || '').toLowerCase();
    const isCompleted = s === 'completed' || s === 'approved';
    const isRejected = s === 'rejected' || s === 'failed' || s === 'cancelled';
    const isPending = !isCompleted && !isRejected;

    const matchStatus = filterStatus === 'All' ||
      (filterStatus === 'Completed' && isCompleted) ||
      (filterStatus === 'Pending' && isPending) ||
      (filterStatus === 'Rejected' && isRejected);

    const matchSearch = (tx.txn_id || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (tx.type || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (tx.method || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (tx.status || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchStatus && matchSearch;
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
            placeholder="Search txn ID / method / status..."
            value={(searchQuery ?? '')}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#030c1f] border border-[#173a78] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Filter Bars: Type & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#051330] border border-[#173870] p-4 rounded-2xl shadow-xl">
        {/* Type Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">Type:</span>
          {['All', 'Deposit', 'Withdrawal', 'Profit', 'Referral', 'Reinvestment'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                filterType === type 
                  ? 'bg-amber-400 text-slate-950 shadow-md' 
                  : 'bg-[#030c1f] border border-[#173870] text-slate-300 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5 border-t sm:border-t-0 sm:border-l border-[#173870] pt-2 sm:pt-0 sm:pl-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">Status:</span>
          {[
            { id: 'All', label: 'All' },
            { id: 'Completed', label: 'Completed' },
            { id: 'Pending', label: 'Pending' },
            { id: 'Rejected', label: 'Rejected' }
          ].map(st => (
            <button
              key={st.id}
              onClick={() => setFilterStatus(st.id)}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition ${
                filterStatus === st.id
                  ? st.id === 'Completed'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : st.id === 'Rejected'
                    ? 'bg-rose-500 text-white shadow-md'
                    : st.id === 'Pending'
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'bg-white text-slate-950 shadow-md'
                  : 'bg-[#030c1f] border border-[#173870] text-slate-300 hover:text-white'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
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
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 font-semibold text-xs">
                    No transactions match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((tx, idx) => {
                  const isRed = (tx.type || '').toLowerCase().includes('withdraw');
                  const isOrange = (tx.type || '').toLowerCase().includes('reinvest');
                  const isBlue = (tx.type || '').toLowerCase().includes('referral');
                  const typeColor = isRed ? 'text-rose-400' : isOrange ? 'text-amber-400' : isBlue ? 'text-cyan-400' : 'text-emerald-400';
                  
                  const s = (tx.status || '').toLowerCase();
                  const isCompleted = s === 'completed' || s === 'approved';
                  const isRejected = s === 'rejected' || s === 'failed' || s === 'cancelled';
                  const badgeCls = isCompleted
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : isRejected
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-400 border-amber-500/30';

                  return (
                    <tr key={tx.txn_id || idx} className="hover:bg-[#091f4d]/50 transition">
                      <td className="py-3 px-2 font-mono text-[10px] text-slate-400">{idx + 1}</td>
                      <td className="py-3 px-2 font-mono text-slate-200 font-bold">{tx.txn_id}</td>
                      <td className="py-3 px-2 font-mono text-slate-300">{tx.date_time}</td>
                      <td className={`py-3 px-2 font-bold ${typeColor}`}>{tx.type}</td>
                      <td className="py-3 px-2 font-black text-white text-sm">{fmt(tx.amount)}</td>
                      <td className="py-3 px-2 text-slate-300">{tx.method}</td>
                      <td className="py-3 px-2 text-center">
                        <div className="inline-flex flex-col items-center">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${badgeCls}`}>
                            {isCompleted && <CheckCircle2 className="w-2.5 h-2.5" />}
                            {isRejected && <XCircle className="w-2.5 h-2.5" />}
                            {!isCompleted && !isRejected && <Clock className="w-2.5 h-2.5" />}
                            {isCompleted ? 'Completed' : isRejected ? 'Rejected' : 'Pending'}
                          </span>
                          {tx.admin_note && (
                            <span className="text-[9px] text-slate-400 mt-0.5 max-w-[130px] truncate block" title={tx.admin_note}>
                              {tx.admin_note}
                            </span>
                          )}
                        </div>
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
