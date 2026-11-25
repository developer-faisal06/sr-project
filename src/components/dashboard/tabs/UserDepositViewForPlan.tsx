import React, { useEffect, useState } from 'react';
import { ArrowLeft, Copy, Check, QrCode, Loader2, ShieldCheck, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { notifyError, notifySuccess, notifyWarning } from '../../../lib/notify';
import { fetchPaymentGateways, createPaymentProof, createInvestmentOrder } from '../../../services/api';

export default function UserDepositViewForPlan({ plan, user, plans = [], onBack }) {
  const [gateways, setGateways] = useState([]);
  const [gatewayCode, setGatewayCode] = useState('');
  const [planId, setPlanId] = useState(plan?.id || plans[0]?.id || '');
  const [amount, setAmount] = useState(plan?.amount?.replace(/[^0-9.]/g, '') || '');
  const [reference, setReference] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);

  useEffect(() => {
    fetchPaymentGateways(true)
      .then((items) => {
        setGateways(items);
        setGatewayCode(items[0]?.code || '');
      })
      .catch((error) => notifyError('Payment Options Unavailable', error?.message || 'Could not load gateways.'))
      .finally(() => setLoading(false));
  }, []);

  const selectedPlan = plans.find((item) => item.id === planId) || plan;
  const gateway = gateways.find((item) => item.code === gatewayCode);
  const qrUrl = gateway?.qr_code_url || (gateway?.account_identifier ? `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(gateway.account_identifier)}` : '');

  const getReferencePlaceholder = (targetGateway) => {
    if (!targetGateway) return 'Enter transaction hash or reference ID';
    const code = (targetGateway.code || '').toLowerCase();
    const name = (targetGateway.name || '').toLowerCase();

    if (code.includes('binance') || name.includes('binance')) {
      return 'Enter Binance Pay Order ID / Internal TxID (e.g. 2938491823)';
    }
    if (code.includes('bkash') || name.includes('bkash')) {
      return 'Enter bKash TrxID (e.g. BL9A8X7K2)';
    }
    if (code.includes('nagad') || name.includes('nagad')) {
      return 'Enter Nagad TrxID (e.g. 71A89KC2)';
    }
    if (code.includes('rocket') || name.includes('rocket')) {
      return 'Enter Rocket Transaction ID (TxID)';
    }
    if (code.includes('upay') || name.includes('upay')) {
      return 'Enter Upay Transaction ID (TxID)';
    }
    if (code.includes('usdt') || code.includes('tron') || code.includes('trc20') || name.includes('trc-20') || name.includes('usdt')) {
      return 'Enter Blockchain TxID / Hash (e.g. 0x89ab... or 64-char hash)';
    }
    if (code.includes('btc') || name.includes('bitcoin')) {
      return 'Enter Bitcoin TxHash (e.g. 4a5e1e4baab89f3a...)';
    }
    if (code.includes('eth') || name.includes('ethereum')) {
      return 'Enter Ethereum TxHash (0x...)';
    }
    if (code.includes('bank') || name.includes('bank')) {
      return 'Enter Bank Transfer Reference / Deposit Receipt No.';
    }
    return `Enter ${targetGateway.name} Transaction ID / Sender Reference`;
  };

  const copyAccount = async () => {
    if (!gateway?.account_identifier) return;
    await navigator.clipboard?.writeText(gateway.account_identifier);
    setCopied(true);
    notifySuccess('Copied to Clipboard!', gateway.account_identifier);
    setTimeout(() => setCopied(false), 2000);
  };

  const submit = async (event) => {
    event.preventDefault();
    const value = Number(amount);
    if (!selectedPlan || !gateway) {
      notifyWarning('Selection Required', 'Select a plan and gateway.');
      return;
    }
    if (!value || value < Number(gateway.min_amount || 0)) {
      notifyWarning('Invalid Amount', `Minimum amount is ${gateway.min_amount || 0} ${gateway.currency}.`);
      return;
    }
    if (gateway.max_amount && value > Number(gateway.max_amount)) {
      notifyWarning('Amount Too High', `Maximum amount is ${gateway.max_amount} ${gateway.currency}.`);
      return;
    }
    if (!reference.trim()) {
      notifyWarning('Reference Required', 'Enter the transaction ID or payment reference.');
      return;
    }
    setSubmitting(true);
    try {
      const proof = await createPaymentProof({
        user_id: user.id,
        gateway_code: gateway.code,
        amount: value,
        currency: gateway.currency,
        transaction_reference: reference.trim(),
        status: 'Pending'
      });
      const order = await createInvestmentOrder({
        user_id: user.id,
        plan_id: selectedPlan.id,
        gateway_code: gateway.code,
        amount: value,
        currency: gateway.currency,
        payment_transaction_id: proof.id,
        status: 'Pending'
      });
      setSuccessData({
        orderId: order?.id || proof?.id,
        planName: selectedPlan.name,
        amount: value,
        currency: gateway.currency,
        gatewayName: gateway.name,
        gatewayNetwork: gateway.network,
        reference: reference.trim(),
        submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      });
      setReference('');
    } catch (error) {
      notifyError('Submission Failed', error?.message || 'Could not save the investment request.');
    } finally {
      setSubmitting(false);
    }
  };
  const goToInvestments = () => {
    localStorage.setItem('sr_user_active_tab', 'investments');
    window.dispatchEvent(new CustomEvent('sr:navigate-dashboard-tab', { detail: { tab: 'investments' } }));
    if (onBack) onBack();
  };
  const goToPlans = () => {
    localStorage.setItem('sr_user_active_tab', 'plans');
    window.dispatchEvent(new CustomEvent('sr:navigate-dashboard-tab', { detail: { tab: 'plans' } }));
    if (onBack) onBack();
  };

  const goToHome = () => {
    window.location.href = '/';
  };



  if (loading) {
    return (
      <div className="py-20 text-center text-amber-300">
        <Loader2 className="w-7 h-7 animate-spin mx-auto mb-3" />
        Loading investment options...
      </div>
    );
  }

  const isBinanceGateway = gateway?.code?.toLowerCase().includes('binance') || gateway?.name?.toLowerCase().includes('binance');

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold text-amber-300 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> Back to Plans
      </button>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#091f4d] via-[#09245c] to-[#0e3b91] border border-amber-400/40 rounded-3xl p-6 shadow-xl">
        <span className="text-xs font-bold text-amber-300 uppercase">Secure Investment Portal</span>
        <h1 className="text-2xl font-black text-white mt-1">Invest in Your Selected Plan</h1>
        <p className="text-slate-300 text-xs mt-1">Payment is reviewed by admin before activation.</p>
      </div>

      {/* Persistent Success Card - Does NOT automatically disappear */}
      {successData && (
        <div className="rounded-3xl border-2 border-emerald-400/60 bg-gradient-to-br from-[#06241e] via-[#041d18] to-[#031512] p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-500/30 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300 shadow-lg shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-black tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Proof Submitted Successfully
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">Payment Received &amp; Pending Verification</h3>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-400/10 border border-amber-400/40 text-amber-300 text-xs font-black">
              <Clock className="w-4 h-4 animate-spin text-amber-400" />
              <span>Status: PENDING REVIEW</span>
            </div>
          </div>

          {/* Submission Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#030d0a] p-4 rounded-2xl border border-emerald-500/20 text-xs">
            <div>
              <span className="text-slate-400 text-[10px] block">Plan Name</span>
              <span className="font-bold text-white text-sm mt-0.5 block">{successData.planName}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Amount Deposited</span>
              <span className="font-black text-emerald-300 text-sm mt-0.5 block">{successData.amount} {successData.currency}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Payment Gateway</span>
              <span className="font-bold text-amber-300 text-sm mt-0.5 block">{successData.gatewayName}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Submitted At</span>
              <span className="font-mono text-slate-300 text-xs mt-0.5 block">{successData.submittedAt}</span>
            </div>
            <div className="col-span-2 sm:col-span-4 border-t border-emerald-500/20 pt-2.5 mt-1">
              <span className="text-slate-400 text-[10px] block">Transaction Reference / Hash</span>
              <span className="font-mono text-amber-200 text-xs break-all select-all font-bold mt-0.5 block">{successData.reference}</span>
            </div>
          </div>

          {/* Waiting Notice Box */}
          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-400/40 text-xs text-amber-100 flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-amber-300 text-sm">Please wait for admin confirmation</p>
              <p className="text-slate-300 leading-relaxed text-xs">
                Your payment proof is queued for administrative verification. Once confirmed, your investment plan will automatically activate and start generating daily returns. You can log in anytime and track the approval status directly from your dashboard.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={goToPlans}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-amber-400/50 hover:border-amber-400 text-amber-300 hover:text-white font-bold text-xs transition bg-amber-400/10 text-center"
              >
                + Submit Another Deposit (Plans)
              </button>
              <button
                type="button"
                onClick={goToHome}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-bold text-xs transition text-center"
              >
                🏠 Home
              </button>
            </div>
            <button
              type="button"
              onClick={goToInvestments}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 hover:brightness-110 transition"
            >
              <span>View My Pending Investments</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {!successData && <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Plan & Gateway Selection */}
        <div className="lg:col-span-5 bg-[#051330] border border-[#173870] rounded-2xl p-5 shadow-xl space-y-5">
          <div>
            <label className="label">Investment Plan</label>
            <select
              value={planId}
              onChange={(e) => {
                setPlanId(e.target.value);
                const next = plans.find((item) => item.id === e.target.value);
                if (next) setAmount(next.amount.replace(/[^0-9.]/g, ''));
              }}
              className="field"
            >
              {plans.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} — {item.amount} — ROI {item.roi}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-2xl bg-[#030c1f] border border-amber-400/30 p-4">
            <p className="text-xs text-slate-400">Selected plan</p>
            <p className="text-xl font-black text-white mt-1">{selectedPlan?.name}</p>
            <p className="text-emerald-400 font-bold mt-1">ROI: {selectedPlan?.roi}</p>
          </div>

          <div>
            <label className="label">Select Payment Gateway</label>
            <div className="flex flex-wrap justify-center gap-2">
              {gateways.map((item) => {
                const isSelected = gatewayCode === item.code;
                const isItemBinance = item.code?.toLowerCase().includes('binance') || item.name?.toLowerCase().includes('binance');
                return (
                  <button
                    type="button"
                    key={item.code}
                    onClick={() => setGatewayCode(item.code)}
                    className={`p-3 rounded-xl text-left transition inline-flex flex-col justify-between border min-w-[130px] max-w-[170px] whitespace-nowrap ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 border-amber-300 shadow-md ring-2 ring-amber-400/40'
                        : 'bg-[#030c1f] border-[#173a78] text-slate-300 hover:text-white hover:border-amber-400/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-xs font-black truncate block ${isSelected ? 'text-slate-950' : 'text-white'}`}>{item.name}</span>
                      <span className={`text-[10px] font-bold ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>{item.currency}</span>
                    </div>

                    {item.network && (
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-black tracking-wider ${
                          isSelected
                            ? 'bg-slate-950/25 text-slate-950'
                            : isItemBinance
                            ? 'bg-amber-400 text-slate-950 animate-pulse font-extrabold shadow-sm'
                            : 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                        }`}>
                          Network:
                        </span>
                        <span className={`text-[10px] font-bold ${isSelected ? 'text-slate-950' : isItemBinance ? 'text-amber-300 font-black' : 'text-slate-300'}`}>
                          {item.network}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Payment Details & Submit */}
        <div className="lg:col-span-7 bg-[#051330] border border-[#173870] rounded-2xl p-5 shadow-xl space-y-5">
          {gateway ? (
            <>
              {/* QR & Account Box */}
              <div className="flex flex-col sm:flex-row gap-5 items-center border-b border-[#173870] pb-5">
                {/* QR Code Container */}
                <div className="p-2 bg-white rounded-2xl shadow-xl border-4 border-amber-400/40 shrink-0">
                  {qrUrl ? (
                    <img src={qrUrl} alt="Payment QR" className="w-32 h-32 rounded-xl object-contain" />
                  ) : (
                    <div className="w-32 h-32 rounded-xl bg-[#030c1f] flex items-center justify-center">
                      <QrCode className="w-12 h-12 text-slate-500" />
                    </div>
                  )}
                </div>

                {/* Gateway Info + Click to Copy Box */}
                <div className="flex-1 w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300">Pay via {gateway.name}</span>
                    {gateway.network && (
                      <div className="flex items-center gap-1">
                        <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-black tracking-wider ${
                          isBinanceGateway
                            ? 'bg-amber-400 text-slate-950 font-black shadow-sm ring-1 ring-amber-300'
                            : 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                        }`}>
                          Network:
                        </span>
                        <span className="text-[11px] font-black text-amber-300">{gateway.network}</span>
                      </div>
                    )}
                  </div>

                  {/* Entire address box is clickable to copy */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={copyAccount}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); copyAccount(); } }}
                    title="Click anywhere to copy address"
                    className={`w-full group cursor-pointer p-3 rounded-xl border transition flex items-center justify-between gap-2 text-left ${
                      copied
                        ? 'bg-emerald-950/40 border-emerald-400 ring-2 ring-emerald-400/40'
                        : 'bg-[#030c1f] border-[#173a78] hover:border-amber-400 hover:bg-[#071738]'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold group-hover:text-amber-300 transition">
                        Deposit Account (Click box to copy)
                      </span>
                      <span className="font-mono text-amber-300 font-bold text-xs sm:text-sm break-all block mt-0.5 select-all">
                        {gateway.account_identifier || 'Account setup pending'}
                      </span>
                    </div>

                    <div className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-400/10 border border-amber-400/30 group-hover:bg-amber-400 group-hover:text-slate-950 transition text-amber-300 font-bold">
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400 group-hover:text-slate-950" />
                          <span className="text-[10px] text-emerald-400 group-hover:text-slate-950">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[10px]">Copy</span>
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-[9px] text-slate-400 text-center sm:text-left">Click anywhere on the box to copy</p>
                </div>
              </div>

              {/* Instructions */}
              <p className="text-xs text-slate-300 leading-relaxed bg-[#030c1f] p-3 rounded-xl border border-[#173a78]">
                {gateway.instructions || 'Complete payment and submit your transaction reference below.'}
              </p>

              {/* Submission Form */}
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="label">Amount ({gateway.currency})</label>
                  <input
                    type="number"
                    min={gateway.min_amount || 0}
                    value={(amount ?? '')}
                    onChange={(e) => setAmount(e.target.value)}
                    className="field font-bold"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="label !mb-0">Transaction ID / Payment Reference</label>
                    {gateway?.name && (
                      <span className="text-[10px] text-amber-300 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                        {gateway.name} Proof
                      </span>
                    )}
                  </div>
                  <input
                    required
                    value={(reference ?? '')}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder={getReferencePlaceholder(gateway)}
                    className="field font-mono"
                  />
                </div>

                <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs text-blue-200 flex gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-blue-400" />
                  Order stays Pending until admin verifies payment.
                </div>

                <button
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:brightness-110 text-slate-950 font-black flex items-center justify-center gap-2 shadow-lg transition"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {submitting ? 'Processing...' : 'Deposit Now ➔'}
                </button>
              </form>
            </>
          ) : (
            <div className="py-16 text-center text-slate-400">No enabled payment gateway is available.</div>
          )}
        </div>
      </div>}

      <style>{`.field{width:100%;padding:.75rem;border-radius:.75rem;background:#030c1f;border:1px solid #173a78;color:white;outline:none}.field:focus{border-color:#fbbf24}.label{display:block;color:#cbd5e1;font-size:.75rem;font-weight:700;margin-bottom:.35rem}`}</style>
    </div>
  );
}
