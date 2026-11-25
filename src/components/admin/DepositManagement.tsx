import React, { useEffect, useState } from 'react';
import { CheckCircle2, RefreshCw, XCircle, Eye, X } from 'lucide-react';
import { approveInvestmentOrder, rejectInvestmentOrder, fetchInvestmentOrdersForAdmin } from '../../services/api';
import { notifyError, notifySuccess } from '../../lib/notify';

export default function DepositManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      setOrders(await fetchInvestmentOrdersForAdmin());
    } catch (error) {
      notifyError('Deposit Load Failed', error?.message || 'Could not load deposit orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const approve = async (order) => {
    const note = window.prompt('Optional approval note:', 'Payment verified by admin');
    if (note === null) return;
    try {
      const updated = await approveInvestmentOrder(order.id, note);
      setOrders((rows) => rows.map((row) => row.id === order.id ? updated : row));
      notifySuccess('Deposit Approved', 'Investment activated and ledger created successfully.');
    } catch (error) {
      notifyError('Approval Failed', error?.message || 'Could not approve deposit.');
    }
  };

  const reject = async (order) => {
    const note = window.prompt('Reason for rejection:', 'Transaction reference could not be verified');
    if (note === null) return;
    try {
      const updated = await rejectInvestmentOrder(order.id, note);
      setOrders((rows) => rows.map((row) => row.id === order.id ? updated : row));
      notifySuccess('Deposit Rejected', 'Order marked as rejected and notification sent to user.');
    } catch (error) {
      notifyError('Rejection Failed', error?.message || 'Could not reject deposit.');
    }
  };

  return (
    <div className="bg-[#071738] border border-[#173b7d] rounded-2xl p-5 shadow-xl space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-black text-white">Deposit Review Queue</h3>
          <p className="text-slate-400">Review, verify, approve or reject payment proofs submitted by users.</p>
        </div>
        <button onClick={load} className="px-3 py-2 rounded-lg border border-[#173b7d] text-slate-300 flex items-center gap-1 hover:bg-[#0c2356]">
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {loading ? (
        <p className="py-8 text-center text-amber-300">Loading deposits...</p>
      ) : (
        <div className="sr-table-wrap">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#173b7d] text-slate-400 uppercase text-[10px]">
                <th className="p-3">User ID</th>
                <th className="p-3">Gateway</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Reference</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#173b7d]/50">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">No deposit orders found.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#0c2356]/40 transition">
                    <td className="p-3 text-white font-mono font-bold">{order.user_id}</td>
                    <td className="p-3 text-slate-300 capitalize">{order.gateway_code || 'Gateway'}</td>
                    <td className="p-3 text-amber-300 font-black">{order.amount} {order.currency}</td>
                    <td className="p-3 text-slate-300 font-mono text-[11px]">{order.payment_transaction_id || order.reference || '—'}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        order.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300' :
                        order.status === 'Rejected' ? 'bg-rose-500/20 text-rose-300' :
                        'bg-amber-400/10 text-amber-300'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1.5 flex items-center justify-end">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-2.5 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 font-bold flex items-center gap-1 hover:bg-blue-500/30 transition"
                        title="View Payment Proof"
                      >
                        <Eye className="w-3.5 h-3.5" /> View Payment
                      </button>
                      {['Pending','UNDER_REVIEW'].includes(order.status) ? (
                        <>
                          <button
                            onClick={() => approve(order)}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold flex items-center gap-1 hover:bg-emerald-500/30 transition"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                          </button>
                          <button
                            onClick={() => reject(order)}
                            className="px-2.5 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 font-bold flex items-center gap-1 hover:bg-rose-500/30 transition"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-slate-500 font-semibold">{order.status}</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* View Payment Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#071738] border-2 border-amber-400/40 rounded-3xl p-6 text-white shadow-2xl space-y-4">
            <button onClick={() => setSelectedOrder(null)} className="absolute top-5 right-5 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-black text-amber-300">Payment Proof Details</h3>
            
            <div className="bg-[#030c1f] p-4 rounded-2xl border border-[#173a78] space-y-2.5 text-xs">
              <div className="flex justify-between"><span className="text-slate-400">Order ID:</span><span className="font-mono text-white">#{selectedOrder.id}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">User ID:</span><span className="font-mono text-white">{selectedOrder.user_id}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Plan ID:</span><span className="text-white">{selectedOrder.plan_id}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Gateway:</span><span className="text-amber-300 font-bold uppercase">{selectedOrder.gateway_code}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Amount:</span><span className="text-emerald-400 font-black">{selectedOrder.amount} {selectedOrder.currency}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Status:</span><span className="text-amber-300">{selectedOrder.status}</span></div>
              <div className="border-t border-[#173a78] pt-2">
                <span className="text-slate-400 block mb-1">Transaction Reference / Sender ID:</span>
                <span className="font-mono text-amber-200 bg-[#071738] p-2 rounded block break-all">{selectedOrder.payment_transaction_id || selectedOrder.reference || 'No reference provided'}</span>
              </div>
              {selectedOrder.admin_note && (
                <div className="border-t border-[#173a78] pt-2">
                  <span className="text-slate-400 block mb-1">Admin Note / Reason:</span>
                  <span className="text-rose-300">{selectedOrder.admin_note}</span>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded-xl bg-slate-700 text-white font-bold"
              >
                Close
              </button>
              {['Pending','UNDER_REVIEW'].includes(selectedOrder.status) && (
                <>
                  <button
                    type="button"
                    onClick={() => { const ord = selectedOrder; setSelectedOrder(null); reject(ord); }}
                    className="px-4 py-2 rounded-xl bg-rose-600 text-white font-black"
                  >
                    Reject Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => { const ord = selectedOrder; setSelectedOrder(null); approve(ord); }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-black"
                  >
                    Approve Payment
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
