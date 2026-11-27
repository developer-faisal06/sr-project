import React, { useEffect, useState } from 'react';
import { Wallet, Plus, Trash2, Check, Clock, ShieldCheck, Loader2, ArrowRight, AlertCircle, Landmark, Smartphone } from 'lucide-react';
import { notifySuccess, notifyWarning, notifyError } from '../../../lib/notify';
import { fetchUserPayoutAccounts, saveUserPayoutAccount, deleteUserPayoutAccount, fetchPaymentGateways, fetchWithdrawalEligibility, submitWithdrawal, defaultPaymentGateways } from '../../../services/api';

export default function UserWithdrawView({ user, fmt, cur, settings = {} }) {
  const [gateways, setGateways] = useState([]);
  const [payoutAccounts, setPayoutAccounts] = useState([]);
  const [eligibility, setEligibility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const [newGatewayCode, setNewGatewayCode] = useState('');
  const [newAccountName, setNewAccountName] = useState('');
  const [newAccountNumber, setNewAccountNumber] = useState('');
  const [newNetwork, setNewNetwork] = useState('');
  const [newAccountHolder, setNewAccountHolder] = useState('');
  const [newBankName, setNewBankName] = useState('');
  const [newBranchName, setNewBranchName] = useState('');
  const [newRoutingNumber, setNewRoutingNumber] = useState('');
  const [newAccountType, setNewAccountType] = useState('Personal');
  const [customGatewayName, setCustomGatewayName] = useState('');
  const [customFields, setCustomFields] = useState<{ label: string; value: string }[]>([]);

  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    Promise.all([
      fetchPaymentGateways(false).then(setGateways).catch(() => []),
      fetchUserPayoutAccounts(user?.id).then(setPayoutAccounts).catch(() => []),
      fetchWithdrawalEligibility(user?.id).then(setEligibility).catch(() => null),
    ]).finally(() => setLoading(false));
  }, [user?.id]);

  const availableGateways = gateways && gateways.length > 0 ? gateways : defaultPaymentGateways;
  const withdrawalGateways = availableGateways
    .filter(g => g.enabled && g.withdrawal_enabled)
    .filter(g => !['bkash', 'nagad', 'rocket'].includes(g.code?.toLowerCase()));
  const availableBalance = Number(user?.withdrawable_balance ?? user?.balance ?? 0);
  const lockedDeposit = Number(eligibility?.locked_deposit ?? 0);
  const lockedProfit = Number(eligibility?.locked_profit ?? 0);
  const lockedReferral = Number(eligibility?.locked_referral_commission ?? 0);
  const totalLocked = lockedDeposit + lockedProfit + lockedReferral;
  const depositLockActive = Boolean(eligibility?.deposit_lock_active);
  const lockUntil = eligibility?.deposit_lock_until;
  const workingDaysCompleted = Number(eligibility?.working_days_completed ?? 0);
  const workingDaysRequired = Number(eligibility?.working_days_required ?? 30);
  const selectedAccount = payoutAccounts.find(a => String(a.id) === String(selectedAccountId));
  const selectedGateway = selectedAccount ? withdrawalGateways.find(g => g.code === selectedAccount.gateway_code) : null;

  const resetAddForm = () => {
    setNewGatewayCode('');
    setNewNetwork('');
    setNewAccountName('');
    setNewAccountNumber('');
    setNewAccountHolder('');
    setNewBankName('');
    setNewBranchName('');
    setNewRoutingNumber('');
    setNewAccountType('Personal');
    setCustomGatewayName('');
    setCustomFields([]);
    setShowAddForm(false);
  };

  const addCustomField = (defaultLabel = '') => {
    setCustomFields(prev => [...prev, { label: defaultLabel, value: '' }]);
  };

  const updateCustomField = (index: number, key: 'label' | 'value', val: string) => {
    setCustomFields(prev => prev.map((item, i) => i === index ? { ...item, [key]: val } : item));
  };

  const removeCustomField = (index: number) => {
    setCustomFields(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddAccount = async (e) => {
    e.preventDefault();
    if (!newGatewayCode) { notifyWarning('Select Gateway', 'Select an account type / payment gateway first.'); return; }
    if (newGatewayCode === 'custom_dynamic' && !customGatewayName.trim()) {
      notifyWarning('Gateway Name Required', 'Enter a name for your custom payment gateway.');
      return;
    }
    if (!newAccountName.trim()) { notifyWarning('Account Name Required', 'Enter a label or title for this account.'); return; }
    if (!newAccountNumber.trim()) { notifyWarning('Account Identifier Required', 'Enter your account number, mobile number, or wallet address.'); return; }
    setSaving(true);
    try {
      const gw = withdrawalGateways.find(g => g.code === newGatewayCode);
      const isCrypto = newGatewayCode.toLowerCase().includes('binance') || newGatewayCode.toLowerCase().includes('usdt');
      const net = isCrypto ? (newNetwork || 'TRC20') : (gw?.network || null);

      let fullAccountNumber = newAccountNumber.trim();
      const isBank = newGatewayCode.toLowerCase().includes('bank');
      const isTouchNGo = newGatewayCode.toLowerCase().includes('touchngo');

      if (isBank) {
        const parts = [fullAccountNumber];
        if (newBankName.trim()) parts.push(`Bank: ${newBankName.trim()}`);
        if (newBranchName.trim()) parts.push(`Branch: ${newBranchName.trim()}`);
        if (newAccountHolder.trim()) parts.push(`Holder: ${newAccountHolder.trim()}`);
        if (newRoutingNumber.trim()) parts.push(`Routing: ${newRoutingNumber.trim()}`);
        fullAccountNumber = parts.join(' | ');
      } else if (isTouchNGo && newAccountHolder.trim()) {
        fullAccountNumber = `${fullAccountNumber} | Holder: ${newAccountHolder.trim()}`;
      }

      // Append any dynamic custom fields
      if (customFields && customFields.length > 0) {
        const dynamicParts = customFields
          .filter(f => f.label?.trim() && f.value?.trim())
          .map(f => `${f.label.trim()}: ${f.value.trim()}`);
        if (dynamicParts.length > 0) {
          fullAccountNumber = `${fullAccountNumber} | ${dynamicParts.join(' | ')}`;
        }
      }

      const finalGatewayCode = newGatewayCode === 'custom_dynamic'
        ? (customGatewayName.trim() ? customGatewayName.toLowerCase().replace(/[^a-z0-9_]/g, '_') : 'custom_gateway')
        : newGatewayCode;

      const saved = await saveUserPayoutAccount({
        user_id: user.id,
        gateway_code: finalGatewayCode,
        account_name: newAccountName.trim() || (newGatewayCode === 'custom_dynamic' ? customGatewayName.trim() : (gw?.name || 'Payout Account')),
        account_number: fullAccountNumber,
        network: net,
      });
      setPayoutAccounts(prev => [saved, ...prev]);
      resetAddForm();
      notifySuccess('Account Saved!', `${saved.account_name} added successfully. You can add more accounts anytime.`);
    } catch (error) {
      notifyError('Save Failed', error?.message || 'Could not save payout account.');
    } finally { setSaving(false); }
  };

  const handleDeleteAccount = async (accountId) => {
    try {
      await deleteUserPayoutAccount(accountId);
      setPayoutAccounts(prev => prev.filter(a => a.id !== accountId));
      if (String(selectedAccountId) === String(accountId)) setSelectedAccountId('');
      notifySuccess('Removed', 'Payout account deleted.');
    } catch (error) {
      notifyError('Delete Failed', error?.message || 'Could not remove account.');
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    const value = Number(amount);
    if (!selectedAccount) { notifyWarning('Select Account', 'Select a saved payout account first.'); return; }
    if (!value || value <= 0) { notifyWarning('Invalid Amount', 'Enter a valid withdrawal amount.'); return; }
    if (value > availableBalance) { notifyWarning('Insufficient Balance', `Your available balance is ${fmt(availableBalance)}. You cannot withdraw more.`); return; }
    if (!selectedGateway) { notifyWarning('Gateway Unavailable', 'The selected payment method is not available for withdrawals.'); return; }
    setSubmitting(true);
    try {
      await submitWithdrawal({
        userId: user.id,
        amount: value,
        gatewayCode: selectedAccount.gateway_code,
        account: selectedAccount.account_number,
      });
      setSuccessData({
        amount: value,
        currency: selectedGateway?.currency || 'USD',
        gatewayName: selectedGateway?.name || selectedAccount.gateway_code,
        accountName: selectedAccount.account_name,
        accountNumber: selectedAccount.account_number,
      });
      setAmount('');
    } catch (error) {
      notifyError('Withdrawal Failed', error?.message || 'Could not submit withdrawal request.');
    } finally { setSubmitting(false); }
  };

  const getGatewayIcon = (code) => {
    if (!code) return <Wallet className="w-4 h-4" />;
    const c = code.toLowerCase();
    if (c.includes('touchngo')) return <Smartphone className="w-4 h-4" />;
    if (c.includes('bank')) return <Landmark className="w-4 h-4" />;
    return <Wallet className="w-4 h-4" />;
  };

  if (loading) return <div className="py-20 text-center text-amber-300"><Loader2 className="w-7 h-7 animate-spin mx-auto mb-3" />Loading withdrawal portal...</div>;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#091f4d] via-[#09245c] to-[#0e3b91] border border-amber-400/40 rounded-3xl p-6 shadow-xl">
        <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">Payout Request</span>
        <h2 className="text-2xl font-black text-white mt-1">Withdrawal Portal</h2>
        <p className="text-slate-300 text-xs mt-0.5">Withdraw funds to your saved bank account, mobile wallet, or crypto address.</p>
      </div>

      {/* Account Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#051330] border border-emerald-500/30 rounded-2xl p-4 shadow-xl">
          <span className="text-[10px] text-slate-400 block uppercase font-bold">Available to Withdraw</span>
          <span className="text-xl font-black text-emerald-400 mt-1 block">{fmt(availableBalance)}</span>
        </div>
        <div className="bg-[#051330] border border-amber-400/30 rounded-2xl p-4 shadow-xl">
          <span className="text-[10px] text-slate-400 block uppercase font-bold">Locked Balance</span>
          <span className="text-xl font-black text-amber-300 mt-1 block">{fmt(totalLocked)}</span>
        </div>
        <div className="bg-[#051330] border border-[#173870] rounded-2xl p-4 shadow-xl">
          <span className="text-[10px] text-slate-400 block uppercase font-bold">Lock Progress</span>
          <div className="mt-1.5">
            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
              <span>{workingDaysCompleted} / {workingDaysRequired} days</span>
              <span className="text-amber-300">{Math.round((workingDaysCompleted / (workingDaysRequired || 1)) * 100)}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#030c1f] overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all" style={{ width: `${Math.min(100, (workingDaysCompleted / (workingDaysRequired || 1)) * 100)}%` }} />
            </div>
          </div>
        </div>
        <div className="bg-[#051330] border border-[#173870] rounded-2xl p-4 shadow-xl">
          <span className="text-[10px] text-slate-400 block uppercase font-bold">Unlock Date</span>
          <span className="text-sm font-bold text-white mt-1 block">
            {lockUntil ? new Date(lockUntil).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'No active lock'}
          </span>
          <span className={`text-[10px] font-bold mt-0.5 block ${depositLockActive ? 'text-amber-400' : 'text-emerald-400'}`}>
            {depositLockActive ? '🔒 Lock Active' : '✅ Unlocked'}
          </span>
        </div>
      </div>

      {/* Lock Warning */}
      {depositLockActive && (
        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-400/40 text-xs text-amber-100 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-300 text-sm">Withdrawal Lock Active</p>
            <p className="text-slate-300 mt-0.5">{(settings as any).withdraw_warning_text || 'Your deposited funds and accrued profits require a specified number of completed working days before withdrawal eligibility.'}</p>
          </div>
        </div>
      )}

      {/* Success card */}
      {successData && (
        <div className="rounded-3xl border-2 border-emerald-400/60 bg-gradient-to-br from-[#06241e] via-[#041d18] to-[#031512] p-6 shadow-2xl space-y-5">
          <div className="flex items-center gap-3.5 border-b border-emerald-500/30 pb-4">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300"><Check className="w-6 h-6" /></div>
            <div>
              <h3 className="text-lg font-black text-white">Withdrawal Request Submitted!</h3>
              <p className="text-xs text-slate-300">Admin will review and process your payout.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-[#030d0a] p-4 rounded-2xl border border-emerald-500/20">
            <div><span className="text-slate-400 text-[10px] block">Amount</span><span className="font-black text-emerald-300 text-sm block mt-0.5">{successData.amount} {successData.currency}</span></div>
            <div><span className="text-slate-400 text-[10px] block">Gateway</span><span className="font-bold text-amber-300 block mt-0.5">{successData.gatewayName}</span></div>
            <div><span className="text-slate-400 text-[10px] block">To Account</span><span className="font-mono text-white block mt-0.5 text-[11px] truncate">{successData.accountName} ({successData.accountNumber})</span></div>
          </div>
          <button type="button" onClick={() => setSuccessData(null)} className="w-full py-2.5 rounded-xl border border-slate-600 text-slate-300 hover:text-white font-bold text-xs transition">← Back to Withdrawal Portal</button>
        </div>
      )}

      {!successData && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Saved Payout Accounts */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#051330] border border-[#173870] rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#173870]">
                <div className="flex items-center gap-2 text-white font-black text-sm">
                  <Wallet className="w-4 h-4 text-amber-400" />
                  <span>My Payout Accounts</span>
                </div>
                <button type="button" onClick={() => setShowAddForm(!showAddForm)} className="px-3 py-1.5 rounded-lg bg-amber-400/10 border border-amber-400/40 text-amber-300 text-[10px] font-black hover:bg-amber-400 hover:text-slate-950 transition flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Add New
                </button>
              </div>

              {/* Add Account Form */}
              {showAddForm && (
                <form onSubmit={handleAddAccount} className="p-4 rounded-xl bg-[#030c1f] border border-amber-400/30 space-y-3">
                  <p className="text-[11px] font-bold text-amber-300">Add your wallet or account info where you want to receive money</p>
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#173b7d]">
                    <span className="text-xs font-black text-amber-300">Add New Payout Account</span>
                    <span className="text-[10px] text-slate-400">Multiple accounts supported</span>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-300 block mb-1 font-bold">
                      Account Type / Payout Gateway <span className="text-rose-400">*</span>
                    </label>
                    <select
                      value={newGatewayCode}
                      onChange={(e) => {
                        const code = e.target.value;
                        setNewGatewayCode(code);
                        setNewNetwork('');
                        if (code === 'custom_dynamic') {
                          setNewAccountName('Custom Payout Account');
                        } else {
                          const gw = withdrawalGateways.find(g => g.code === code);
                          if (gw) {
                            setNewAccountName(`${gw.name} Payout`);
                          }
                        }
                      }}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#071738] border border-[#173b7d] text-white text-xs font-semibold focus:border-amber-400 outline-none"
                    >
                      <option value="">-- Select Payout Gateway (Binance, Touch 'n Go, Custom) --</option>
                      {withdrawalGateways.map(g => (
                        <option key={g.code} value={g.code} className="bg-[#071738] text-white py-1">
                          {g.name} ({g.currency})
                        </option>
                      ))}
                      <option value="custom_dynamic" className="bg-[#071738] text-amber-300 py-1 font-bold">
                        + Custom Gateway (Dynamic Fields)
                      </option>
                    </select>
                  </div>

                  {newGatewayCode && (
                    <div className="space-y-3 pt-1 border-t border-[#173b7d]/60">
                      {newGatewayCode === 'custom_dynamic' && (
                        <div>
                          <label className="text-[10px] text-slate-300 block mb-1 font-bold">
                            Custom Gateway / Provider Name <span className="text-rose-400">*</span>
                          </label>
                          <input
                            value={customGatewayName}
                            onChange={(e) => setCustomGatewayName(e.target.value)}
                            placeholder="e.g. Bank Wire, TRON Wallet, Wise, Crypto..."
                            className="w-full px-3 py-2 rounded-xl bg-[#071738] border border-[#173b7d] text-white text-xs focus:border-amber-400 outline-none"
                          />
                        </div>
                      )}

                      <div>
                        <label className="text-[10px] text-slate-300 block mb-1 font-bold">
                          Account Label / Title <span className="text-rose-400">*</span>
                        </label>
                        <input
                          value={newAccountName}
                          onChange={(e) => setNewAccountName(e.target.value)}
                          placeholder="e.g. My Primary Account / Personal Wallet"
                          className="w-full px-3 py-2 rounded-xl bg-[#071738] border border-[#173b7d] text-white text-xs focus:border-amber-400 outline-none"
                        />
                      </div>

                      {/* Crypto Network (for Binance / USDT) */}
                      {(newGatewayCode.toLowerCase().includes('binance') || newGatewayCode.toLowerCase().includes('usdt')) && (
                        <div>
                          <label className="text-[10px] text-slate-300 block mb-1 font-bold">
                            Select Network <span className="text-rose-400">*</span>
                          </label>
                          <div className="flex flex-wrap gap-1.5">
                            {['TRC20 (Recommended)', 'BEP20', 'ERC20', 'SOL', 'POLYGON'].map(net => {
                              const rawNet = net.split(' ')[0];
                              const isNetActive = (newNetwork || 'TRC20') === rawNet;
                              return (
                                <button
                                  key={rawNet}
                                  type="button"
                                  onClick={() => setNewNetwork(rawNet)}
                                  className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition border ${
                                    isNetActive
                                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow'
                                      : 'bg-[#071738] text-slate-300 border-[#173b7d] hover:border-amber-400'
                                  }`}
                                >
                                  {net}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Touch 'n Go Details */}
                      {newGatewayCode.toLowerCase().includes('touchngo') && (
                        <div>
                          <label className="text-[10px] text-slate-300 block mb-1 font-bold">Touch 'n Go Account Holder Name</label>
                          <input
                            value={newAccountHolder}
                            onChange={(e) => setNewAccountHolder(e.target.value)}
                            placeholder="Full Name as registered with Touch 'n Go"
                            className="w-full px-2.5 py-2 rounded-xl bg-[#071738] border border-[#173b7d] text-white text-xs focus:border-amber-400 outline-none"
                          />
                        </div>
                      )}

                      {/* Bank Details (If Bank Gateway) */}
                      {newGatewayCode.toLowerCase().includes('bank') && (
                        <div className="space-y-2 p-2.5 rounded-xl bg-[#071738]/60 border border-blue-500/20">
                          <span className="text-[10px] font-bold text-blue-300 uppercase block">Bank Account Details</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] text-slate-400 block mb-1 font-semibold">Bank Name <span className="text-rose-400">*</span></label>
                              <input
                                value={newBankName}
                                onChange={(e) => setNewBankName(e.target.value)}
                                placeholder="e.g. Dutch Bangla Bank, City Bank..."
                                className="w-full px-2.5 py-2 rounded-lg bg-[#030c1f] border border-[#173b7d] text-white text-xs focus:border-amber-400 outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-400 block mb-1 font-semibold">Account Holder Name <span className="text-rose-400">*</span></label>
                              <input
                                value={newAccountHolder}
                                onChange={(e) => setNewAccountHolder(e.target.value)}
                                placeholder="Full Name as on Bank Account"
                                className="w-full px-2.5 py-2 rounded-lg bg-[#030c1f] border border-[#173b7d] text-white text-xs focus:border-amber-400 outline-none"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] text-slate-400 block mb-1 font-semibold">Branch Name</label>
                              <input
                                value={newBranchName}
                                onChange={(e) => setNewBranchName(e.target.value)}
                                placeholder="e.g. Motijheel Branch, Gulshan..."
                                className="w-full px-2.5 py-2 rounded-lg bg-[#030c1f] border border-[#173b7d] text-white text-xs focus:border-amber-400 outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-400 block mb-1 font-semibold">Routing Number</label>
                              <input
                                value={newRoutingNumber}
                                onChange={(e) => setNewRoutingNumber(e.target.value)}
                                placeholder="e.g. 090271822"
                                className="w-full px-2.5 py-2 rounded-lg bg-[#030c1f] border border-[#173b7d] text-white text-xs focus:border-amber-400 outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Account Number / Wallet Address */}
                      <div>
                        <label className="text-[10px] text-slate-300 block mb-1 font-bold">
                          {newGatewayCode.toLowerCase().includes('bank')
                            ? 'Bank Account Number'
                            : newGatewayCode.toLowerCase().includes('binance')
                            ? `Binance Pay Email / UID / ${newNetwork || 'TRC20'} Wallet Address`
                            : newGatewayCode.toLowerCase().includes('usdt')
                            ? `${newNetwork || 'TRC20'} Wallet Address`
                            : newGatewayCode.toLowerCase().includes('touchngo')
                            ? "Touch 'n Go Mobile Number"
                            : 'Primary Account / Wallet Identifier'}{' '}
                          <span className="text-rose-400">*</span>
                        </label>
                        <input
                          value={newAccountNumber}
                          onChange={(e) => setNewAccountNumber(e.target.value)}
                          placeholder={
                            newGatewayCode.toLowerCase().includes('binance')
                              ? `Enter Binance Pay Email / Pay ID / ${newNetwork || 'TRC20'} Address`
                              : newGatewayCode.toLowerCase().includes('touchngo')
                              ? "Enter Touch 'n Go Mobile Number (e.g. 0123456789)"
                              : newGatewayCode.toLowerCase().includes('bank')
                              ? 'Enter Bank Account Number'
                              : 'Enter wallet address or account number'
                          }
                          className="w-full px-3 py-2.5 rounded-xl bg-[#071738] border border-[#173b7d] text-white text-xs font-mono focus:border-amber-400 outline-none"
                        />
                      </div>

                      {/* Dynamic Custom Fields Section */}
                      <div className="space-y-2 pt-2 border-t border-[#173b7d]/60">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">Dynamic Payout Fields (Optional)</span>
                          <button
                            type="button"
                            onClick={() => addCustomField()}
                            className="px-2 py-0.5 rounded-lg bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px] font-black hover:bg-amber-400 hover:text-slate-950 transition flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" /> Add Field
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {['Memo / Tag', 'Bank Name', 'SWIFT Code', 'Holder Name', 'Branch'].map(lbl => (
                            <button
                              key={lbl}
                              type="button"
                              onClick={() => addCustomField(lbl)}
                              className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#071738] border border-[#173b7d] text-slate-300 hover:border-amber-400 hover:text-amber-300 transition"
                            >
                              + {lbl}
                            </button>
                          ))}
                        </div>
                        {customFields.map((field, idx) => (
                          <div key={idx} className="flex items-center gap-2 pt-1">
                            <input
                              type="text"
                              placeholder="Field Name"
                              value={field.label}
                              onChange={(e) => updateCustomField(idx, 'label', e.target.value)}
                              className="w-2/5 px-2.5 py-1.5 rounded-lg bg-[#071738] border border-[#173b7d] text-white text-xs outline-none focus:border-amber-400"
                            />
                            <input
                              type="text"
                              placeholder="Field Value"
                              value={field.value}
                              onChange={(e) => updateCustomField(idx, 'value', e.target.value)}
                              className="w-3/5 px-2.5 py-1.5 rounded-lg bg-[#071738] border border-[#173b7d] text-white text-xs outline-none focus:border-amber-400"
                            />
                            <button
                              type="button"
                              onClick={() => removeCustomField(idx)}
                              className="p-1.5 text-rose-400 hover:text-rose-300 transition"
                              title="Remove Field"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-1">
                    <button type="button" onClick={resetAddForm} className="flex-1 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition">Cancel</button>
                    <button type="submit" disabled={saving || !newGatewayCode} className="flex-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-black flex items-center justify-center gap-1 transition disabled:opacity-50">
                      {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />} Save Account
                    </button>
                  </div>
                </form>
              )}

              {/* Saved Accounts List */}
              {payoutAccounts.length === 0 && !showAddForm ? (
                <div className="py-8 text-center space-y-3">
                  <Wallet className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-sm text-slate-400 font-bold">No payout accounts saved yet</p>
                  <p className="text-[11px] text-slate-500">Add your wallet or bank account info to start withdrawing funds.</p>
                  <button type="button" onClick={() => setShowAddForm(true)} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs shadow-lg hover:brightness-110 transition">
                    <Plus className="w-3.5 h-3.5 inline mr-1" /> Add Your First Account
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {payoutAccounts.map((acc) => {
                    const gw = gateways.find(g => g.code === acc.gateway_code);
                    const isSelected = String(selectedAccountId) === String(acc.id);
                    return (
                      <div
                        key={acc.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedAccountId(String(acc.id))}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedAccountId(String(acc.id)); }}
                        className={`group p-3 rounded-xl border cursor-pointer transition flex items-center gap-3 ${
                          isSelected
                            ? 'border-amber-400 bg-amber-400/10 ring-2 ring-amber-400/30'
                            : 'border-[#173870] bg-[#030c1f] hover:border-amber-400/40'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? 'bg-amber-400 text-slate-950' : 'bg-[#071738] text-amber-400 border border-[#173870]'}`}>
                          {getGatewayIcon(acc.gateway_code)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-xs font-black ${isSelected ? 'text-amber-300' : 'text-white'}`}>{acc.account_name}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#071738] text-slate-400 border border-[#173870] font-bold">{gw?.name || acc.gateway_code}</span>
                          </div>
                          <span className="text-[11px] font-mono text-slate-300 block truncate mt-0.5">{acc.account_number}</span>
                        </div>
                        <button type="button" onClick={(e) => { e.stopPropagation(); handleDeleteAccount(acc.id); }} className="p-1.5 rounded-lg text-slate-600 hover:text-rose-400 hover:bg-rose-500/10 transition opacity-0 group-hover:opacity-100" title="Remove">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right: Withdraw Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#051330] border border-[#173870] rounded-2xl p-5 shadow-xl space-y-5">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-[#173870]">
                <ArrowRight className="w-4 h-4 text-amber-400" /> Submit Withdrawal Request
              </h3>

              {/* Quick Dropdown: Select from Saved Accounts */}
              {payoutAccounts.length > 0 && (
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center justify-between">
                    <span>Select Payout Account (Dropdown)</span>
                    <span className="text-[10px] text-amber-400 font-normal">{payoutAccounts.length} saved</span>
                  </label>
                  <select
                    value={selectedAccountId}
                    onChange={(e) => setSelectedAccountId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#030c1f] border border-[#173a78] text-white text-xs font-semibold focus:border-amber-400 outline-none cursor-pointer"
                  >
                    <option value="">-- Choose a saved payout account --</option>
                    {payoutAccounts.map((acc) => {
                      const gw = gateways.find((g) => g.code === acc.gateway_code);
                      const gatewayLabel = gw?.name || acc.gateway_code;
                      return (
                        <option key={acc.id} value={String(acc.id)} className="bg-[#071738] text-white py-1">
                          {acc.account_name} — {gatewayLabel} ({acc.account_number})
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}

              {!selectedAccount ? (
                <div className="py-10 text-center space-y-2 text-slate-400">
                  <Wallet className="w-8 h-8 mx-auto text-slate-600" />
                  <p className="text-sm font-bold">Choose a payout account above or from the left panel</p>
                  <p className="text-[11px]">{payoutAccounts.length === 0 ? 'Add a payout account first to start withdrawing.' : 'Select an account from the dropdown or click on the card to proceed.'}</p>
                </div>
              ) : (
                <form onSubmit={handleWithdraw} className="space-y-4">
                  {/* Selected Account Preview */}
                  <div className="p-3.5 rounded-xl bg-[#030c1f] border border-amber-400/30 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                      {getGatewayIcon(selectedAccount.gateway_code)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-black text-amber-300 block">{selectedAccount.account_name}</span>
                      <span className="text-[11px] font-mono text-slate-300 block truncate">{selectedAccount.account_number}</span>
                    </div>
                    <span className="text-[9px] px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-black border border-emerald-500/30">
                      {selectedGateway?.name || selectedAccount.gateway_code}
                    </span>
                  </div>

                  {/* Amount Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-300">Withdrawal Amount ({selectedGateway?.currency || cur})</label>
                      <button type="button" onClick={() => setAmount(String(availableBalance))} className="text-[10px] text-amber-300 font-bold hover:text-amber-400 transition">Max: {fmt(availableBalance)}</button>
                    </div>
                    <input
                      type="number"
                      min="0"
                      max={availableBalance}
                      value={(amount ?? '')}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder={`Enter amount (max ${fmt(availableBalance)})`}
                      className="w-full px-4 py-2.5 bg-[#030c1f] border border-[#173a78] rounded-xl text-white font-bold text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Info box */}
                  <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs text-blue-200 flex gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-blue-400" />
                    <span>Withdrawal requests are processed within 24 hours after admin verification.</span>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting || !amount || Number(amount) <= 0}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:brightness-110 text-white font-black text-sm shadow-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                    {submitting ? 'Processing...' : 'Submit Withdrawal Request'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
