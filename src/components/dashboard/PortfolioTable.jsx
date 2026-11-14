import React from 'react';
import { Briefcase } from 'lucide-react';
import { notifySuccess } from '../../lib/notify';

export default function PortfolioTable({ portfolio, fmt }) {
  return (
    <div className="lg:col-span-4 bg-[#051330] border border-[#173870] rounded-2xl p-4 flex flex-col justify-between shadow-xl">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#143063]">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <Briefcase className="w-4 h-4 text-amber-400" />
            <span>My Investment Portfolio</span>
          </div>
          <button 
            onClick={() => notifySuccess('Portfolio', 'All active portfolio records loaded.')} 
            className="text-[11px] font-bold text-blue-400 hover:text-blue-300"
          >
            View All ➔
          </button>
        </div>

        <div className="sr-table-wrap mt-2">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[10px] font-bold text-slate-400 border-b border-[#132c5b]">
                <th className="py-2 px-1">ID</th>
                <th className="py-2 px-1">Date</th>
                <th className="py-2 px-1">Amount</th>
                <th className="py-2 px-1">Current Value</th>
                <th className="py-2 px-1">Rate</th>
                <th className="py-2 px-1">Profit</th>
                <th className="py-2 px-1 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#102752]">
              {portfolio.map((row, idx) => (
                <tr key={row.id || idx} className="hover:bg-[#091f4d]/50 transition">
                  <td className="py-2.5 px-1 font-mono text-[11px] text-slate-300 font-bold">{row.id}</td>
                  <td className="py-2.5 px-1 text-[11px] text-slate-300">{row.date_str}</td>
                  <td className="py-2.5 px-1 text-[11px] font-bold text-white">{fmt(row.amount)}</td>
                  <td className="py-2.5 px-1 text-[11px] font-bold text-white">{fmt(row.current_value)}</td>
                  <td className="py-2.5 px-1 text-[11px] font-bold text-slate-300">{row.rate_pct}%</td>
                  <td className="py-2.5 px-1 text-[11px] font-bold text-emerald-400">+{fmt(row.profit)}</td>
                  <td className="py-2.5 px-1 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
