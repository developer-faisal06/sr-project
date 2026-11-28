import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { notifySuccess, notifyWarning } from '../../lib/notify';
import Header from '../dashboard/Header';
import HeroBanner from '../dashboard/HeroBanner';
import CurrencyRatesBanner from '../dashboard/CurrencyRatesBanner';
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
import UserWithdrawView from '../dashboard/tabs/UserWithdrawView';
import { updateMyProfile, fetchMyKycProfile, submitKycProfile, fetchHolidays, subscribeToPlatformRealtime, subscribeToUserRealtime, updateProfileRecord, defaultPlans, fetchUserPayoutAccounts, saveUserPayoutAccount, deleteUserPayoutAccount, fetchPaymentGateways, fetchWithdrawalEligibility, fetchMyTransactions } from '../../services/api';

const MiddleGridComponent: any = MiddleGrid;
const BottomGridComponent: any = BottomGrid;

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
  const [reinvestAmount, setReinvestAmount] = useState('0');
  const [copied, setCopied] = useState(false);

  const [user, setUser] = useState(() => ({
    ...defaultDashboardUser,
    ...(userData || {})
  }));
  const [portfolio, setPortfolio] = useState(defaultPortfolio);
  const [transactions, setTransactions] = useState(defaultTransactions);
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    if (userData) {
      setUser(prev => ({
        ...prev,
        ...userData,
        name: userData.name || prev.name,
        email: userData.email || prev.email,
        id: userData.id || prev.id,
        phone: userData.phone !== undefined ? userData.phone : prev.phone,
        country: userData.country !== undefined ? userData.country : prev.country,
        avatar_url: userData.avatar_url !== undefined ? userData.avatar_url : prev.avatar_url,
        role: userData.role || prev.role,
        status: userData.status || prev.status,
        account_tier: userData.account_tier || prev.account_tier,
        currency: userData.currency || prev.currency,
        withdrawable_balance: Number(userData.balance ?? userData.withdrawable_balance ?? 0),
        active_investment: Number(userData.active_investment ?? 0),
        monthly_profit: Number(userData.monthly_profit ?? 0),
        monthly_profit_pct: Number(userData.monthly_profit_pct ?? 0),
        today_profit: Number(userData.today_profit ?? 0),
        total_profit: Number(userData.total_profit ?? userData.profit ?? 0),
        profit: Number(userData.profit ?? userData.total_profit ?? 0),
        referral: Number(userData.referral_earned ?? userData.referral ?? 0),
        referral_earned: Number(userData.referral_earned ?? userData.referral ?? 0),
        total_deposited: Number(userData.total_deposited ?? 0),
        locked_balance: Number(userData.locked_balance ?? userData.locked_deposit ?? 0),
        reinvestment_balance: Number(userData.reinvestment_balance ?? 0)
      }));
    }
  }, [userData]);

  useEffect(() => {
    const handleProfileSync = (event: any) => {
      const p = event?.detail;
      if (!p) return;
      setUser(prev => {
        const isMatch = (prev?.id && p.id && prev.id === p.id) ||
                        (prev?.email && p.email && prev.email.toLowerCase() === p.email.toLowerCase()) ||
                        (prev?.auth_user_id && p.auth_user_id && prev.auth_user_id === p.auth_user_id);
        if (!isMatch) return prev;
        return {
          ...prev,
          ...p,
          name: p.name || prev.name,
          phone: p.phone !== undefined ? p.phone : prev.phone,
          country: p.country !== undefined ? p.country : prev.country,
          avatar_url: p.avatar_url !== undefined ? p.avatar_url : prev.avatar_url,
          withdrawable_balance: Number(p.balance ?? p.withdrawable_balance ?? 0),
          active_investment: Number(p.active_investment ?? 0),
          monthly_profit: Number(p.monthly_profit ?? 0),
          monthly_profit_pct: Number(p.monthly_profit_pct ?? 0),
          today_profit: Number(p.today_profit ?? 0),
          total_profit: Number(p.total_profit ?? p.profit ?? 0),
          profit: Number(p.profit ?? p.total_profit ?? 0),
          referral: Number(p.referral_earned ?? p.referral ?? 0),
          referral_earned: Number(p.referral_earned ?? p.referral ?? 0),
          total_deposited: Number(p.total_deposited ?? 0),
          locked_balance: Number(p.locked_balance ?? p.locked_deposit ?? 0),
          reinvestment_balance: Number(p.reinvestment_balance ?? 0)
        };
      });
    };
    window.addEventListener('sr:profile-updated', handleProfileSync);
    return () => window.removeEventListener('sr:profile-updated', handleProfileSync);
  }, []);

  useEffect(() => {
    fetchHolidays().then(setHolidays).catch(() => {});
    const unsubscribePlatform = subscribeToPlatformRealtime({
      onHolidaysChange: () => fetchHolidays().then(setHolidays).catch(() => {})
    });
    async function loadData() {
      try {
        // Query by user.id or user.email directly from database
        const targetId = user?.id || userData?.id;
        const targetEmail = (user?.email || userData?.email)?.toLowerCase();
        
        let pData = null;
        if (targetId) {
          const { data } = await supabase.from('profiles').select('*').eq('id', targetId).maybeSingle();
          if (data) pData = data;
        }
        if (!pData && targetEmail) {
          const { data } = await supabase.from('profiles').select('*').eq('email', targetEmail).maybeSingle();
          if (data) pData = data;
        }
        if (!pData) {
          const { data: sessionData } = await supabase.auth.getSession();
          const authId = sessionData?.session?.user?.id;
          if (authId) {
            const { data } = await supabase.from('profiles').select('*').eq('auth_user_id', authId).maybeSingle();
            if (data) pData = data;
          }
        }

        if (pData) {
          setUser(prev => ({
            ...prev,
            ...pData,
            name: pData.name || prev.name,
            currency: pData.currency || prev.currency || '$',
            total_deposited: Number(pData.total_deposited ?? 0),
            active_investment: Number(pData.active_investment ?? pData.invested ?? pData.active_capital ?? 0),
            today_profit: Number(pData.today_profit ?? 0),
            total_profit: Number(pData.total_profit ?? pData.profit ?? 0),
            profit: Number(pData.profit ?? pData.total_profit ?? 0),
            monthly_profit: Number(pData.monthly_profit ?? 0),
            monthly_profit_pct: Number(pData.monthly_profit_pct ?? 0),
            referral: Number(pData.referral ?? pData.referral_earned ?? 0),
            referral_earned: Number(pData.referral_earned ?? pData.referral ?? 0),
            withdrawable_balance: Number(pData.withdrawable_balance ?? pData.balance ?? 0),
            reinvestment_balance: Number(pData.reinvestment_balance ?? 0),
            locked_balance: Number(pData.locked_balance ?? pData.locked_deposit ?? 0),
            locked_deposit: Number(pData.locked_deposit ?? pData.locked_balance ?? 0)
          }));
        }

        // Load active investments specifically for this user
        const currentUserId = targetId || user?.id;
        if (currentUserId) {
          try {
            const { data: invData } = await supabase.from('active_investments').select('*').eq('user_id', currentUserId);
            if (invData && invData.length > 0) {
              setPortfolio(invData.map((inv: any) => ({
                id: `INV-${inv.id}`,
                date_str: new Date(inv.start_date || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                amount: Number(inv.invested_amount || 0),
                current_value: Number(inv.invested_amount || 0) + Number(inv.profit || 0),
                rate_pct: parseFloat(inv.monthly_roi || '10'),
                profit: Number(inv.profit || 0),
                status: inv.status || 'Active'
              })));
            } else {
              setPortfolio([]);
            }
          } catch {
            setPortfolio([]);
          }

          const liveTxs = await fetchMyTransactions(currentUserId);
          setTransactions(liveTxs && liveTxs.length > 0 ? liveTxs : []);
        } else {
          setPortfolio([]);
          setTransactions([]);
        }
      } catch (err) {}
    }
    loadData();
    const unsubUser = user?.id ? subscribeToUserRealtime(user.id, {
      profile: (payload: any) => {
        if (payload?.new) {
          const u = payload.new;
          setUser(prev => ({
            ...prev,
            ...u,
            name: u.name || prev.name,
            phone: u.phone !== undefined ? u.phone : prev.phone,
            country: u.country !== undefined ? u.country : prev.country,
            currency: u.currency || prev.currency || '$',
            withdrawable_balance: Number(u.balance ?? u.withdrawable_balance ?? 0),
            active_investment: Number(u.active_investment ?? u.invested ?? u.active_capital ?? prev.active_investment ?? 0),
            monthly_profit: Number(u.monthly_profit ?? 0),
            monthly_profit_pct: Number(u.monthly_profit_pct ?? 0),
            today_profit: Number(u.today_profit ?? 0),
            total_profit: Number(u.total_profit ?? u.profit ?? 0),
            profit: Number(u.profit ?? u.total_profit ?? 0),
            referral: Number(u.referral_earned ?? u.referral ?? 0),
            referral_earned: Number(u.referral_earned ?? u.referral ?? 0),
            total_deposited: Number(u.total_deposited ?? 0),
            locked_balance: Number(u.locked_balance ?? u.locked_deposit ?? 0),
            reinvestment_balance: Number(u.reinvestment_balance ?? 0)
          }));
        }
      },
      transactions: async () => {
        const liveTxs = await fetchMyTransactions(user.id);
        if (liveTxs && liveTxs.length > 0) setTransactions(liveTxs);
      },
      orders: async () => {
        const liveTxs = await fetchMyTransactions(user.id);
        if (liveTxs && liveTxs.length > 0) setTransactions(liveTxs);
      },
      investments: async () => {
        try {
          const { data: invData } = await supabase.from('active_investments').select('*').eq('user_id', user.id);
          if (invData && invData.length > 0) {
            setPortfolio(invData.map((inv: any) => ({
              id: `INV-${inv.id}`,
              date_str: new Date(inv.start_date || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              amount: Number(inv.invested_amount || 0),
              current_value: Number(inv.invested_amount || 0) + Number(inv.profit || 0),
              rate_pct: parseFloat(inv.monthly_roi || '10'),
              profit: Number(inv.profit || 0),
              status: inv.status || 'Active'
            })));
          }
        } catch {}
      }
    }) : () => {};

    return () => {
      unsubscribePlatform();
      unsubUser();
    };
  }, [user?.id, userData?.id, userData?.email]);

  const cur = user.currency === 'BDT' ? '৳' : user.currency === 'EUR' ? '€' : '$';
  const fmt = (val) => `${cur}${Number(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const handleSaveProfile = async (profile) => {
    try {
      const payload = {
        ...user,
        ...profile,
        id: user.id
      };
      const updated = await updateMyProfile(payload);
      const resolved = updated || await updateProfileRecord(payload);
      if (resolved) {
        setUser((previous) => ({ ...previous, ...resolved }));
        try {
          window.dispatchEvent(new CustomEvent('sr:profile-updated', { detail: resolved }));
        } catch {}
      }
      return resolved;
    } catch (err: any) {
      console.warn('updateMyProfile/updateProfileRecord failed, saving direct to profiles:', err?.message);
      try {
        const { data, error } = await supabase.from('profiles').upsert({
          id: user.id,
          name: profile.name,
          phone: profile.phone || null,
          country: profile.country || null,
          avatar_url: profile.avatar_url || null,
          timezone: profile.timezone || null,
          currency: profile.currency || null,
          notification_preferences: profile.notification_preferences || null,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' }).select().maybeSingle();
        if (error) throw error;
        const finalData = data || { ...user, ...profile };
        setUser((previous) => ({ ...previous, ...finalData }));
        try {
          window.dispatchEvent(new CustomEvent('sr:profile-updated', { detail: finalData }));
        } catch {}
        return finalData;
      } catch (directErr) {
        const fallback = { ...user, ...profile };
        setUser(fallback);
        try {
          window.dispatchEvent(new CustomEvent('sr:profile-updated', { detail: fallback }));
        } catch {}
        return fallback;
      }
    }
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
    <div className="min-h-screen lg:pl-72 bg-[#030917] text-slate-100 flex font-sans antialiased selection:bg-amber-400 selection:text-slate-950">

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
                onDeposit={() => setActiveTab('deposit')}
                onWithdraw={() => setActiveTab('withdraw')}
              />

              {/* Dynamic Currency & Bullion Rates Showcase */}
              <CurrencyRatesBanner settings={settings} user={user} />

              <KpiCards user={user} fmt={fmt} />

              <MiddleGridComponent 
                portfolio={portfolio}
                user={user}
                fmt={fmt}
                onDeposit={() => setActiveTab('deposit')}
                onWithdraw={() => setActiveTab('withdraw')}
                onReinvest={() => setActiveTab('reinvestment')}
                onNavigateTab={(tab: string) => setActiveTab(tab)}
                handleCopyLink={handleCopyLink}
                copied={copied}
                settings={settings}
                holidays={holidays}
              />

              <BottomGridComponent settings={settings} 
                user={user}
                fmt={fmt}
                cur={cur}
                reinvestAmount={reinvestAmount}
                setReinvestAmount={setReinvestAmount}
                handleConfirmReinvest={handleConfirmReinvest}
                onWithdraw={() => setActiveTab('withdraw')}
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
              onDeposit={() => setActiveTab('deposit')} 
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
              onWithdraw={() => setActiveTab('withdraw')} 
              onDeposit={() => setActiveTab('deposit')} 
            />
          )}

          {(activeTab === 'transactions' || activeTab === 'recent-transactions') && (
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
            <UserWithdrawView
              user={user}
              fmt={fmt}
              cur={cur}
              settings={settings}
            />
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
                    value={(reinvestAmount ?? '')}
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
            <UserSettingsView user={user} onSaveProfile={handleSaveProfile} settings={settings} />
          )}
        </main>
      </div>
    </div>
  );
}

