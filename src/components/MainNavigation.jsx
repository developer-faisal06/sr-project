import React, { useEffect, useMemo, useState } from 'react';
import {
  Menu, X, Home, Info, LineChart, Layers, ShieldCheck, LayoutDashboard, TrendingUp,
  Users, Bell, ArrowLeftRight, Download, Upload, RefreshCw, Headphones, Settings,
  LogOut, Clock, CreditCard, Wallet, Bot, MessagesSquare, Inbox, Sliders, LayoutPanelTop,
  Activity, Megaphone, ChevronRight, Shield
} from 'lucide-react';

const getNavPublicItems = (isLoggedIn, userRole) => {
  const base = [
    ['home', 'Home', Home],
    ['about', 'About', Info],
    ['markets', 'Markets', LineChart],
    ['plans', 'Plans', Layers],
    ['privacy', 'Privacy', ShieldCheck],
    ['terms', 'Terms', Shield],
    ['contact', 'Contact', Headphones]
  ];
  if (isLoggedIn) {
    if (userRole === 'admin') {
      base.splice(1, 0, ['admin', 'Admin Panel', Shield]);
    } else {
      base.splice(1, 0, ['dashboard', 'Dashboard', LayoutDashboard]);
    }
  }
  return base;
};
const userItems = [
  ['dashboard', 'Dashboard', LayoutDashboard], ['investments', 'My Investments', TrendingUp], ['referral', 'Referral', Users],
  ['kyc', 'KYC Verification', ShieldCheck], ['notifications', 'Notifications', Bell], ['transactions', 'Transactions', ArrowLeftRight],
  ['deposit', 'Deposit', Download], ['withdraw', 'Withdrawal', Upload], ['reinvestment', 'Reinvestment', RefreshCw],
  ['support', 'Support / Help Center', Headphones], ['settings', 'Settings', Settings]
];
const adminSections = [
  {
    title: 'OVERVIEW',
    items: [
      ['withdrawals', 'Withdrawals Queue', Clock],
      ['locks', 'Lock & Release Management', Shield],
      ['deposits', 'Deposit Review Queue', CreditCard]
    ]
  },
  {
    title: 'MANAGEMENT',
    items: [
      ['plans', 'Plan Management', Layers],
      ['users', 'User Management', Users],
      ['kyc-review', 'KYC Review', ShieldCheck],
      ['referral', 'Referral Network', Users],
      ['payments', 'Payment & QR Gateway', Wallet],
      ['notice', 'Notice Bar', Megaphone],
      ['config', 'System Configuration', Settings],
      ['exposure', 'Commodity Exposure', Activity]
    ]
  },
  {
    title: 'SUPPORT',
    items: [
      ['ai-support', 'Live Support Control', Bot],
      ['support-messages', 'Support Messages', MessagesSquare],
      ['support-tickets', 'Support Tickets', MessagesSquare],
      ['support-customization', 'Support Customization', Sliders],
      ['support-builder', 'Support Center Builder', LayoutPanelTop],
      ['support-faq', 'Support FAQ Content', MessagesSquare],
      ['inbox', 'Inbox', Inbox]
    ]
  }
];

export default function MainNavigation({ activePage, isLoggedIn, userRole, user, onNavigate, onOpenAuth, onLogout }) {
  const [open, setOpen] = useState(false);
  const [activeSubtab, setActiveSubtab] = useState(() => {
    try {
      return localStorage.getItem(userRole === 'admin' ? 'sr_admin_active_tab' : 'sr_user_active_tab') || (userRole === 'admin' ? 'withdrawals' : 'dashboard');
    } catch {
      return userRole === 'admin' ? 'withdrawals' : 'dashboard';
    }
  });
  const isAdminView = isLoggedIn && userRole === 'admin' && (activePage === 'admin' || activePage === 'dashboard');
  const isUserView = isLoggedIn && !isAdminView && activePage === 'dashboard';
  const desktopSidebar = isAdminView || isUserView;
  const items = isAdminView ? null : isUserView ? userItems : getNavPublicItems(isLoggedIn, userRole);
  const sections = isAdminView ? adminSections : null;
  const activeId = isAdminView || isUserView ? activeSubtab : activePage;

  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 30) {
        setShowNav(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 70) {
        setShowNav(false);
      } else if (currentScrollY < lastScrollY) {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  useEffect(() => {
    const close = (event) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);


  useEffect(() => { setOpen(false); }, [activePage, userRole]);
  useEffect(() => {
    const sync = (event) => { if (event.detail?.tab) setActiveSubtab(event.detail.tab); };
    window.addEventListener('sr:navigate-admin-tab', sync);
    window.addEventListener('sr:navigate-dashboard-tab', sync);
    return () => { window.removeEventListener('sr:navigate-admin-tab', sync); window.removeEventListener('sr:navigate-dashboard-tab', sync); };
  }, []);
  useEffect(() => {
    document.body.classList.toggle('sr-menu-locked', open);
    return () => document.body.classList.remove('sr-menu-locked');
  }, [open]);

  const navigate = (id) => {
    setOpen(false);
    setActiveSubtab(id);
    if (isAdminView) {
      localStorage.setItem('sr_admin_active_tab', id);
      window.dispatchEvent(new CustomEvent('sr:navigate-admin-tab', { detail: { tab: id } }));
    } else if (isUserView) {
      localStorage.setItem('sr_user_active_tab', id);
      window.dispatchEvent(new CustomEvent('sr:navigate-dashboard-tab', { detail: { tab: id } }));
    } else onNavigate(id);
  };

  const menu = useMemo(() => items ? items.map(([id, label, Icon]) => ({ id, label, Icon })) : [], [items]);
  const menuBtn = (id, label, Icon) => {
    const isActive = activeId === id;
    return (
      <button
        key={id}
        type="button"
        onClick={() => navigate(id)}
        className={`sr-menu-item btn-neu-clay flex w-full items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-left text-xs font-bold transition-all duration-200 whitespace-nowrap ${
          isActive
            ? 'btn-neu-clay-active'
            : 'text-slate-300 bg-slate-900/60 hover:bg-slate-800/80 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40'
        }`}
      >
        <span className="flex min-w-0 items-center gap-3">
          <Icon className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isActive ? 'text-white stroke-[2.5]' : 'text-cyan-400'}`} />
          <span className="whitespace-nowrap">{label}</span>
        </span>
        <ChevronRight className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${isActive ? 'text-white translate-x-0.5' : 'text-slate-500'}`} />
      </button>
    );
  };
  const panel = (
    <div className="flex h-full w-fit max-w-[88vw] flex-col gap-4 p-3.5 whitespace-nowrap">
      <div className="flex items-center justify-between gap-4 border-b border-cyan-500/20 pb-3">
        <button type="button" onClick={() => navigate(isAdminView ? 'dashboard' : 'home')} className="flex min-w-0 items-center gap-2.5 text-left group">
          <div className="flex h-9 w-9 shrink-0 items-end justify-center gap-1 rounded-xl bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-600 p-2 shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform"><i className="h-2 w-1 bg-slate-950 rounded-xs" /><i className="h-4 w-1 bg-slate-950 rounded-xs" /><i className="h-5 w-1 bg-slate-950 rounded-xs" /></div>
          <div className="flex flex-col whitespace-nowrap">
            <span className="text-sm font-black text-white leading-tight">SR <b className="text-cyan-400">INVESTMENT</b></span>
            <span className="text-[9px] font-bold text-cyan-300/80 uppercase tracking-widest">3D Neumorphic Portal</span>
          </div>
        </button>
        <button type="button" aria-label="Close navigation" onClick={() => setOpen(false)} className="sr-touch-target btn-neu-clay flex items-center justify-center rounded-xl bg-slate-800/80 border border-cyan-500/30 text-slate-300 hover:text-white lg:hidden"><X className="h-5 w-5" /></button>
      </div>
      <nav className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain pr-1">
        {sections ? sections.map((sec, idx) => (
          <div key={idx} className="space-y-1.5">
            <p className="px-3 pt-2 pb-1 text-[10px] font-black uppercase tracking-widest text-cyan-400/90">{sec.title}</p>
            {sec.items.map(([id, label, Icon]) => menuBtn(id, label, Icon))}
          </div>
        )) : menu.map(({ id, label, Icon }) => menuBtn(id, label, Icon))}
      </nav>
      <div className="shrink-0 space-y-2 border-t border-cyan-500/20 pt-3">
        {!isLoggedIn && <button type="button" onClick={() => { setOpen(false); onOpenAuth('login'); }} className="btn-neu-clay w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-xs font-black text-white shadow-lg shadow-cyan-500/25">Login / Register</button>}
        {isLoggedIn && <button type="button" onClick={onLogout} className="btn-neu-clay flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/15 px-3 py-2.5 text-xs font-bold text-rose-300 hover:bg-rose-500/25"><LogOut className="h-4 w-4" />Logout</button>}
      </div>
    </div>
  );

  return <>
    <button type="button" aria-label="Open main navigation" aria-expanded={open} onClick={() => setOpen(true)} className={`sr-main-nav-trigger sr-touch-target btn-neu-clay fixed right-3 top-3.5 z-[70] flex items-center justify-center rounded-xl border border-cyan-400/40 bg-slate-900/95 text-cyan-400 shadow-xl backdrop-blur transition-transform duration-300 ease-in-out ${showNav ? 'translate-y-0' : '-translate-y-20'} ${desktopSidebar ? 'lg:hidden' : '2xl:hidden sr-public-trigger'}`}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
    {desktopSidebar ? <aside className="sr-main-nav-desktop clay-sidebar fixed inset-y-0 left-0 z-50 hidden w-fit min-w-[240px] max-w-[320px] lg:block overflow-y-auto">{panel}</aside> : <header className={`sr-main-nav-public sticky top-0 z-50 border-b border-cyan-500/20 bg-slate-950/90 backdrop-blur-md transition-transform duration-300 ease-in-out ${showNav ? 'translate-y-0' : '-translate-y-full'}`}><div className="mx-auto flex min-h-16 max-w-[1440px] items-center justify-between gap-4 px-4 pr-16 sm:px-6 sm:pr-6 lg:px-8"><button type="button" onClick={() => navigate('home')} className="shrink-0 text-lg font-black text-white">SR <b className="text-cyan-400">INVESTMENT</b></button><nav className="hidden items-center gap-2 lg:flex">{menu.map(({ id, label, Icon }) => <button key={id} type="button" onClick={() => navigate(id)} className={`btn-neu-clay flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all duration-200 ${activeId === id ? 'btn-neu-clay-active' : 'text-slate-300 hover:bg-slate-800/80 hover:text-cyan-300'}`}>{Icon && <Icon className={`h-3.5 w-3.5 ${activeId === id ? 'text-white' : 'text-cyan-400'}`} />}{label}</button>)}</nav><div className="hidden shrink-0 lg:block">{isLoggedIn ? <button type="button" onClick={onLogout} className="btn-neu-clay rounded-xl border border-rose-500/40 bg-rose-500/15 px-3.5 py-2 text-xs font-bold text-rose-300 hover:bg-rose-500/25">Logout</button> : <button type="button" onClick={() => onOpenAuth('login')} className="btn-neu-clay rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-black text-white shadow-md shadow-cyan-500/25">Login</button>}</div></div></header>}
    <button type="button" aria-label="Close main navigation" onClick={() => setOpen(false)} className={`sr-main-nav-backdrop fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-sm ${open ? 'is-open' : ''}`} />
    <aside className={`sr-main-nav-drawer clay-sidebar fixed inset-y-0 left-0 z-[65] w-fit min-w-[260px] max-w-[88vw] shadow-2xl ${open ? 'is-open' : ''}`}>{panel}</aside>
  </>;
}
