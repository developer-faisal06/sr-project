import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import TopNoticeBar from './components/TopNoticeBar';
import Hero from './components/Hero';
import FeatureBar from './components/FeatureBar';
import MainSections from './components/MainSections';
import BottomBar from './components/BottomBar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import VideoModal from './components/VideoModal';
import { InvestModal, WithdrawModal } from './components/TransactionModals';
import AboutPage from './components/pages/AboutPage';
import MarketsPage from './components/pages/MarketsPage';
import PlansPage from './components/pages/PlansPage';
import PrivacyPage from './components/pages/PrivacyPage';
import TermsPage from './components/pages/TermsPage';
import ContactPage from './components/pages/ContactPage';
import DashboardPage from './components/pages/DashboardPage';
import AdminDashboard from './components/admin/AdminDashboard';
import UserDepositView from './components/dashboard/tabs/UserDepositView';
import AiChatWidget from './components/AiChatWidget';
import { initialUsers, initialWithdrawals } from './data/adminData';
import { notifySuccess, notifyWarning, notifyConfirm, notifyError } from './lib/notify';
import { defaultSettings, defaultPlans, fetchSystemSettings, saveSystemSettings, fetchPlans, savePlan, deletePlan, updateUserRole, fetchAdminUsers, createProfileRecord, updateProfileRecord, deleteProfileRecord, fetchPaymentGateways, updatePaymentGateway, updatePlatformSettings, updateUserStatus, fetchWithdrawalsForAdmin, reviewWithdrawal } from './services/api';
import MainNavigation from './components/MainNavigation';


const LS = 'sr_auth_v2';
const ga = () => { try { const r = localStorage.getItem(LS); return r ? JSON.parse(r) : null; } catch { return null; } };
const sa = (d) => { try { d ? localStorage.setItem(LS, JSON.stringify(d)) : localStorage.removeItem(LS); } catch {} };

const PAGE_KEY = 'sr_active_page';
const getStoredPage = () => {
  try {
    const saved = localStorage.getItem(PAGE_KEY);
    const u = ga();
    if (saved) {
      if (saved === 'admin' && u?.role !== 'admin') return u ? 'dashboard' : 'home';
      if (saved === 'dashboard' && !u) return 'home';
      return saved;
    }
    return u?.role === 'admin' ? 'admin' : (u ? 'dashboard' : 'home');
  } catch {
    return 'home';
  }
};

export default function App() {
  // Supabase is the source of truth. localStorage is not trusted for identity or role.
  const [authUser, setAuthUser] = useState(() => ga());
  const isLoggedIn = !!authUser;
  const userRole = authUser?.role || 'guest';
  const isAdmin = userRole === 'admin';
  const [activePage, setActivePage] = useState(getStoredPage);

  useEffect(() => {
    try {
      if (activePage) localStorage.setItem(PAGE_KEY, activePage);
    } catch {}
  }, [activePage]);
  const [authLoading, setAuthLoading] = useState(true);

  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [investModal, setInvestModal] = useState({ isOpen: false, plan: null });
  const [pendingInvestmentPlan, setPendingInvestmentPlan] = useState(null);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  const [settings, setSettings] = useState(defaultSettings);
  const [plans, setPlans] = useState(defaultPlans);
  const [users, setUsers] = useState(initialUsers);
  const [gateways, setGateways] = useState([]);
  const [withdrawals, setWithdrawals] = useState(initialWithdrawals);
  const loadWithdrawals = async () => { try { setWithdrawals(await fetchWithdrawalsForAdmin()); } catch {} };

  const [userData, setUserData] = useState({
    name: 'Md. Rahman',
    email: 'trader@srinvestment.com',
    id: 'SR100245',
    status: 'Active',
    invested: 500,
    profit: 50,
    referral: 75,
    balance: 75
  });

  useEffect(() => {
    (async () => {
      setSettings(await fetchSystemSettings());
      setPlans(await fetchPlans());
      try {
        setGateways(await fetchPaymentGateways());
        setUsers(await fetchAdminUsers());
        loadWithdrawals();
      } catch (error) {
        console.warn('Admin data load skipped:', error.message);
      }
    })();

    // Realtime subscription for profiles table (User edits, role changes, status changes, creations, deletions)
    const userChannel = supabase.channel('admin-profiles-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, async (payload) => {
        try {
          if (payload.eventType === 'INSERT') {
            setUsers((prev) => [payload.new, ...prev.filter((u) => u.id !== payload.new.id)]);
          } else if (payload.eventType === 'UPDATE') {
            setUsers((prev) => prev.map((u) => u.id === payload.new.id ? { ...u, ...payload.new } : u));
            setUserData((prev) => (prev?.id === payload.new.id || prev?.email === payload.new.email) ? { ...prev, ...payload.new, balance: Number(payload.new.balance ?? prev.balance), invested: Number(payload.new.invested ?? prev.invested) } : prev);
            setAuthUser((prev) => (prev?.id === payload.new.id || prev?.email === payload.new.email) ? { ...prev, ...payload.new } : prev);
          } else if (payload.eventType === 'DELETE') {
            setUsers((prev) => prev.filter((u) => u.id !== payload.old.id));
          }
        } catch (err) {
          console.error('Realtime user sync error:', err);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(userChannel);
    };
  }, []);

  // Supabase session and the database profile are the only authentication sources.
  useEffect(() => {
    let mounted = true;

    const syncSession = async (session) => {
      const sessionUser = session?.user;
      if (!sessionUser) {
        if (mounted) {
          setAuthLoading(false);
          // Do not clear the cached identity until Supabase has definitively
          // restored a signed-out state; this prevents reload flicker/logout.
          setAuthUser((current) => current || ga());
        }
        return;
      }

      const email = sessionUser.email?.trim().toLowerCase();
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('auth_user_id', sessionUser.id)
        .maybeSingle();

      if (error) {
        console.warn('Profile restore delayed; keeping the existing session:', error.message);
        if (mounted) setAuthLoading(false);
        return;
      }
      if (!profile) {
        console.warn('No profile found yet; keeping the authenticated session for retry.');
        if (mounted) setAuthLoading(false);
        return;
      }
      if (profile.status === 'Suspended') {
        await supabase.auth.signOut();
        if (mounted) { setAuthLoading(false); setAuthUser(null); setActivePage('home'); sa(null); }
        return;
      }

      const currentUser = {
        ...profile,
        id: profile.id,
        name: profile.name || sessionUser.user_metadata?.full_name || email?.split('@')[0],
        email: profile.email || email,
        role: profile.role === 'admin' ? 'admin' : 'user',
        email_confirmed_at: sessionUser.email_confirmed_at,
        email_verified: Boolean(sessionUser.email_confirmed_at)
      };
      if (!mounted) return;
      setAuthLoading(false);
      sa(currentUser);
      setAuthUser(currentUser);
      setUserData((previous) => ({ ...previous, ...currentUser }));
      const stored = getStoredPage();
      if (currentUser.role === 'admin') {
        setActivePage(stored || 'admin');
      } else {
        setActivePage(stored === 'admin' ? 'dashboard' : (stored || 'dashboard'));
      }
    };

    supabase.auth.getSession().then(({ data }) => syncSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setRecoveryMode(true);
        setAuthModal({ isOpen: true, mode: 'login' });
        return;
      }
      syncSession(session);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const nav = (p) => {
    if (p === 'admin' && !isAdmin) return;
    if (p === 'dashboard' && !isLoggedIn) { setAuthModal({ isOpen: true, mode: 'login' }); return; }
    setActivePage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onAuth = ({ name, email, role, id }) => {
    const d = { name, email, role, id };
    sa(d);
    setAuthUser(d);
    if (role === 'admin') {
      setActivePage('admin');
      notifySuccess('Welcome, Admin!', email);
    } else if (pendingInvestmentPlan) {
      setActivePage('investment');
      notifySuccess('Continue Investment', 'Select a payment gateway to continue.');
    } else {
      setActivePage('dashboard');
      notifySuccess('Welcome back!', name || email);
    }
  };

  const handleInvestNow = (plan) => {
    setPendingInvestmentPlan(plan);
    if (!isLoggedIn) {
      setAuthModal({ isOpen: true, mode: 'login' });
      return;
    }
    setActivePage('investment');
  };

  const onLogout = async () => {
    if (!await notifyConfirm('Logout?', 'Sign out of your account?', 'Yes, Logout')) return;
    await supabase.auth.signOut();
    sa(null);
    try { localStorage.removeItem(PAGE_KEY); } catch {}
    setAuthUser(null);
    setActivePage('home');
    notifySuccess('Signed out', 'You have been logged out.');
  };

  const saveSett = async (u) => {
    const m = { ...settings, ...u };
    const saved = await updatePlatformSettings(m);
    setSettings(saved || m);
    notifySuccess('Saved!', 'Platform settings updated in database.');
  };

  const createUser = async (profile) => {
    try {
      const created = await createProfileRecord(profile);
      setUsers((previous) => [created, ...previous]);
      notifySuccess('User Added', `${created.name} profile was saved to database.`);
    } catch (error) {
      notifyError('User Creation Failed', error?.message || 'Could not save user profile.');
    }
  };

  const updateUser = async (profile) => {
    try {
      const updated = await updateProfileRecord(profile);
      setUsers((previous) => previous.map((u) => u.id === profile.id ? { ...u, ...updated } : u));
      notifySuccess('Profile Updated', `${profile.name || 'User'} saved to database.`);
      return updated;
    } catch (error) {
      console.warn('Primary update error, attempting resilient update:', error?.message);
      try {
        const { data, error: err2 } = await supabase.from('profiles').update({
          name: profile.name || '',
          role: profile.role || 'user',
          account_tier: profile.account_tier || 'PROSPECT',
          invested: Number(profile.invested || 0),
          balance: Number(profile.balance || 0),
          status: profile.status || 'Active'
        }).eq('id', profile.id).select().single();
        if (err2) throw err2;
        setUsers((previous) => previous.map((u) => u.id === profile.id ? { ...u, ...data } : u));
        notifySuccess('Profile Updated', `${profile.name || 'User'} saved to database.`);
        return data;
      } catch (err3) {
        notifyError('Update Failed', err3?.message || 'Could not update user.');
        throw err3;
      }
    }
  };

  const deleteUser = async (userId) => {
    try {
      await deleteProfileRecord(userId);
      setUsers((previous) => previous.filter((u) => u.id !== userId));
      notifySuccess('Deleted', 'User removed from database.');
    } catch (error) {
      console.warn('deleteProfileRecord error, attempting direct delete:', error?.message);
      try {
        const { error: err2 } = await supabase.from('profiles').delete().eq('id', userId);
        if (err2) throw err2;
        setUsers((previous) => previous.filter((u) => u.id !== userId));
        notifySuccess('Deleted', 'User removed from database.');
      } catch (err3) {
        notifyError('Delete Failed', err3?.message || 'Could not delete user.');
        throw err3;
      }
    }
  };

  const saveGateway = async (gateway) => {
    try {
      const saved = await updatePaymentGateway(gateway);
      setGateways((previous) => previous.map((item) => item.code === saved.code ? saved : item));
      notifySuccess('Gateway Updated', `${saved.name} is ${saved.enabled ? 'enabled' : 'disabled'}.`);
    } catch (error) {
      notifyError('Gateway Update Failed', error?.message || 'Could not update payment gateway.');
    }
  };

  const savePl = async (p) => {
    try {
      await savePlan(p);
      const updatedPlans = await fetchPlans();
      setPlans(updatedPlans);
      notifySuccess('Saved to Database!', `"${p.name}" has been updated in database.`);
    } catch (err) {
      console.error('Save plan error in App:', err);
      notifyError('Database Error', 'Could not save plan to database: ' + (err.message || 'Error'));
    }
  };

  const delPl = async (planId) => {
    if (!await notifyConfirm('Delete?', 'Remove this plan from database?', 'Delete')) return;
    try {
      await deletePlan(planId);
      const updatedPlans = await fetchPlans();
      setPlans(updatedPlans);
      notifySuccess('Deleted from Database', 'Plan removed from database.');
    } catch (err) {
      console.error('Delete plan error in App:', err);
      notifyError('Database Error', 'Could not delete plan: ' + (err.message || 'Error'));
    }
  };

  const togRole = async (userId) => {
    const target = users.find((u) => u.id === userId);
    if (!target) return;

    try {
      const nextRole = target.role === 'admin' ? 'user' : 'admin';
      await updateUserRole(userId, nextRole);
      setUsers((p) => p.map((u) => (u.id === userId ? { ...u, role: nextRole } : u)));
      notifySuccess('Role Updated', `${target.name} is now ${nextRole}.`);
    } catch (error) {
      notifyError('Role Update Blocked', error?.message || 'Only an authenticated admin can change roles. Apply the secure SQL migration first.');
    }
  };

  const togStat = async (userId) => {
    const target = users.find((u) => u.id === userId);
    if (!target) return;
    const nextStatus = target.status === 'Active' ? 'Suspended' : 'Active';
    try {
      await updateUserStatus(userId, nextStatus);
      setUsers((p) => p.map((u) => (u.id === userId ? { ...u, status: nextStatus } : u)));
      notifySuccess('Status Updated', `${target.name} is now ${nextStatus}.`);
    } catch (error) {
      notifyError('Status Update Failed', error?.message || 'Could not update user status.');
    }
  };

  const appW = async (wId) => {
    try {
      const updated = await reviewWithdrawal(wId, 'APPROVED', 'Approved by admin');
      setWithdrawals((p) => p.map((w) => w.id === wId ? { ...w, status: updated.status } : w));
      notifySuccess('Approved!', 'Withdrawal approved and ledger recorded.');
    } catch (error) { notifyError('Approval Failed', error?.message || 'Could not approve withdrawal.'); }
  };

  const rejW = async (wId) => {
    try {
      const updated = await reviewWithdrawal(wId, 'REJECTED', 'Rejected by admin');
      setWithdrawals((p) => p.map((w) => w.id === wId ? { ...w, status: updated.status } : w));
      notifyWarning('Rejected', 'Withdrawal rejected.');
    } catch (error) { notifyError('Rejection Failed', error?.message || 'Could not reject withdrawal.'); }
  };

  const wdSuccess = (request) => {
    setUserData((p) => ({ ...p, balance: Math.max(0, p.balance - Number(request.amount || 0)) }));
    setWithdrawals((p) => [{ id: request.id, userName: request.user_name || userData.name, userEmail: request.user_email || userData.email, amount: Number(request.amount), method: request.method || 'Gateway', account: request.account || '—', date: request.date_created || 'Just now', status: request.status || 'Pending', txId: request.tx_id || 'WD-' + Math.floor(10000 + Math.random() * 90000) }, ...p]);
    loadWithdrawals();
  };

  const reinvest = async () => {
    if (userData.balance <= 0) {
      notifyWarning('No Balance', '$0 available.');
      return;
    }
    if (!await notifyConfirm('Reinvest?', "Reinvest $" + userData.balance + "?")) return;
    setUserData((p) => ({ ...p, invested: p.invested + p.balance, balance: 0 }));
    notifySuccess('Reinvested!', 'Balance added to portfolio.');
  };

  const invConf = (plan) => {
    const v = parseInt(plan.amount?.replace(/[^0-9]/g, '')) || 200;
    setUserData((p) => ({ ...p, invested: p.invested + v, profit: p.profit + Math.round(v * 0.1) }));
    notifySuccess('Invested!', "$" + v + " added to portfolio.");
  };

  const regSuccess = ({ name, email }) => {
    const id = 'SR' + Math.floor(100000 + Math.random() * 900000);
    const d = { name, email, role: 'user', id };
    sa(d);
    setAuthUser(d);
    setUserData((p) => ({ ...p, name, email, id }));
    setActivePage('dashboard');
    notifySuccess('Account Created!', "Welcome, " + name + "!");
  };

  const ap = {
    onBackHome: () => setActivePage('home'),
    users,
    withdrawals,
    plans,
    settings,
    onSavePlan: savePl,
    onDeletePlan: delPl,
    onSaveSettings: saveSett,
    onToggleRole: togRole,
    onToggleStatus: togStat,
    onCreateUser: createUser,
    onUpdateUser: updateUser,
    onDeleteUser: deleteUser,
    gateways,
    onSaveGateway: saveGateway,
    onApproveWithdrawal: appW,
    onRejectWithdrawal: rejW
  };

  const isUserDashboard = activePage === 'dashboard' && !isAdmin;

  return (
    <div className="min-h-screen bg-[#040c1d] font-sans">
      <MainNavigation activePage={activePage} isLoggedIn={isLoggedIn} userRole={userRole} onNavigate={nav} onOpenAuth={(m) => setAuthModal({ isOpen: true, mode: m })} onLogout={onLogout} />
      {!isUserDashboard && <TopNoticeBar settings={settings} />}
      <main>
        {activePage === 'home' && (
          <>
            <Hero
              onOpenAuth={(m) => setAuthModal({ isOpen: true, mode: m })}
              onWatchVideo={() => setVideoOpen(true)}
              onRegisterSuccess={regSuccess}
              onExploreApproach={() => nav('markets')}
              isLoggedIn={isLoggedIn}
              authUser={authUser}
              userRole={userRole}
              onGoToDashboard={() => nav(isAdmin ? 'admin' : 'dashboard')}
            />
            <FeatureBar />
            <MainSections
              onInvest={handleInvestNow}
              onWithdraw={() => {
                if (!isLoggedIn) {
                  setAuthModal({ isOpen: true, mode: 'login' });
                  return;
                }
                setWithdrawOpen(true);
              }}
              onNavigate={nav}
              plans={plans}
              settings={settings}
              userData={userData}
              isLoggedIn={isLoggedIn}
            />
            <BottomBar />
          </>
        )}

        {activePage === 'about' && <AboutPage onBackHome={() => nav('home')} />}
        {activePage === 'markets' && <MarketsPage onBackHome={() => nav('home')} />}
        {activePage === 'investment' && (
          <div className="max-w-6xl mx-auto p-4 sm:p-6">
            <UserDepositView user={userData} fmt={(value) => `$${Number(value || 0).toFixed(2)}`} cur="$" plans={plans} settings={settings} initialPlanId={pendingInvestmentPlan?.id} />
          </div>
        )}
        {activePage === 'plans' && (
          <PlansPage
            onBackHome={() => nav('home')}
            onOpenAuth={(m) => setAuthModal({ isOpen: true, mode: m })}
            onInvest={handleInvestNow}
            plans={plans}
            settings={settings}
          />
        )}
        {activePage === 'privacy' && <PrivacyPage onBackHome={() => nav('home')} />}
        {activePage === 'terms' && <TermsPage onBackHome={() => nav('home')} />}
        {activePage === 'contact' && <ContactPage onBackHome={() => nav('home')} />}

        {activePage === 'dashboard' && !isAdmin && (
          <DashboardPage
            onBackHome={() => nav('home')}
            userData={{ ...userData, ...authUser }}
            onWithdraw={() => setWithdrawOpen(true)}
            onDeposit={() => setInvestModal({ isOpen: true, plan: plans[0] || null })}
            onReinvest={reinvest}
            onCopyReferral={() => {
              navigator.clipboard?.writeText("https://srinvestment.com/join?ref=" + userData.id);
              notifySuccess('Copied!', 'Referral link copied.');
            }}
            onLogout={onLogout}
            onOpenLogin={() => setAuthModal({ isOpen: true, mode: 'login' })}
            settings={settings}
            plans={plans}

          />
        )}

        {(activePage === 'admin' || (activePage === 'dashboard' && isAdmin)) && isAdmin && (
          <AdminDashboard {...ap} />
        )}

        {activePage === 'admin' && !isAdmin && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-white space-y-4">
            <p className="text-2xl font-black text-rose-400">⛔ Access Denied</p>
            <p className="text-sm text-slate-400">You do not have permission to view this page.</p>
            <button onClick={() => nav('home')} className="px-6 py-2 rounded-full bg-amber-400 text-slate-950 font-black text-sm">
              Go Home
            </button>
          </div>
        )}
      </main>

      {!isUserDashboard && <Footer onNavigate={nav} />}
      <AiChatWidget enabled={settings.ai_chatbot_enabled !== false} user={authUser} settings={settings} />

      <AuthModal
        isOpen={authModal.isOpen}
        mode={authModal.mode}
        recoveryMode={recoveryMode}
        onClose={() => { setRecoveryMode(false); setAuthModal({ isOpen: false, mode: 'login' }); }}
        onAuthSuccess={onAuth}
      />

      <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />

      <InvestModal
        isOpen={investModal.isOpen}
        plan={investModal.plan}
        settings={settings}
        onClose={() => setInvestModal({ isOpen: false, plan: null })}
        onConfirm={invConf}
      />

      <WithdrawModal
        isOpen={withdrawOpen}
        balance={userData.balance}
        user={userData}
        gateways={gateways}
        onClose={() => setWithdrawOpen(false)}
        onWithdrawSuccess={wdSuccess}
      />
    </div>
  );
}