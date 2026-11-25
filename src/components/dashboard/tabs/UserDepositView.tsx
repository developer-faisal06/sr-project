import React, { useEffect, useState } from 'react';
import { Download, Copy, Check, ShieldCheck, Loader2, QrCode, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { notifySuccess, notifyWarning, notifyError } from '../../../lib/notify';
import { fetchPaymentGateways, createPaymentProof, createInvestmentOrder } from '../../../services/api';

export default function UserDepositView({ user, fmt, cur, plans = [], initialPlanId = '', settings = {} }) {
  const [gateways, setGateways] = useState([]);
  const [method, setMethod] = useState('');
  const [planId, setPlanId] = useState(initialPlanId || plans[0]?.id || '');
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);

  useEffect(() => {
    fetchPaymentGateways(true).then((items) => {
      setGateways(items);
      setMethod(items[0]?.code || '');
    }).catch((error) => notifyError('Payment Options Unavailable', error?.message || 'Could not load payment gateways.')).finally(() => setLoading(false));
  }, []);

  const selectedPlan = plans.find((plan) => plan.id === planId) || plans[0];
  const isCustomAmountPlan = Boolean(selectedPlan?.is_custom_amount || selectedPlan?.id === 'custom');
  const current = gateways.find((gateway) => gateway.code === method);
  const planMinAmount = Number(selectedPlan?.min_amount || (settings as any).min_deposit || current?.min_amount || 0);
  const planMaxAmount = Number(selectedPlan?.max_amount || current?.max_amount || 0);
  const amountNumber = Number(amount || (!isCustomAmountPlan ? selectedPlan?.amount?.replace(/[^0-9.]/g, '') : 0) || 0);
  const minDeposit = Math.max(Number((settings as any).min_deposit || 0), planMinAmount);
  const qr = current?.qr_code_url || (current?.account_identifier ? `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(current.account_identifier)}` : '');

  const getReferencePlaceholder = (gateway) => {
    if (!gateway) return 'Enter transaction hash or reference ID';
    const code = (gateway.code || '').toLowerCase();
    const name = (gateway.name || '').toLowerCase();

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
    return `Enter ${gateway.name} Transaction ID / Sender Reference`;
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(current?.account_identifier || '');
    setCopied(true);
    notifySuccess('Copied to Clipboard!', current?.account_identifier || '');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!current || !selectedPlan) { notifyWarning('Selection Required', 'Select an investment plan and an enabled payment gateway.'); return; }
    if (!amountNumber || amountNumber < minDeposit) { notifyWarning('Invalid Amount', `Minimum investment is ${minDeposit} ${current.currency}.`); return; }
    const maximum = planMaxAmount || Number(current.max_amount || 0);
    if (maximum && amountNumber > maximum) { notifyWarning('Amount Too High', `Maximum investment is ${maximum} ${current.currency}.`); return; }
    if (!txHash.trim()) { notifyWarning('Transaction ID Required', 'Enter your payment reference or transaction hash.'); return; }
    setSubmitting(true);
    try {
      const profileId = user.id;
      const proof = await createPaymentProof({ user_id: profileId, gateway_code: current.code, amount: amountNumber, currency: current.currency, transaction_reference: txHash.trim(), status: 'Pending' });
      const order = await createInvestmentOrder({ user_id: profileId, plan_id: selectedPlan.id, gateway_code: current.code, amount: amountNumber, currency: current.currency, payment_transaction_id: proof.id, status: 'Pending' });
      setSuccessData({
        orderId: order?.id || proof?.id,
        planName: selectedPlan.name,
        amount: amountNumber,
        currency: current.currency,
        gatewayName: current.name,
        gatewayNetwork: current.network,
        reference: txHash.trim(),
        submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      });
      setTxHash('');
    } catch (error) {
      notifyError('Submission Failed', error?.message || 'Could not save your investment request.');
    } finally { setSubmitting(false); }
  };
  const goToInvestments = () => {
    localStorage.setItem('sr_user_active_tab', 'investments');
    window.dispatchEvent(new CustomEvent('sr:navigate-dashboard-tab', { detail: { tab: 'investments' } }));
  };

  const goToPlans = () => {
    localStorage.setItem('sr_user_active_tab', 'plans');
    window.dispatchEvent(new CustomEvent('sr:navigate-dashboard-tab', { detail: { tab: 'plans' } }));
  };

  const goToHome = () => {
    window.location.href = '/';
  };

  if (loading) return <div className="p-8 text-center text-amber-300"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />Loading live payment options...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-[#051330] border border-[#173870] rounded-3xl p-6 shadow-xl">
        <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">Add Capital</span>
        <h2 className="text-2xl font-black text-white mt-1">Deposit Funds</h2>
        <p className="text-slate-300 text-xs">Fast, secure deposit options with multi-currency gateway integration.</p>
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
        <div className="lg:col-span-5 bg-[#051330] border border-[#173870] rounded-2xl p-6 shadow-xl flex flex-col items-center text-center space-y-4">
          {/* Gateway Selector */}
          <div className="w-full">
            <span className="text-xs font-bold text-slate-400 block mb-2">Select Gateway</span>
            <div className="flex flex-wrap justify-center gap-2">
              {gateways.map((gateway) => {
                const isSelected = method === gateway.code;
                const isBinance = gateway.code?.toLowerCase().includes('binance') || gateway.name?.toLowerCase().includes('binance');
                return (
                  <button
                    key={gateway.code}
                    type="button"
                    onClick={() => setMethod(gateway.code)}
                    className={`p-3 rounded-xl text-left transition inline-flex flex-col justify-between border min-w-[120px] max-w-[160px] whitespace-nowrap ${
                      isSelected
                        ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 font-black shadow-lg border-amber-300 ring-2 ring-amber-400/40'
                        : 'bg-[#030c1f] border-[#143269] text-slate-300 hover:text-white hover:border-amber-400/40'
                    }`}
                  >
                    <span className="text-xs font-black truncate block">{gateway.name}</span>
                    {gateway.network && (
                      <div className="mt-1.5 flex items-center gap-1 flex-wrap">
                        <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-black tracking-wider ${
                          isSelected
                            ? 'bg-slate-950/20 text-slate-950'
                            : isBinance
                            ? 'bg-amber-400 text-slate-950 animate-pulse font-extrabold shadow-sm'
                            : 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                        }`}>
                          Network:
                        </span>
                        <span className={`text-[10px] font-bold ${
                          isSelected
                            ? 'text-slate-950'
                            : isBinance
                            ? 'text-amber-300 font-black'
                            : 'text-slate-300'
                        }`}>
                          {gateway.network}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* QR Code Card */}
          <div className="p-3 bg-white rounded-2xl shadow-xl border-4 border-amber-400/40">
            {qr ? <img src={qr} alt="Deposit QR" className="w-40 h-40 object-contain rounded-lg" /> : <QrCode className="w-40 h-40 p-8 text-slate-300" />}
          </div>

          {/* Address / Account box with full click-to-copy */}
          <div className="w-full space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-400">{current?.name}</span>
              {current?.network && (
                <div className="flex items-center gap-1.5">
                  <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-black tracking-wider ${
                    current?.code?.toLowerCase().includes('binance') || current?.name?.toLowerCase().includes('binance')
                      ? 'bg-amber-400 text-slate-950 font-black shadow-sm ring-1 ring-amber-300'
                      : 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                  }`}>
                    Network:
                  </span>
                  <span className="text-amber-300 font-bold text-xs">{current.network}</span>
                </div>
              )}
            </div>

            {/* Entire container is clickable to copy */}
            <div
              role="button"
              tabIndex={0}
              onClick={handleCopy}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCopy(); } }}
              title="Click anywhere to copy address"
              className={`w-full group cursor-pointer p-3 rounded-xl border transition flex items-center justify-between gap-3 text-left ${
                copied
                  ? 'bg-emerald-950/40 border-emerald-400 ring-2 ring-emerald-400/40'
                  : 'bg-[#030c1f] border-[#173a78] hover:border-amber-400 hover:bg-[#071738]'
              }`}
            >
              <div className="min-w-0 flex-1">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold group-hover:text-amber-300 transition">
                  {current?.currency ? `${current.currency} Deposit Address / Account` : 'Deposit Account'} (Click to Copy)
                </span>
                <span className="font-mono text-amber-300 font-bold text-xs sm:text-sm break-all block mt-0.5 select-all">
                  {current?.account_identifier || 'Setup required'}
                </span>
              </div>
              <div className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-400/10 border border-amber-400/30 group-hover:bg-amber-400 group-hover:text-slate-950 transition text-amber-300">
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400 group-hover:text-slate-950" />
                    <span className="text-[10px] font-black text-emerald-400 group-hover:text-slate-950">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="text-[10px] font-black">Copy</span>
                  </>
                )}
              </div>
            </div>
            <p className="text-[9px] text-slate-400 text-center">Click anywhere on the box to copy</p>
          </div>
        </div>

        <div className="lg:col-span-7 bg-[#051330] border border-[#173870] rounded-2xl p-6 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider">Investment &amp; Payment Confirmation</h3>
            <select value={planId} onChange={(e) => setPlanId(e.target.value)} className="w-full px-4 py-2.5 bg-[#030c1f] border border-[#173a78] rounded-xl text-white text-xs">
              {plans.filter((plan) => plan.enabled !== false).map((plan) => <option key={plan.id} value={plan.id}>{plan.name} — {plan.amount} / ROI {plan.roi}</option>)}
            </select>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Investment Amount ({current?.currency || cur})</label>
              <input 
                type="number" 
                value={isCustomAmountPlan ? amount : (selectedPlan?.amount?.replace(/[^0-9.]/g, '') || '')}
                onChange={(e) => setAmount(e.target.value)}
                readOnly={!isCustomAmountPlan}
                min={minDeposit}
                max={planMaxAmount || undefined}
                className="w-full px-4 py-2.5 bg-[#030c1f] border border-[#173a78] rounded-xl text-white font-bold focus:outline-none focus:border-amber-400 read-only:opacity-70"
                placeholder={isCustomAmountPlan ? `${minDeposit}${planMaxAmount ? ` - ${planMaxAmount}` : ''}` : 'Selected plan amount'}
              />
              {isCustomAmountPlan && <p className="mt-1 text-[10px] text-cyan-300">Custom amount range: {minDeposit} - {planMaxAmount || 'gateway maximum'} {current?.currency || cur}.</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">Transaction ID / Sender Reference</label>
                {current?.name && (
                  <span className="text-[10px] text-amber-300 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                    {current.name} Proof
                  </span>
                )}
              </div>
              <input 
                type="text" 
                value={(txHash ?? '')}
                onChange={(e) => setTxHash(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#030c1f] border border-[#173a78] rounded-xl text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                placeholder={getReferencePlaceholder(current)}
              />
            </div>

            <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-[11px] text-amber-100 flex items-start space-x-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>{(settings as any).invest_warning_text || 'Please verify gateway details before submitting payment proof.'} {current?.instructions}</span>
            </div>

            <button 
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:brightness-110 text-white font-black text-sm shadow-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {submitting ? 'Processing...' : 'Deposit Now ➔'}
            </button>
          </form>
        </div>
      </div>}
    </div>
  );
}
