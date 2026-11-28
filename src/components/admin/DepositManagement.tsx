import React, { useEffect, useState } from 'react';
import { CheckCircle2, RefreshCw, XCircle, Eye, X, Clock, Smartphone, Monitor, Tablet, Copy, Check } from 'lucide-react';
import { approveInvestmentOrder, rejectInvestmentOrder, fetchInvestmentOrdersForAdmin, dispatchApprovalEmail } from '../../services/api';
import { notifyError, notifySuccess } from '../../lib/notify';
import { supabase } from '../../lib/supabaseClient';

export default function DepositManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    if (!text) return;
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return String(dateStr);
      return d.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return String(dateStr);
    }
  };

  const getDeviceDetails = (deviceStr) => {
    const str = deviceStr || '';
    if (/mobile|android|iphone|ipod|phone/i.test(str)) {
      return { icon: Smartphone, label: str || 'Mobile Device', color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-500/30' };
    }
    if (/tablet|ipad/i.test(str)) {
      return { icon: Tablet, label: str || 'Tablet Device', color: 'text-purple-400', bg: 'bg-purple-950/40 border-purple-500/30' };
    }
    return { icon: Monitor, label: str || 'Desktop / Web Browser', color: 'text-cyan-400', bg: 'bg-cyan-950/40 border-cyan-500/30' };
  };

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

  useEffect(() => {
    load();

    // Real-time deposit queue sync - auto reload when new orders or payment proofs arrive
    const channel = supabase.channel(`admin-deposits-sync-${Math.random().toString(36).slice(2, 9)}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'investment_orders' }, () => { load(); })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'payment_gateway_transactions' }, () => { load(); })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const approve = async (order) => {
    const note = window.prompt('Optional approval note:', 'Payment verified by admin');
    if (note === null) return;
    try {
      const updated = await approveInvestmentOrder(order.id, note);
      setOrders((rows) => rows.map((row) => row.id === order.id ? { ...row, ...updated, status: 'Approved', user_name: row.user_name, user_email: row.user_email } : row));
      notifySuccess('Deposit Approved', 'Investment activated and ledger created successfully.');

      // Send real-time notification email via SMTP to investor
      try {
        const { data: profile } = await supabase.from('profiles').select('email, name').eq('id', order.user_id).maybeSingle();
        if (profile?.email) {
          dispatchApprovalEmail('DEPOSIT_APPROVED', {
            to: profile.email,
            name: profile.name || order.user_name || order.user_id,
            amount: Number(order.amount),
            currency: order.currency || 'USD',
            planName: order.plan_id || 'Active Investment',
            orderId: order.id
          }).catch(() => {});
        }
      } catch (mailErr) {}
    } catch (error) {
      notifyError('Approval Failed', error?.message || 'Could not approve deposit.');
    }
  };

  const reject = async (order) => {
    const note = window.prompt('Reason for rejection:', 'Transaction reference could not be verified');
    if (note === null) return;
    try {
      const updated = await rejectInvestmentOrder(order.id, note);
      setOrders((rows) => rows.map((row) => row.id === order.id ? { ...row, ...updated, status: 'Rejected', user_name: row.user_name, user_email: row.user_email } : row));
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
        <div className="w-full overflow-x-auto rounded-2xl border border-[#173b7d] bg-[#030c1f]/80 shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-[#173b7d] bg-[#051433] text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="p-3.5">User ID</th>
                <th className="p-3.5">User Name</th>
                <th className="p-3.5">Gateway</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Reference / TxID</th>
                <th className="p-3.5">Time</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#173b7d]/50">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500 font-medium">No deposit orders found in queue.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#0c2356]/40 transition">
                    <td className="p-3.5 text-white font-mono font-bold whitespace-nowrap">{order.user_id}</td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-white font-bold">{order.user_name || order.userName || '—'}</span>
                        {order.user_email && (
                          <span className="text-[10px] text-slate-400 font-normal truncate max-w-[140px]">{order.user_email}</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-300 capitalize whitespace-nowrap font-medium">{order.gateway_code || 'Gateway'}</td>
                    <td className="p-3.5 text-amber-300 font-black whitespace-nowrap">{order.amount} {order.currency}</td>
                    <td className="p-3.5 text-slate-300 font-mono text-[11px] max-w-[160px] truncate" title={(() => {
                      let t = order.payment_gateway_transactions?.transaction_reference || order.transaction_reference || order.reference || '';
                      if (!t && order.admin_note && order.admin_note.includes('[TXID: ')) {
                        const m = order.admin_note.match(/\[TXID:\s*([^\]]+)\]/);
                        if (m) t = m[1].trim();
                      }
                      return t || '—';
                    })()}>
                      {(() => {
                        let t = order.payment_gateway_transactions?.transaction_reference || order.transaction_reference || order.reference || '';
                        if (!t && order.admin_note && order.admin_note.includes('[TXID: ')) {
                          const m = order.admin_note.match(/\[TXID:\s*([^\]]+)\]/);
                          if (m) t = m[1].trim();
                        }
                        return t || '—';
                      })()}
                    </td>
                    <td className="p-3.5 text-slate-300 whitespace-nowrap text-xs">
                      <div className="flex items-center gap-1.5 text-slate-200">
                        <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{formatDateTime(order.created_at)}</span>
                      </div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        order.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                        order.status === 'Rejected' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
                        'bg-amber-400/10 text-amber-300 border-amber-400/30'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs inline-flex items-center gap-1.5 shadow-md hover:shadow-lg transition cursor-pointer"
                        title="View Payment Proof & Process"
                      >
                        <Eye className="w-3.5 h-3.5" /> View Payment
                      </button>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-gradient-to-b from-[#091f4d] via-[#06173a] to-[#040e26] border-2 border-amber-400/50 rounded-3xl p-5 sm:p-6 text-white shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-4 max-h-[92vh] overflow-y-auto">
            <button onClick={() => setSelectedOrder(null)} className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#0c2356] transition cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <div className="border-b border-[#183d7e] pb-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-400/15 px-3 py-1 rounded-full border border-amber-400/30">
                Deposit Audit Terminal
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1.5">Payment Proof Details</h3>
            </div>
            
            <div className="bg-[#030c1f] p-4 rounded-2xl border border-[#173a78] space-y-2.5 text-xs">
              <div className="flex justify-between items-center"><span className="text-slate-400">Order ID:</span><span className="font-mono text-white font-bold">#{selectedOrder.id}</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-400">User ID:</span><span className="font-mono text-white font-bold">{selectedOrder.user_id}</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-400">User Name:</span><span className="text-amber-300 font-bold">{selectedOrder.user_name || selectedOrder.userName || '—'}</span></div>
              {selectedOrder.user_email && (
                <div className="flex justify-between items-center"><span className="text-slate-400">User Email:</span><span className="text-slate-300 font-mono">{selectedOrder.user_email}</span></div>
              )}
              <div className="flex justify-between items-center"><span className="text-slate-400">Plan ID:</span><span className="text-white font-bold capitalize">{selectedOrder.plan_id}</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-400">Gateway:</span><span className="text-amber-300 font-bold uppercase">{selectedOrder.gateway_code}</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-400">Amount:</span><span className="text-emerald-400 font-black text-sm">{selectedOrder.amount} {selectedOrder.currency}</span></div>
              
              {/* Payment Time */}
              <div className="flex justify-between items-center py-1 border-t border-[#173a78]">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> Payment Time:
                </span>
                <span className="font-semibold text-white">
                  {formatDateTime(selectedOrder.created_at)}
                </span>
              </div>

              {/* Payment Device */}
              <div className="flex justify-between items-center py-1 border-t border-[#173a78]">
                <span className="text-slate-400 flex items-center gap-1.5">
                  {(() => {
                    const dev = getDeviceDetails(selectedOrder.device_info || selectedOrder.payment_gateway_transactions?.device_info);
                    const DevIcon = dev.icon;
                    return <DevIcon className={`w-3.5 h-3.5 ${dev.color}`} />;
                  })()}
                  Submitted Device:
                </span>
                {(() => {
                  const dev = getDeviceDetails(selectedOrder.device_info || selectedOrder.payment_gateway_transactions?.device_info);
                  const DevIcon = dev.icon;
                  return (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${dev.bg} ${dev.color}`}>
                      <DevIcon className="w-3.5 h-3.5 shrink-0" />
                      <span>{dev.label}</span>
                    </span>
                  );
                })()}
              </div>

              <div className="flex justify-between items-center py-1 border-t border-[#173a78]">
                <span className="text-slate-400">Verification Status:</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                  selectedOrder.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                  selectedOrder.status === 'Rejected' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
                  'bg-amber-400/10 text-amber-300 border-amber-400/30'
                }`}>
                  {selectedOrder.status}
                </span>
              </div>
              {/* Submitted Deposit Form Data: Transaction ID & Referral ID */}
              <div className="border-t border-[#173a78] pt-3 space-y-2.5">
                <span className="text-[10px] uppercase font-black tracking-wider text-amber-300 block">
                  📋 User Submitted Deposit Form Data
                </span>

                {/* Field 1: Transaction ID */}
                {(() => {
                  let txIdVal = selectedOrder.payment_gateway_transactions?.transaction_reference || selectedOrder.transaction_reference || selectedOrder.reference || '';
                  if (!txIdVal && selectedOrder.admin_note && selectedOrder.admin_note.includes('[TXID: ')) {
                    const m = selectedOrder.admin_note.match(/\[TXID:\s*([^\]]+)\]/);
                    if (m) txIdVal = m[1].trim();
                  }
                  return (
                    <div className="space-y-1 bg-[#051433] p-3 rounded-xl border border-[#173a78]">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300 font-bold flex items-center gap-1.5 text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          Transaction ID:
                        </span>
                        {txIdVal && (
                          <button
                            type="button"
                            onClick={() => handleCopy(String(txIdVal), 'tx_id')}
                            className="text-[11px] font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 bg-amber-400/10 px-2 py-0.5 rounded cursor-pointer transition"
                          >
                            {copiedKey === 'tx_id' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedKey === 'tx_id' ? 'Copied!' : 'Copy'}</span>
                          </button>
                        )}
                      </div>
                      <span className="font-mono text-amber-200 text-xs block break-all select-all font-bold pt-1">
                        {txIdVal || '— (No Transaction ID provided)'}
                      </span>
                    </div>
                  );
                })()}

                {/* Field 2: Referral ID */}
                {(() => {
                  let refCode = selectedOrder.referral_id || selectedOrder.payment_gateway_transactions?.referral_id || null;
                  if (!refCode && selectedOrder.admin_note) {
                    if (selectedOrder.admin_note.includes('[Ref: ')) {
                      const m = selectedOrder.admin_note.match(/\[Ref:\s*([^\]]+)\]/);
                      if (m) refCode = m[1].trim();
                    } else if (selectedOrder.admin_note.startsWith('Ref: ')) {
                      refCode = selectedOrder.admin_note.replace('Ref: ', '').trim();
                    }
                  }
                  return (
                    <div className="space-y-1 bg-[#051433] p-3 rounded-xl border border-[#173a78]">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300 font-bold flex items-center gap-1.5 text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          Referral ID:
                        </span>
                        {refCode && (
                          <button
                            type="button"
                            onClick={() => handleCopy(String(refCode), 'ref_id')}
                            className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 bg-cyan-400/10 px-2 py-0.5 rounded cursor-pointer transition"
                          >
                            {copiedKey === 'ref_id' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedKey === 'ref_id' ? 'Copied!' : 'Copy'}</span>
                          </button>
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className={`font-mono text-xs block break-all select-all font-bold ${refCode ? 'text-cyan-200' : 'text-slate-500'}`}>
                          {refCode || 'None (Direct Deposit / No Referral)'}
                        </span>
                        {refCode && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold shrink-0 ml-2">
                            15% Reward Active
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Admin Note */}
              {selectedOrder.admin_note && (
                <div className="border-t border-[#173a78] pt-2">
                  <span className="text-slate-400 block mb-1">Admin Note / Review Reason:</span>
                  <span className="text-rose-300 font-medium">{selectedOrder.admin_note}</span>
                </div>
              )}
            </div>

            {/* Action Buttons in Modal */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#173b7d]/50">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold transition text-xs cursor-pointer"
              >
                Close
              </button>
              {['Pending','UNDER_REVIEW'].includes(selectedOrder.status) && (
                <>
                  <button
                    type="button"
                    onClick={() => { const ord = selectedOrder; setSelectedOrder(null); reject(ord); }}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-black text-xs inline-flex items-center gap-1.5 shadow-lg transition cursor-pointer"
                  >
                    <XCircle className="w-4 h-4" /> Reject Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => { const ord = selectedOrder; setSelectedOrder(null); approve(ord); }}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-xs inline-flex items-center gap-1.5 shadow-lg transition cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve Payment
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
