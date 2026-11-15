import React, { useEffect, useState } from 'react';
import { Download, Copy, Check, ShieldCheck, Loader2, QrCode } from 'lucide-react';
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

  useEffect(() => {
    fetchPaymentGateways(true).then((items) => {
      setGateways(items);
      setMethod(items[0]?.code || '');
    }).catch((error) => notifyError('Payment Options Unavailable', error?.message || 'Could not load payment gateways.')).finally(() => setLoading(false));
  }, []);

  const selectedPlan = plans.find((plan) => plan.id === planId) || plans[0];
  const isCustomAmountPlan = Boolean(selectedPlan?.is_custom_amount || selectedPlan?.id === 'custom');
  const current = gateways.find((gateway) => gateway.code === method);
  const planMinAmount = Number(selectedPlan?.min_amount || settings.min_deposit || current?.min_amount || 0);
  const planMaxAmount = Number(selectedPlan?.max_amount || current?.max_amount || 0);
  const amountNumber = Number(amount || (!isCustomAmountPlan ? selectedPlan?.amount?.replace(/[^0-9.]/g, '') : 0) || 0);
  const minDeposit = Math.max(Number(settings.min_deposit || 0), planMinAmount);
  const qr = current?.qr_code_url || (current?.account_identifier ? `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(current.account_identifier)}` : '');

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
      await createInvestmentOrder({ user_id: profileId, plan_id: selectedPlan.id, gateway_code: current.code, amount: amountNumber, currency: current.currency, payment_transaction_id: proof.id, status: 'Pending' });
      notifySuccess('Investment Submitted', 'Payment proof is pending admin verification.');
      setTxHash('');
    } catch (error) {
      notifyError('Submission Failed', error?.message || 'Could not save your investment request.');
    } finally { setSubmitting(false); }
  };

  if (loading) return <div className="p-8 text-center text-amber-300"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />Loading live payment options...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-[#051330] border border-[#173870] rounded-3xl p-6 shadow-xl">
        <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">Add Capital</span>
        <h2 className="text-2xl font-black text-white mt-1">Deposit Funds</h2>
        <p className="text-slate-300 text-xs">Fast, secure deposit options with multi-currency gateway integration.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-[#051330] border border-[#173870] rounded-2xl p-6 shadow-xl flex flex-col items-center text-center space-y-4">
          <div className="w-full">
            <span className="text-xs font-bold text-slate-400 block mb-2">Select Gateway</span>
            <div className="grid grid-cols-3 gap-2">
              {gateways.map((gateway) => (
                <button
                  key={gateway.code}
                  onClick={() => setMethod(gateway.code)}
                  className={`py-2 rounded-xl text-xs font-bold capitalize transition ${
                    method === gateway.code ? 'bg-amber-400 text-slate-950 font-black shadow' : 'bg-[#030c1f] border border-[#143269] text-slate-300 hover:text-white'
                  }`}
                >
                  {gateway.name}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white rounded-2xl shadow-xl border-4 border-amber-400/40">
            {qr ? <img src={qr} alt="Deposit QR" className="w-40 h-40 object-contain rounded-lg" /> : <QrCode className="w-40 h-40 p-8 text-slate-300" />}
          </div>

          <div className="w-full space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 block">{current?.name}</span>
            <div className="flex items-center justify-between bg-[#030c1f] border border-[#173a78] p-2 rounded-xl text-xs">
              <span className="font-mono text-amber-300 truncate max-w-[200px]">{current?.account_identifier}</span>
              <button onClick={handleCopy} className="p-1 hover:text-white text-slate-400">
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
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
              {isCustomAmountPlan && <p className="mt-1 text-[10px] text-cyan-300">Custom amount range: {minDeposit} - {planMaxAmount || 'gateway maximum'} {current?.currency || cur}.</p>}

              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Transaction ID / Sender Reference</label>
              <input 
                type="text" 
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#030c1f] border border-[#173a78] rounded-xl text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                placeholder="e.g. 0x89ab... or bKash TrxID"
              />
            </div>

            <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-[11px] text-amber-100 flex items-start space-x-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>{settings.invest_warning_text || 'Please verify gateway details before submitting payment proof.'} {current?.instructions}</span>
            </div>

            <button 
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:brightness-110 text-white font-black text-sm shadow-xl transition"
            >
              Submit Deposit Proof ➔
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
