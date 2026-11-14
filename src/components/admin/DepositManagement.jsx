import React, { useEffect, useState } from 'react';
import { CheckCircle2, RefreshCw, XCircle } from 'lucide-react';
import { approveInvestmentOrder, fetchInvestmentOrdersForAdmin } from '../../services/api';
import { notifyError, notifySuccess } from '../../lib/notify';

export default function DepositManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = async () => { setLoading(true); try { setOrders(await fetchInvestmentOrdersForAdmin()); } catch (error) { notifyError('Deposit Load Failed', error?.message || 'Could not load deposit orders.'); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  const approve = async (order) => {
    const note = window.prompt('Optional approval note:', 'Payment verified by admin');
    if (note === null) return;
    try { const updated = await approveInvestmentOrder(order.id, note); setOrders((rows) => rows.map((row) => row.id === order.id ? updated : row)); notifySuccess('Deposit Approved', 'Day 0 lock and first-deposit ledger were created by the database.'); } catch (error) { notifyError('Approval Failed', error?.message || 'Could not approve deposit. Apply the database migration first.'); }
  };
  return <div className="bg-[#071738] border border-[#173b7d] rounded-2xl p-5 shadow-xl space-y-4 text-xs"><div className="flex justify-between items-center"><div><h3 className="text-lg font-black text-white">Deposit Review Queue</h3><p className="text-slate-400">Approve a payment only after verification; the first approval creates Day 0 automatically.</p></div><button onClick={load} className="px-3 py-2 rounded-lg border border-[#173b7d] text-slate-300 flex items-center gap-1"><RefreshCw className="w-3.5 h-3.5" />Refresh</button></div>{loading ? <p className="py-8 text-center text-amber-300">Loading deposits...</p> : <div className="sr-table-wrap"><table className="w-full text-left"><thead><tr className="border-b border-[#173b7d] text-slate-400 uppercase"><th className="p-3">User</th><th className="p-3">Plan</th><th className="p-3">Amount</th><th className="p-3">Reference</th><th className="p-3">Status</th><th className="p-3 text-right">Action</th></tr></thead><tbody className="divide-y divide-[#173b7d]/50">{orders.length === 0 ? <tr><td colSpan="6" className="p-8 text-center text-slate-500">No deposit orders found.</td></tr> : orders.map((order) => <tr key={order.id}><td className="p-3 text-white font-mono">{order.user_id}</td><td className="p-3 text-slate-300">{order.plan_id}</td><td className="p-3 text-amber-300 font-black">{order.amount} {order.currency}</td><td className="p-3 text-slate-400">{order.payment_transaction_id || '—'}</td><td className="p-3"><span className="px-2 py-1 rounded bg-amber-400/10 text-amber-300">{order.status}</span></td><td className="p-3 text-right">{['Pending','UNDER_REVIEW'].includes(order.status) ? <button onClick={() => approve(order)} className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold flex items-center gap-1 ml-auto"><CheckCircle2 className="w-3 h-3" />Approve</button> : <span className="text-slate-500">Processed</span>}</td></tr>)}</tbody></table></div>}</div>;
}
