import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { notifySuccess, notifyWarning } from '../../lib/notify';
import Header from '../dashboard/Header';
import HeroBanner from '../dashboard/HeroBanner';
import KpiCards from '../dashboard/KpiCards';
import MiddleGrid from '../dashboard/MiddleGrid';
import BottomGrid from '../dashboard/BottomGrid';
import UserDepositView from '../dashboard/tabs/UserDepositView';
import UserInvestmentsView from '../dashboard/tabs/UserInvestmentsView';
import UserReferralView from '../dashboard/tabs/UserReferralView';
import UserTransactionsView from '../dashboard/tabs/UserTransactionsView';
import UserSupportView from '../dashboard/tabs/UserSupportView';
import UserSettingsView from '../dashboard/tabs/UserSettingsView';
import UserKycView from '../dashboard/tabs/UserKycView';
import UserNotificationsView from '../dashboard/tabs/UserNotificationsView';
import { defaultDashboardUser, defaultPortfolio, defaultTransactions } from '../dashboard/dashboardData';
import { updateMyProfile, fetchMyKycProfile, submitKycProfile, defaultPlans } from '../../services/api';

export default function DashboardPage({ 
  onBackHome, 
  userData, 
  onWithdraw, 
  onDeposit, 
  onReinvest, 
  onCopyReferral,
  onLogout,
  onOpenSettings,
  onOpenLogin,
  settings = {},
  plans = defaultPlans
}) {
  const [activeTab, setActiveTab] = useState(() => {
    try {
      return localStorage.getItem('sr_user_active_tab') || 'dashboard';
    } catch {
      return 'dashboard';
    }
  });
  useEffect(() => {
    const navigateFromMain = (event) => { if (event.detail?.tab) setActiveTab(event.detail.tab); };
    window.addEventListener('sr:navigate-dashboard-tab', navigateFromMain);
    return () => window.removeEventListener('sr:navigate-dashboard-tab', navigateFromMain);
  }, []);


  useEffect(() => {
    try {
      if (activeTab) localStorage.setItem('sr_user_active_tab', activeTab);
    } catch {}
  }, [activeTab]);
  const [reinvestAmount, setReinvestAmount] = useState('200');
  const [copied, setCopied] = useState(false);

  const [user, setUser] = useState(defaultDashboardUser);
  const [portfolio, setPortfolio] = useState(defaultPortfolio);
  const [transactions, setTransactions] = useState(defaultTransactions);
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    if (userData) {
      setUser(prev => ({
        ...prev,
        name: userData.name || prev.name,
        email: userData.email || prev.email,
        id: userData.id || prev.id,
        withdrawable_balance: Number(userData.balance ?? prev.withdrawable_balance),
        active_investment: Number(userData.invested ?? prev.active_investment),
        profit: Number(userData.profit ?? prev.profit),
        referral: Number(userData.referral ?? prev.referral)
      }));
    }
  }, [userData]);

  useEffect(() => {
    import('../../services/api').then(({ fetchHolidays }) => fetchHolidays().then(setHolidays).catch(() => {}));
    async function loadData() {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const authId = sessionData?.session?.user?.id;
        if (!authId) return;

        const { data: pData } = await supabase
          .from('profiles')
          .select('*')
          .eq('auth_user_id', authId)
          .maybeSingle();
        if (pData) {
          setUser(prev => ({
            ...prev,
            ...pData,
            currency: pData.currency || '$',
            total_deposited: Number(pData.total_deposited ?? prev.total_deposited),
            active_investment: Number(pData.active_investment ?? pData.invested ?? prev.active_investment),
            profit: Number(pData.profit ?? prev.profit),
            monthly_profit: Number(pData.monthly_profit ?? prev.monthly_profit),
            referral: Number(pData.referral ?? prev.referral),
            withdrawable_balance: Number(pData.withdrawable_balance ?? pData.balance ?? prev.withdrawable_balance),
            reinvestment_balance: Number(pData.reinvestment_balance ?? prev.reinvestment_balance),
            locked_balance: Number(pData.locked_balance ?? prev.locked_balance)
          }));
        }

        const { data: portData } = await supabase.from('user_portfolio').select('*');
        if (portData && portData.length > 0) setPortfolio(portData);

        const { data: txData } = await supabase.from('user_transactions_history').select('*').order('date_time', { ascending: false });
        if (txData && txData.length > 0) setTransactions(txData);
      } catch (err) {}
    }
    loadData();
  }, []);

  const cur = user.currency === 'BDT' ? '৳' : user.currency === 'EUR' ? '€' : '$';
  const fmt = (val) => `${cur}${Number(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const handleSaveProfile = async (profile) => {
    const updated = await updateMyProfile(profile);
    if (updated) {
      setUser((previous) => ({ ...previous, ...updated }));
    }
    return updated;
  };

  const handleCopyLink = () => {
    const link = `https://srinvestment.com/join?ref=${user.id}`;
    navigator.clipboard?.writeText(link);
    setCopied(true);
    notifySuccess('Referral Link Copied!', link);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmReinvest = () => {
    const amt = Number(reinvestAmount);
    if (!amt || amt <= 0) {
      notifyWarning('Invalid Amount', 'Please enter a valid reinvestment amount.');
      return;
    }
    if (amt > user.reinvestment_balance) {
      notifyWarning('Insufficient Balance', `You only have ${fmt(user.reinvestment_balance)} available for reinvestment.`);
      return;
    }
    if (onReinvest) {
      onReinvest();
    } else {
      setUser(prev => ({
        ...prev,
        reinvestment_balance: prev.reinvestment_balance - amt,
        active_investment: prev.active_investment + amt
      }));
      notifySuccess('Reinvestment Successful!', `${fmt(amt)} added to active investment.`);
    }
  };

  return (
    <div className="min-h-screen lg:pl-60 bg-[#030917] text-slate-100 flex font-sans antialiased selection:bg-amber-400 selection:text-slate-950">
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <Header 
          user={user}
          onBackHome={onBackHome}
          onLogout={onLogout || onBackHome}
          onOpenSettings={() => setActiveTab('settings')}
          onOpenSupport={() => setActiveTab('support')}
        />

        <main className="p-4 sm:p-6 lg:p-7 space-y-6 max-w-[1600px] w-full mx-auto">
          {activeTab === 'dashboard' && (
            <>
              <HeroBanner 
                user={user}
                onDeposit={onDeposit || (() => notifySuccess('Deposit', 'Opening deposit portal.'))}
                onWithdraw={onWithdraw || (() => notifySuccess('Withdraw', 'Opening withdrawal request.'))}
              />

              <KpiCards user={user} fmt={fmt} />

              <MiddleGrid 
                portfolio={portfolio}
                user={user}
                fmt={fmt}
                onDeposit={onDeposit || (() => notifySuccess('Deposit', 'Opening deposit portal.'))}
                onWithdraw={onWithdraw || (() => notifySuccess('Withdraw', 'Opening withdrawal request.'))}
                onReinvest={onReinvest || (() => notifySuccess('Reinvest', 'Opening reinvestment window.'))}
                handleCopyLink={handleCopyLink}
                copied={copied}
                settings={settings}
                holidays={holidays}
              />

              <BottomGrid 
                user={user}
                fmt={fmt}
                cur={cur}
                reinvestAmount={reinvestAmount}
                setReinvestAmount={setReinvestAmount}
                handleConfirmReinvest={handleConfirmReinvest}
                onWithdraw={onWithdraw || (() => notifySuccess('Withdraw', 'Opening withdrawal request.'))}
                handleCopyLink={handleCopyLink}
                transactions={transactions}
                onEditProfile={() => setActiveTab('settings')}
              />
            </>
          )}

          {activeTab === 'investments' && (
            <UserInvestmentsView 
              portfolio={portfolio} 
              user={user} 
              fmt={fmt} 
              onDeposit={onDeposit} 
            />
          )}

          {activeTab === 'referral' && (
            <UserReferralView 
              user={user} 
              fmt={fmt} 
            />
          )}

          {activeTab === 'kyc' && (
            <UserKycView user={user} fetchKycProfile={fetchMyKycProfile} saveKycProfile={submitKycProfile} />
          )}

          {activeTab === 'notifications' && (
            <UserNotificationsView 
              user={user} 
              onNavigateTab={(tab) => setActiveTab(tab)} 
              onWithdraw={onWithdraw} 
              onDeposit={onDeposit} 
            />
          )}

          {activeTab === 'transactions' && (
            <UserTransactionsView 
              transactions={transactions} 
              fmt={fmt} 
            />
          )}

          {activeTab === 'deposit' && (
            <UserDepositView 
              user={user} 
              fmt={fmt} 
              cur={cur} 
              plans={plans}
              settings={settings}
            />
          )}

          {activeTab === 'withdraw' && (
            <div className="space-y-6">
              <div className="bg-[#051330] border border-[#173870] rounded-3xl p-6 shadow-xl">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">Payout Request</span>
                <h2 className="text-2xl font-black text-white mt-1">Withdrawal Portal</h2>
                <p className="text-slate-300 text-xs">Request withdrawals directly to your connected bank or crypto wallet.</p>
              </div>
              <div className="bg-[#051330] border border-[#173870] rounded-2xl p-6 shadow-xl text-center space-y-4">
                <p className="text-sm text-slate-300">Click below to open the secure withdrawal request modal.</p>
                <button
                  onClick={onWithdraw}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-black text-sm shadow-xl hover:brightness-110 transition"
                >
                  Open Withdrawal Modal ➔
                </button>
              </div>
            </div>
          )}

          {activeTab === 'reinvestment' && (
            <div className="space-y-6">
              <div className="bg-[#051330] border border-[#173870] rounded-3xl p-6 shadow-xl">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">Capital Growth</span>
                <h2 className="text-2xl font-black text-white mt-1">Reinvestment Manager</h2>
                <p className="text-slate-300 text-xs">Reinvest your profits instantly to compound your earnings.</p>
              </div>
              <div className="bg-[#051330] border border-[#173870] rounded-2xl p-6 shadow-xl space-y-4 max-w-xl">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Available Reinvestment Balance:</span>
                  <span className="text-emerald-400 font-bold">{fmt(user.reinvestment_balance)}</span>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Reinvestment Amount ({cur})</label>
                  <input
                    type="number"
                    value={reinvestAmount}
                    onChange={(e) => setReinvestAmount(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#030c1f] border border-[#173a78] rounded-xl text-white font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>
                <button
                  onClick={handleConfirmReinvest}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-sm shadow-xl hover:brightness-110 transition"
                >
                  Confirm Reinvestment ➔
                </button>
              </div>
            </div>
          )}

          {activeTab === 'support' && (
            <UserSupportView user={user} onLogin={onOpenLogin} settings={settings} />
          )}

          {activeTab === 'settings' && (
            <UserSettingsView user={user} onSaveProfile={handleSaveProfile} />
          )}
        </main>
      </div>
    </div>
  );
}

