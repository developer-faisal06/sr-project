import React, { useState } from 'react';
import { 
  Users, DollarSign, Clock, CheckCircle2, ArrowLeft,
  Home, ChevronRight, User as UserIcon, Shield, LogOut, ExternalLink, Sparkles,
  ChevronDown, Settings, Edit3, X, Save, Lock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { notifySuccess, notifyError } from '../../lib/notify';
import { updateProfileRecord } from '../../services/api';
import UserManagement from './UserManagement';
import DailyProfitLogs from './DailyProfitLogs';


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
import AdminTopNav from './AdminTopNav';


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
  onRejectWithdrawal,
  currentUser,
  onLogout
}: any) {

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
  const [pendingConversationId, setPendingConversationId] = useState(null);
  React.useEffect(() => {
    const openSupport = (event) => { if (event.detail?.conversationId) { setPendingConversationId(event.detail.conversationId); setActiveTab('support-messages'); } };
    const openInbox = () => setActiveTab('inbox');
    window.addEventListener('sr:auto-open-support', openSupport);
    window.addEventListener('sr:auto-open-inbox', openInbox);
    return () => { window.removeEventListener('sr:auto-open-support', openSupport); window.removeEventListener('sr:auto-open-inbox', openInbox); };
  }, []);

  React.useEffect(() => {
    const navigateFromMain = (event) => { if (event.detail?.tab) setActiveTab(event.detail.tab); };
    window.addEventListener('sr:navigate-admin-tab', navigateFromMain);
    return () => window.removeEventListener('sr:navigate-admin-tab', navigateFromMain);
  }, []);

  const pendingCount = withdrawals.filter((w) => w.status === 'Pending').length;
  const totalCapital = users.reduce((acc, u) => acc + (u.invested || 0), 0);
  const totalApproved = withdrawals
    .filter((w) => w.status === 'Approved')
    .reduce((acc, w) => acc + (w.amount || 0), 0);

  const [userDropdown, setUserDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [adminProfileForm, setAdminProfileForm] = useState({
    name: currentUser?.name || 'Faisal Ahmed',
    email: currentUser?.email || 'mrfaisal795@gmail.com',
    phone: currentUser?.phone || '',
    password: ''
  });

  const handleUpdateAdminProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    try {
      const payload: any = {
        id: currentUser?.id || 'admin',
        name: adminProfileForm.name,
        email: adminProfileForm.email,
        phone: adminProfileForm.phone,
        role: 'admin'
      };
      if (adminProfileForm.password && adminProfileForm.password.trim().length >= 6) {
        payload.password = adminProfileForm.password.trim();
      }
      await updateProfileRecord(payload);
      if (onUpdateUser) {
        onUpdateUser(payload);
      }
      notifySuccess('Profile Updated!', 'Admin profile details saved to database.');
      setShowProfileModal(false);
    } catch (err: any) {
      notifyError('Update Failed', err?.message || 'Could not update admin profile.');
    } finally {
      setProfileSaving(false);
    }
  };

  const tabLabels: Record<string, string> = {

    'withdrawals': 'Withdrawals Queue',
    'locks': 'Lock Management',
    'deposits': 'Deposit Review Queue',
    'plans': 'Plan Management',
    'users': 'User Management',
    'kyc-review': 'KYC Review',
    'referral': 'Referral Network',
    'payments': 'Payment Gateway',
    'notice': 'Notice Bar',
    'config': 'System Config',
    'exposure': 'Commodity Exposure',
    'ai-support': 'Live Support Control',
    'support-messages': 'Support Messages',
    'support-tickets': 'Support Tickets',
    'support-customization': 'Support Customization',
    'support-builder': 'Support Center Builder',
    'support-faq': 'Support FAQ',
    'inbox': 'Inbox'
  };

  const currentTabName = tabLabels[activeTab] || 'Overview';
  const adminName = currentUser?.name || 'Faisal Ahmed';
  const adminEmail = currentUser?.email || 'mrfaisal795@gmail.com';
  const initials = adminName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || 'FA';

  return (
    <div className="min-h-[85vh] lg:pl-72 max-w-[1600px] mx-auto w-full overflow-x-hidden px-3 sm:px-6 lg:px-8 py-5 sm:py-7 space-y-6">
      
      {/* Top Navbar with Home Icon, Breadcrumb, Notification Center, and User Dropdown */}
      <AdminTopNav 
        onBackHome={onBackHome}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onLogout={onLogout}
        onUpdateUser={onUpdateUser}
      />

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

      {/* Main content is navigated by MainNavigation. */}
      <div className="min-w-0 space-y-6">
  
          {activeTab === 'withdrawals' && (
            <WithdrawalApproval withdrawals={withdrawals} onApprove={onApproveWithdrawal} onReject={onRejectWithdrawal} />
          )}

          {activeTab === 'profit-logs' && <DailyProfitLogs settings={settings} />}

          {activeTab === 'locks' && <LockManagement users={users} settings={settings} onSaveSettings={onSaveSettings} />}
          {activeTab === 'deposits' && <DepositManagement />}

          {activeTab === 'plans' && (
            <PlanManager plans={plans} onSavePlan={onSavePlan} onDeletePlan={onDeletePlan} />
          )}

          {activeTab === 'users' && (
            <UserManagement users={users} onToggleRole={onToggleRole} onToggleStatus={onToggleStatus} onCreateUser={onCreateUser} onUpdateUser={onUpdateUser} onDeleteUser={onDeleteUser} />
          )}

          {activeTab === 'kyc-review' && <KycManagement />}

          {activeTab === 'referral' && (
            <ReferralNetwork settings={settings} users={users} onSaveSettings={onSaveSettings} />
          )}

          {activeTab === 'payments' && (
            <PaymentGatewayManager gateways={gateways} onSaveGateway={onSaveGateway} />
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
  );
}






