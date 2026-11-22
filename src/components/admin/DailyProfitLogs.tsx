import React, { useState, useEffect } from 'react';
import { RefreshCw, TrendingUp } from 'lucide-react';
import { fetchDailyProfitLogs, creditDailyProfitsAdmin } from '../../services/api';
import { notifySuccess, notifyError } from '../../lib/notify';

export default function DailyProfitLogs({ settings }: any) {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [crediting, setCrediting] = useState(false);
  const [roiInput, setRoiInput] = useState('10');

  const loadLogs = async () => {
    setLoading(true);
    try {
      const data = await fetchDailyProfitLogs(150);
      setLogs(data);
    } catch (e: any) {
      notifyError('Load Failed', e?.message || 'Could not fetch daily profit logs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const handleManualRun = async () => {
    setCrediting(true);
    try {
      const count = await creditDailyProfitsAdmin(Number(roiInput) || 10);
      notifySuccess('Profits Credited!', `${count} user accounts credited successfully based on 30 working days calculation.`);
      await loadLogs();
    } catch (e: any) {
      notifyError('Credit Failed', e?.message || 'Could not run daily profit credit.');
    } finally {
      setCrediting(false);
    }
  };

  return (
    <div className="bg-[#071738] border-2 border-amber-400/40 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6 text-xs text-slate-100 backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-amber-400/20">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold mb-1">
            <TrendingUp className="w-3.5 h-3.5" /> Automated Profit Ledger &amp; Auditing
          </div>
          <h3 className="text-xl font-black text-white">Daily Profit Logs (30 Working Days Basis)</h3>
        </div>
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={handleManualRun}
            disabled={crediting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black shadow-xl hover:brightness-110 transition cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${crediting ? 'animate-spin' : ''}`} />
            <span>{crediting ? 'Processing...' : 'Run Daily Profit Cron Now'}</span>
          </button>
        </div>
      </div>

      <div className="sr-table-wrap rounded-2xl border border-[#1b3f8a] bg-[#030a1a]/80 overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#081d48] border-b border-[#1b3f8a] text-slate-300 uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-4 font-black">LOG ID</th>
              <th className="py-3.5 px-4 font-black">TRADER NAME</th>
              <th className="py-3.5 px-4 font-black">ACTIVE CAPITAL</th>
              <th className="py-3.5 px-4 font-black">MONTHLY ROI</th>
              <th className="py-3.5 px-4 font-black">DAILY PROFIT CREDITED</th>
              <th className="py-3.5 px-4 font-black text-right">CREDITED TIMESTAMP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1b3f8a]/50">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">Loading daily profit audit records...</td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">No profit logs found yet. Click "Run Daily Profit Cron Now" above to simulate distribution.</td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#0c265e]/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-amber-300 font-bold">#{log.id}</td>
                  <td className="py-3 px-4 font-black text-white">{log.user_name} <span className="text-[10px] text-slate-400 font-mono font-normal">({log.user_id})</span></td>
                  <td className="py-3 px-4 font-extrabold text-slate-200">${Number(log.active_capital || 0).toLocaleString()}</td>
                  <td className="py-3 px-4 font-bold text-cyan-300">{log.monthly_roi_percent}%</td>
                  <td className="py-3 px-4 font-black text-emerald-400">+${Number(log.daily_profit_amount || 0).toFixed(2)}</td>
                  <td className="py-3 px-4 text-right text-slate-300 font-mono text-[11px]">
                    {new Date(log.credited_at || Date.now()).toLocaleString()}
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