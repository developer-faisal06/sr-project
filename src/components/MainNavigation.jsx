import React, { useEffect, useMemo, useState } from 'react';
import {
  Menu, X, Home, Info, LineChart, Layers, ShieldCheck, LayoutDashboard, TrendingUp,
  Users, Bell, ArrowLeftRight, Download, Upload, RefreshCw, Headphones, Settings,
  LogOut, Clock, CreditCard, Wallet, Bot, MessagesSquare, Inbox, Sliders, LayoutPanelTop,
  Activity, Megaphone, ChevronRight, Shield
} from 'lucide-react';

const publicItems = [
  ['home', 'Home', Home], ['about', 'About', Info], ['markets', 'Markets', LineChart],
  ['plans', 'Plans', Layers], ['privacy', 'Privacy', ShieldCheck], ['terms', 'Terms', Shield], ['contact', 'Contact', Headphones]
];
const userItems = [
  ['dashboard', 'Dashboard', LayoutDashboard], ['investments', 'My Investments', TrendingUp], ['referral', 'Referral', Users],
  ['kyc', 'KYC Verification', ShieldCheck], ['notifications', 'Notifications', Bell], ['transactions', 'Transactions', ArrowLeftRight],
  ['deposit', 'Deposit', Download], ['withdraw', 'Withdrawal', Upload], ['reinvestment', 'Reinvestment', RefreshCw],
  ['support', 'Support / Help Center', Headphones], ['settings', 'Settings', Settings]
];
const adminItems = [
  ['withdrawals', 'Withdrawals Queue', Clock], ['locks', 'Lock & Release Management', Shield], ['deposits', 'Deposit Review Queue', CreditCard],
  ['plans', 'Plan Management', Layers], ['users', 'User Management', Users], ['kyc-review', 'KYC Review', ShieldCheck],
  ['referral', 'Referral Network', Users], ['payments', 'Payment & QR Gateway', Wallet], ['notice', 'Notice Bar', Megaphone],
  ['config', 'System Configuration', Settings], ['exposure', 'Commodity Exposure', Activity], ['ai-support', 'Live Support Control', Bot],
  ['support-messages', 'Support Messages', MessagesSquare], ['support-tickets', 'Support Tickets', MessagesSquare],
  ['support-customization', 'Support Customization', Sliders], ['support-builder', 'Support Center Builder', LayoutPanelTop],
  ['support-faq', 'Support FAQ Content', MessagesSquare], ['inbox', 'Inbox', Inbox]
];

export default function MainNavigation({ activePage, isLoggedIn, userRole, onNavigate, onOpenAuth, onLogout }) {
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
  const items = isAdminView ? adminItems : isUserView ? userItems : publicItems;
  const activeId = isAdminView || isUserView ? activeSubtab : activePage;

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

  const menu = useMemo(() => items.map(([id, label, Icon]) => ({ id, label, Icon })), [items]);
  const panel = (
    <div className="flex h-full flex-col gap-4 p-3.5">
      <div className="flex items-center justify-between gap-2 border-b border-[#17346d] pb-3">
        <button type="button" onClick={() => navigate(isAdminView ? 'dashboard' : 'home')} className="flex min-w-0 items-center gap-2 text-left">
          <div className="flex h-9 w-9 shrink-0 items-end justify-center gap-1 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-2 shadow-lg"><i className="h-2 w-1 bg-slate-950" /><i className="h-4 w-1 bg-slate-950" /><i className="h-5 w-1 bg-slate-950" /></div>
          <span className="truncate text-sm font-black text-white">SR <b className="text-amber-400">Investment</b></span>
        </button>
        <button type="button" aria-label="Close navigation" onClick={() => setOpen(false)} className="sr-touch-target flex items-center justify-center rounded-lg text-slate-400 hover:text-white lg:hidden"><X className="h-5 w-5" /></button>
      </div>
      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain">
        {menu.map(({ id, label, Icon }) => <button key={id} type="button" onClick={() => navigate(id)} className={`sr-menu-item flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-bold transition ${activeId === id ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 shadow-lg' : 'text-slate-300 hover:bg-[#0c224f] hover:text-white'}`}><span className="flex min-w-0 items-center gap-3"><Icon className={`h-4 w-4 shrink-0 ${activeId === id ? 'text-slate-950' : 'text-amber-400'}`} /><span className="break-words">{label}</span></span><ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" /></button>)}
      </nav>
      <div className="shrink-0 space-y-2 border-t border-[#17346d] pt-3">
        {!isLoggedIn && <button type="button" onClick={() => { setOpen(false); onOpenAuth('login'); }} className="w-full rounded-xl bg-amber-400 px-3 py-2.5 text-xs font-black text-slate-950">Login / Register</button>}
        {isLoggedIn && <button type="button" onClick={onLogout} className="flex w-full items-center gap-2 rounded-xl bg-rose-500/15 px-3 py-2.5 text-left text-xs font-bold text-rose-300"><LogOut className="h-4 w-4" />Logout</button>}
      </div>
    </div>
  );

  return <>
    <button type="button" aria-label="Open main navigation" aria-expanded={open} onClick={() => setOpen(true)} className="sr-main-nav-trigger sr-touch-target fixed left-3 top-3 z-[70] flex items-center justify-center rounded-xl border border-amber-400/40 bg-[#071738]/95 text-amber-300 shadow-xl backdrop-blur lg:hidden">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
    {desktopSidebar ? <aside className="sr-main-nav-desktop fixed inset-y-0 left-0 z-50 hidden w-60 border-r border-[#15346d] bg-gradient-to-b from-[#061433] via-[#05112b] to-[#030a1c] lg:block">{panel}</aside> : <header className="sr-main-nav-public sticky top-0 z-50 border-b border-[#173b7d]/60 bg-[#06132d]/95 backdrop-blur"><div className="mx-auto flex min-h-16 max-w-[1440px] items-center px-4"><span className="ml-12 text-lg font-black text-white">SR <b className="text-amber-400">INVESTMENT</b></span></div></header>}
    <button type="button" aria-label="Close main navigation" onClick={() => setOpen(false)} className={`sr-main-nav-backdrop fixed inset-0 z-[60] bg-slate-950/75 ${open ? 'is-open' : ''}`} />
    <aside className={`sr-main-nav-drawer fixed inset-y-0 left-0 z-[65] w-[min(86vw,320px)] bg-gradient-to-b from-[#061433] via-[#05112b] to-[#030a1c] shadow-2xl ${open ? 'is-open' : ''}`}>{panel}</aside>
  </>;
}
