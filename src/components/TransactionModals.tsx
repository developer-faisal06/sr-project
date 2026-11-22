import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, QrCode, Copy, Check, CreditCard } from 'lucide-react';
import { notifySuccess, notifyWarning, notifyError } from '../lib/notify';
import { submitWithdrawal } from '../services/api';

export function InvestModal({ isOpen, plan, onClose, onConfirm, settings }) {
  const [copied, setCopied] = useState(false);
  if (!isOpen || !plan) return null;

  const binanceAddr = settings?.binance_address || 'TX998231USDTTRC20WALLET';
  const qrUrl = settings?.qr_code_url || 'https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=TX998231USDTTRC20WALLET';

  const handleCopy = () => {
    navigator.clipboard?.writeText(binanceAddr);
    setCopied(true);
    notifySuccess('Copied!', 'Binance USDT (TRC20) address copied.');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="sr-modal-shell relative w-full max-w-md bg-[#071738] border-2 border-amber-400/50 rounded-3xl p-4 sm:p-6 text-white shadow-2xl space-y-4">
        <button onClick={onClose} className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
        <div className="text-center">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Deposit &amp; Invest</span>
          <h3 className="text-2xl font-black text-white mt-0.5">{plan.name}</h3>
        </div>

        <div className="bg-[#030a1a] p-3 rounded-2xl border border-[#173b7d] space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Required Amount:</span>
            <span className="font-extrabold text-amber-400 text-sm">{plan.amount}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Monthly Projected ROI:</span>
            <span className="font-extrabold text-emerald-400 text-sm">{plan.roi}</span>
          </div>
        </div>

        {/* Deposit QR & Wallet */}
        <div className="bg-[#030a1a] p-3 rounded-2xl border border-amber-400/30 text-center space-y-2">
          <span className="text-[11px] font-bold text-amber-300 flex items-center justify-center space-x-1">
            <QrCode className="w-3.5 h-3.5" />
            <span>Scan QR Code to Pay via Binance / USDT</span>
          </span>
          <div className="inline-block p-2 bg-white rounded-xl shadow-md">
            <img src={qrUrl} alt="Deposit QR" className="w-28 h-28 object-contain mx-auto" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-mono">Binance Pay / USDT (TRC20):</span>
            <div className="flex items-center justify-between bg-[#071738] px-2.5 py-1.5 rounded-lg border border-[#173b7d] mt-1 text-[11px]">
              <span className="font-mono truncate max-w-[240px] text-amber-200">{binanceAddr}</span>
              <button type="button" onClick={handleCopy} className="text-amber-400 hover:text-white ml-2 flex items-center space-x-1 font-bold">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[10px]">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        <button 
          onClick={() => { onConfirm(plan); onClose(); }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs uppercase shadow-lg flex items-center justify-center space-x-2"
        >
          <span>Confirm &amp; Activate Plan &rarr;</span>
        </button>
      </div>
    </div>
  );
}

export function WithdrawModal({ isOpen, balance, user, gateways = [], onClose, onWithdrawSuccess }) {
  const [method, setMethod] = useState('bkash');
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState(balance || 75);
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const withdrawalGateways = gateways.filter((gateway) => gateway.enabled && gateway.withdrawal_enabled);
  const selectedGateway = withdrawalGateways.find((gateway) => gateway.code === method) || withdrawalGateways[0];

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (amount > balance) {
      notifyWarning('Insufficient Balance', `Your current balance is $${balance}. You cannot withdraw more than available.`);
      return;
    }
    if (!account) {
      notifyWarning('Account Missing', 'Please enter your receiving account number / wallet address.');
      return;
    }
    if (!selectedGateway) {
      notifyWarning('Gateway Unavailable', 'No withdrawal gateway is enabled for this account.');
      return;
    }
    setSaving(true);
    try {
      const request = await submitWithdrawal({ userId: user?.id, amount: Number(amount), gatewayCode: selectedGateway.code, account: account.trim() });
      notifySuccess('Request Submitted!', `Your payout request for $${request.amount} via ${request.method} is queued for approval.`);
      onWithdrawSuccess(request);
      onClose();
    } catch (error) {
      notifyError('Withdrawal Failed', error?.message || 'Could not submit withdrawal request.');
    } finally { setSaving(false); }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="sr-modal-shell relative w-full max-w-md bg-[#071738] border-2 border-amber-400/50 rounded-3xl p-4 sm:p-6 text-white shadow-2xl space-y-5">
        <button onClick={onClose} className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
        <div className="text-center">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Fast Payout</span>
          <h3 className="text-2xl font-black text-white mt-1">Withdraw Funds</h3>
          <p className="text-xs text-slate-400 mt-1">Available: ${balance}</p>
        </div>
        <form onSubmit={handleWithdraw} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Payment Method</label>
            <div className="grid grid-cols-3 gap-2 text-xs font-bold">
              {withdrawalGateways.length > 0 ? withdrawalGateways.map((gateway) => (
                <button 
                  key={gateway.code} type="button" onClick={() => setMethod(gateway.code)}
                  className={`py-2 rounded-xl uppercase border ${method === gateway.code ? 'bg-amber-400 text-slate-950 border-amber-400' : 'bg-[#030a1a] border-[#173b7d] text-slate-300'}`}
                >
                  {gateway.name || gateway.code}
                </button>
              )) : <p className="col-span-3 text-slate-400">No withdrawal gateway enabled.</p>}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Account Number</label>
            <input 
              type="text" required placeholder="017xxxxxxxx or Wallet Address" 
              value={(account ?? '')} onChange={(e) => setAccount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#030a1a] border border-[#173b7d] text-sm text-white focus:outline-none focus:border-amber-400"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Amount (USD)</label>
            <input 
              type="number" max={balance} min="10" required
              value={(amount ?? '')} onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#030a1a] border border-[#173b7d] text-sm text-white focus:outline-none focus:border-amber-400"
            />
          </div>
          <button 
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-black text-sm shadow-lg flex items-center justify-center space-x-2"
          >
            <span>Confirm Withdrawal &rarr;</span>
          </button>
        </form>
      </div>
    </div>
  );
}
