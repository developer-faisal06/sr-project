import React, { useState } from 'react';
import { 
  Users, DollarSign, Clock, CheckCircle2, ArrowLeft, 
  Activity, Sliders, Gem, Megaphone, LayoutDashboard,
  Shield, CreditCard, ChevronRight, Menu, X, Bot, MessagesSquare
} from 'lucide-react';
import UserManagement from './UserManagement';
import WithdrawalApproval from './WithdrawalApproval';
import ExposureMonitor from './ExposureMonitor';
import SystemConfig from './SystemConfig';
import PlanManager from './PlanManager';
import NoticeManager from './NoticeManager';
import PaymentGatewayManager from './PaymentGatewayManager';
import ReferralNetwork from './ReferralNetwork';
import AiSupportControl from './AiSupportControl';
import SupportMessages from './SupportMessages';
import SupportTickets from './SupportTickets';
import SupportCustomization from './SupportCustomization';
import Inbox from './Inbox';
import NotificationCenter from '../NotificationCenter';
import SupportCenterBuilder from './SupportCenterBuilder';
import SupportFaqManager from './SupportFaqManager';
import LockManagement from './LockManagement';
import DepositManagement from './DepositManagement';
import KycManagement from './KycManagement';
import { fetchAdminUnreadCounts } from '../../services/api';

export default function AdminDashboard({ 
  onBackHome, 
  users, 
  withdrawals, 
  plans, 
  settings, 
  onSavePlan, 
  onDeletePlan, 
  onSaveSettings, 
  onToggleRole, 
  onToggleStatus, 
  onCreateUser, onUpdateUser, onDeleteUser,
  gateways,
  onSaveGateway,
  onApproveWithdrawal, 
  onRejectWithdrawal 
}) {
  const [activeTab, setActiveTab] = useState(() => {
    try {
      return localStorage.getItem('sr_admin_active_tab') || 'withdrawals';
    } catch {
      return 'withdrawals';
    }
  });

  React.useEffect(() => {
    try {
      if (activeTab) localStorage.setItem('sr_admin_active_tab', activeTab);
    } catch {}
  }, [activeTab]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingConversationId, setPendingConversationId] = useState(null);
  const [unreadCounts, setUnreadCounts] = useState({ messages: 0, tickets: 0, inbox: 0 });
  React.useEffect(() => { fetchAdminUnreadCounts().then(setUnreadCounts).catch(() => {}); const timer = setInterval(() => fetchAdminUnreadCounts().then(setUnreadCounts).catch(() => {}), 5000); return () => clearInterval(timer); }, []);
  React.useEffect(() => {
    const openSupport = (event) => { if (event.detail?.conversationId) { setPendingConversationId(event.detail.conversationId); setActiveTab('support-messages'); } };
    const openInbox = () => setActiveTab('inbox');
    window.addEventListener('sr:auto-open-support', openSupport);
    window.addEventListener('sr:auto-open-inbox', openInbox);
    return () => { window.removeEventListener('sr:auto-open-support', openSupport); window.removeEventListener('sr:auto-open-inbox', openInbox); };
  }, []);

  const pendingCount = withdrawals.filter((w) => w.status === 'Pending').length;
  const totalCapital = users.reduce((acc, u) => acc + (u.invested || 0), 0);
  const totalApproved = withdrawals
    .filter((w) => w.status === 'Approved')
    .reduce((acc, w) => acc + (w.amount || 0), 0);

  const menuItems = [
    { id: 'withdrawals', label: 'Withdrawals Queue', icon: Clock, badge: pendingCount > 0 ? pendingCount : null },
    { id: 'locks', label: 'Lock & Release Management', icon: Shield, count: users?.length ? undefined : null },
    { id: 'deposits', label: 'Deposit Review Queue', icon: CreditCard },
    { id: 'plans', label: 'Investment Plans', icon: Gem, count: plans?.length },
    { id: 'users', label: 'User Management', icon: Users, count: users?.length },
    { id: 'kyc-review', label: 'KYC Review', icon: Shield, count: users?.length },
    { id: 'referral', label: 'Referral Network', icon: Shield, count: users?.length },
    { id: 'payments', label: 'Payment & QR Gateway', icon: CreditCard },
    { id: 'notice', label: 'Notice Bar (Home)', icon: Megaphone },
    { id: 'exposure', label: 'Commodity Exposure', icon: Activity },
    { id: 'ai-support', label: 'Live Support Control', icon: Bot },
    { id: 'support-messages', label: 'Support Messages', icon: MessagesSquare, badge: unreadCounts.messages > 0 ? unreadCounts.messages : null },
    { id: 'support-tickets', label: 'Support Tickets', icon: MessagesSquare, badge: unreadCounts.tickets > 0 ? unreadCounts.tickets : null },
    { id: 'support-customization', label: 'Support Customization', icon: Sliders },
    { id: 'support-builder', label: 'Support Center Builder', icon: LayoutDashboard },
    { id: 'support-faq', label: 'Support FAQ Content', icon: MessagesSquare },
    { id: 'inbox', label: 'Inbox', icon: MessagesSquare, badge: unreadCounts.inbox > 0 ? unreadCounts.inbox : null }
  ];

  return (
    <div className="min-h-[85vh] max-w-[1550px] mx-auto w-full overflow-x-hidden px-2 sm:px-4 lg:px-6 py-4 sm:py-6">
      
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-[#071738] via-[#092252] to-[#040c1d] border-2 border-amber-400/40 rounded-2xl sm:rounded-3xl p-3 sm:p-5 mb-4 sm:mb-6 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg">
            FA
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <div>
                <h2 className="text-xl font-black text-white">SR Investment Control Center</h2>
                <p className="text-[10px] text-slate-400 mt-0.5">Master Admin Panel</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                SUPERUSER
              </span>
              <NotificationCenter isAdmin onNavigate={(type) => { if (type === 'SUPPORT' || type === 'TICKET') setActiveTab('support-messages'); if (type === 'INBOX') setActiveTab('inbox'); if (type === 'WITHDRAWAL') setActiveTab('withdrawals'); }} />
            </div>
            <p className="text-xs text-amber-300 font-mono mt-0.5">mrfaisal795@gmail.com</p>
          </div>
        </div>

        <button 
          onClick={onBackHome}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#030a1a] border border-amber-400/40 text-amber-300 hover:text-white text-xs font-bold transition-all shadow-md"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Trader View</span>
        </button>
      </div>

      {/* 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-[#071738] border border-[#173b7d] rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Total Traders</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-2xl font-black text-white mt-1 block">{users.length}</span>
        </div>
        <div className="bg-[#071738] border border-[#173b7d] rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Total Capital</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-black text-emerald-400 mt-1 block">${totalCapital}</span>
        </div>
        <div className="bg-[#071738] border border-[#173b7d] rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Pending Payouts</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-2xl font-black text-amber-400">{pendingCount}</span>
            {pendingCount > 0 && <span className="px-2 py-0.5 rounded-full bg-rose-600/30 text-rose-300 text-[10px] font-bold">Action Needed</span>}
          </div>
        </div>
        <div className="bg-[#071738] border border-[#173b7d] rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Total Approved</span>
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-2xl font-black text-cyan-400 mt-1 block">${totalApproved}</span>
        </div>
      </div>

      {/* Main Body: Sidebar + Active Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Sidebar */}
        <aside className={`lg:col-span-3 xl:col-span-3 bg-[#071738] border-2 border-[#173b7d] rounded-3xl p-3 sm:p-4 shadow-2xl space-y-1.5 transition-all ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="px-3 py-2 text-xs font-black text-amber-400 uppercase tracking-wider flex items-center space-x-2 border-b border-[#173b7d]/60 mb-2">
            <LayoutDashboard className="w-4 h-4" />
            <span>Navigation Menu</span>
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-lg shadow-amber-400/20' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${isActive ? 'bg-slate-950 text-white' : 'bg-rose-600 text-white'}`}>
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && !item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-[#030a1a] text-slate-400'}`}>
                      {item.count}
                    </span>
                  )}
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-500'}`} />
                </div>
              </button>
            );
          })}
        </aside>

        {/* Right Content Area */}
        <div className="min-w-0 lg:col-span-9 xl:col-span-9 space-y-6">
          {activeTab === 'withdrawals' && (
            <WithdrawalApproval withdrawals={withdrawals} onApprove={onApproveWithdrawal} onReject={onRejectWithdrawal} />
          )}

          {activeTab === 'locks' && <LockManagement users={users} />}
          {activeTab === 'deposits' && <DepositManagement />}

          {activeTab === 'plans' && (
            <PlanManager plans={plans} onSavePlan={onSavePlan} onDeletePlan={onDeletePlan} />
          )}

          {activeTab === 'users' && (
            <UserManagement users={users} onToggleRole={onToggleRole} onToggleStatus={onToggleStatus} onCreateUser={onCreateUser} onUpdateUser={onUpdateUser} onDeleteUser={onDeleteUser} />
          )}

          {activeTab === 'kyc-review' && <KycManagement />}

          {activeTab === 'referral' && (
            <ReferralNetwork users={users} onSaveSettings={onSaveSettings} />
          )}

          {activeTab === 'payments' && (
            <PaymentGatewayManager settings={settings} gateways={gateways} onSaveGateway={onSaveGateway} onSaveSettings={onSaveSettings} />
          )}

          {activeTab === 'notice' && (
            <NoticeManager settings={settings} onSaveSettings={onSaveSettings} />
          )}

          {activeTab === 'config' && (
            <SystemConfig settings={settings} onSaveSettings={onSaveSettings} />
          )}

          {activeTab === 'exposure' && <ExposureMonitor />}
          {activeTab === 'ai-support' && <AiSupportControl settings={settings} onSaveSettings={onSaveSettings} />}
          {activeTab === 'support-messages' && <SupportMessages initialConversationId={pendingConversationId} onConversationOpened={() => setPendingConversationId(null)} />}
          {activeTab === 'support-tickets' && <SupportTickets />}
          {activeTab === 'support-customization' && <SupportCustomization settings={settings} onSaveSettings={onSaveSettings} />}
          {activeTab === 'support-builder' && <SupportCenterBuilder settings={settings} onSaveSettings={onSaveSettings} />}
          {activeTab === 'support-faq' && <SupportFaqManager />}
          {activeTab === 'inbox' && <Inbox />}
        </div>

      </div>

    </div>
  );
}