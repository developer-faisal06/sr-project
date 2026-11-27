// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { 
  Home, ChevronRight, User as UserIcon, LogOut,
  ChevronDown, Settings, Edit3, X, Save, Trash2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import NotificationCenter from '../NotificationCenter';
import { notifySuccess, notifyError } from '../../lib/notify';
import { updateProfileRecord } from '../../services/api';

const tabLabels = {
  withdrawals: 'Withdrawals Queue',
  locks: 'Lock Management',
  deposits: 'Deposit Review Queue',
  plans: 'Plan Management',
  users: 'User Management',
  'kyc-review': 'KYC Review',
  referral: 'Referral Network',
  payments: 'Payment Gateway',
  notice: 'Notice Bar',
  config: 'System Config',
  exposure: 'Commodity Exposure',
  'ai-support': 'Live Support Control',
  'support-messages': 'Support Messages',
  'support-tickets': 'Support Tickets',
  'support-customization': 'Support Customization',
  'support-builder': 'Support Center Builder',
  'support-faq': 'Support FAQ',
  inbox: 'Inbox'
};

export default function AdminTopNav({
  onBackHome,
  activeTab,
  setActiveTab,
  currentUser,
  onLogout,
  onUpdateUser
}) {
  const [userDropdown, setUserDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [adminProfileForm, setAdminProfileForm] = useState({
    name: currentUser?.name || 'Faisal Ahmed',
    email: currentUser?.email || 'mrfaisal795@gmail.com',
    phone: currentUser?.phone || '',
    password: ''
  });

  const currentTabName = tabLabels[activeTab] || 'Overview';
  const adminName = currentUser?.name || adminProfileForm.name;
  const adminEmail = currentUser?.email || adminProfileForm.email;
  const initials = adminName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'FA';
  const avatarUrl = currentUser?.avatar_url || currentUser?.avatarUrl;

  const handleClearCache = () => {
    try {
      // Preserve auth session keys so user/admin is not logged out
      const authKeys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.includes('auth') || key.includes('sr_auth') || key.includes('sb-') || key.includes('supabase'))) {
          authKeys.push({ key, value: localStorage.getItem(key) });
        }
      }

      localStorage.clear();
      sessionStorage.clear();

      // Restore auth keys
      authKeys.forEach(item => {
        if (item.value) localStorage.setItem(item.key, item.value);
      });

      if ('caches' in window) {
        caches.keys().then((names) => {
          names.forEach((name) => {
            caches.delete(name);
          });
        });
      }
      notifySuccess('Cache Purged!', 'Temporary caches purged successfully. Your active login session has been preserved.');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (e: any) {
      notifyError('Clear Cache Failed', e?.message || 'Could not purge browser cache.');
    }
  };
  const handleUpdateAdminProfile = async (e) => {
    e.preventDefault();
    setProfileSaving(true);
    try {
      const payload = {
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
      if (onUpdateUser) onUpdateUser(payload);
      notifySuccess('Profile Updated!', 'Admin profile details saved to database.');
      setShowProfileModal(false);
    } catch (err) {
      notifyError('Update Failed', err?.message || 'Could not update admin profile.');
    } finally {
      setProfileSaving(false);
    }
  };

  return (
    <div className='space-y-4'>
      <section className='bg-slate-900/90 backdrop-blur-md border border-cyan-500/20 rounded-2xl px-4 py-3 sm:px-6 sm:py-3.5 shadow-xl flex flex-wrap items-center justify-between gap-3'>
        <div className='flex items-center gap-2 sm:gap-3 text-xs font-semibold text-slate-300 flex-wrap'>
          <button 
            type='button'
            onClick={onBackHome} 
            className='flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-200 hover:text-amber-400 transition-colors shadow-sm cursor-pointer'
            title='Go to Homepage'
          >
            <Home className='w-4 h-4 text-amber-400' />
            <span className='hidden sm:inline'>Home</span>
          </button>
          <button 
            type='button'
            onClick={handleClearCache} 
            className='flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 transition-colors shadow-sm cursor-pointer'
            title='Purge All Cache & Storage'
          >
            <Trash2 className='w-4 h-4 text-rose-400' />
            <span className='hidden md:inline'>Clear Cache</span>
          </button>
          
          <ChevronRight className='w-4 h-4 text-slate-500' />
          <span className='text-slate-400'>Admin Portal</span>
          <ChevronRight className='w-4 h-4 text-slate-500' />
          
          <Badge variant='outline' className='border-cyan-400/40 bg-cyan-500/10 text-cyan-300 font-bold px-2.5 py-0.5 rounded-lg text-[11px]'>
            {currentTabName}
          </Badge>
          <Badge variant='outline' className='hidden lg:inline-flex border-amber-400/40 bg-amber-400/10 text-amber-300 text-[10px] font-black uppercase px-2 py-0.5 ml-2'>
            🛡️ Master Administrator
          </Badge>
        </div>

        <div className='flex items-center gap-3'>
          <div className='flex items-center'>
            <NotificationCenter 
              userId={currentUser?.id || 'admin'} 
              isAdmin 
              onNavigate={(type) => { 
                if (type === 'SUPPORT' || type === 'TICKET') setActiveTab('support-messages'); 
                if (type === 'INBOX') setActiveTab('inbox'); 
                if (type === 'WITHDRAWAL') setActiveTab('withdrawals'); 
              }} 
            />
          </div>

          <div className='relative'>
            <div 
              onClick={() => setUserDropdown(!userDropdown)}
              className='flex items-center gap-2.5 bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-amber-400/50 rounded-xl px-3 py-1.5 cursor-pointer transition shadow-md'
            >
              <div className='w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5 overflow-hidden flex items-center justify-center text-slate-950 font-black text-xs shadow-md'>
                {avatarUrl ? (
                  <img src={avatarUrl} alt={adminName} className='w-full h-full rounded-md object-cover' />
                ) : (
                  initials
                )}
              </div>
              <div className='hidden md:flex flex-col text-left leading-tight'>
                <span className='text-xs font-bold text-white'>{adminName}</span>
                <span className='text-[10px] text-amber-400/90 font-mono'>ID: {currentUser?.id?.slice(0, 6) || 'admin'}</span>
              </div>
              <Badge variant='outline' className='hidden sm:inline-flex border-amber-400/50 bg-amber-400/15 text-amber-300 text-[10px] font-black uppercase px-2 py-0.5 ml-1'>
                Admin
              </Badge>
              <ChevronDown className='w-3.5 h-3.5 text-slate-400 transition-transform duration-200' />
            </div>

            {userDropdown && (
              <div className='absolute right-0 mt-2 w-64 bg-[#051330] border border-[#173870] rounded-2xl p-2.5 z-50 text-xs shadow-2xl animate-fade-in divide-y divide-slate-800'>
                <div className='px-3 py-2.5 text-left'>
                  <p className='font-black text-white text-sm'>{adminName}</p>
                  <p className='text-[11px] text-slate-400 font-mono truncate'>{adminEmail}</p>
                  <span className='inline-block mt-1.5 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-amber-400/15 border border-amber-400/30 text-amber-300'>
                    Master Administrator
                  </span>
                </div>

                <div className='py-1.5 space-y-1'>
                  <button 
                    type='button'
                    onClick={() => { setShowProfileModal(true); setUserDropdown(false); }}
                    className='w-full flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-xl font-bold transition text-left cursor-pointer'
                  >
                    <Edit3 className='w-3.5 h-3.5 text-amber-400' />
                    <span>Edit Profile &amp; Basic Info</span>
                  </button>

                  <button 
                    type='button'
                    onClick={() => { setActiveTab('config'); setUserDropdown(false); }}
                    className='w-full flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-xl font-bold transition text-left cursor-pointer'
                  >
                    <Settings className='w-3.5 h-3.5 text-cyan-400' />
                    <span>System Settings</span>
                  </button>
                </div>

                <div className='pt-1.5'>
                  {onLogout && (
                    <button
                      type='button'
                      onClick={() => { setUserDropdown(false); onLogout(); }}
                      className='w-full flex items-center gap-2.5 px-3 py-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/15 rounded-xl font-bold transition text-left cursor-pointer'
                    >
                      <LogOut className='w-3.5 h-3.5' />
                      <span>Logout from Admin</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {showProfileModal && (
        <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in'>
          <div className='bg-[#051330] border-2 border-amber-400/40 rounded-3xl p-6 max-w-md w-full shadow-2xl relative text-left'>
            <div className='flex items-center justify-between pb-4 border-b border-slate-800'>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center'>
                  <UserIcon className='w-4 h-4' />
                </div>
                <div>
                  <h3 className='text-base font-black text-white'>Edit Admin Profile</h3>
                  <p className='text-[10px] text-slate-400'>Update basic info &amp; sync to database</p>
                </div>
              </div>
              <button 
                type='button' 
                onClick={() => setShowProfileModal(false)}
                className='w-8 h-8 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer'
              >
                <X className='w-4 h-4' />
              </button>
            </div>

            <form onSubmit={handleUpdateAdminProfile} className='space-y-4 pt-4 text-xs'>
              <div>
                <label className='text-slate-300 font-bold block mb-1'>Full Name</label>
                <input 
                  type='text' 
                  required 
                  value={adminProfileForm.name ?? ''} 
                  onChange={(e) => setAdminProfileForm(prev => ({ ...prev, name: e.target.value }))}
                  className='w-full px-3.5 py-2.5 rounded-xl bg-[#030a1a] border border-[#173b7d] text-white focus:outline-none focus:border-amber-400'
                  placeholder='Admin Name'
                />
              </div>

              <div>
                <label className='text-slate-300 font-bold block mb-1'>Email Address</label>
                <input 
                  type='email' 
                  required 
                  value={adminProfileForm.email ?? ''} 
                  onChange={(e) => setAdminProfileForm(prev => ({ ...prev, email: e.target.value }))}
                  className='w-full px-3.5 py-2.5 rounded-xl bg-[#030a1a] border border-[#173b7d] text-white focus:outline-none focus:border-amber-400'
                  placeholder='admin@srinvestment.com'
                />
              </div>

              <div>
                <label className='text-slate-300 font-bold block mb-1'>Phone Number</label>
                <input 
                  type='text' 
                  value={adminProfileForm.phone ?? ''} 
                  onChange={(e) => setAdminProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                  className='w-full px-3.5 py-2.5 rounded-xl bg-[#030a1a] border border-[#173b7d] text-white focus:outline-none focus:border-amber-400'
                  placeholder='+8801700000000'
                />
              </div>

              <div>
                <label className='text-slate-300 font-bold block mb-1'>Change Password (optional)</label>
                <input 
                  type='password' 
                  value={adminProfileForm.password ?? ''} 
                  onChange={(e) => setAdminProfileForm(prev => ({ ...prev, password: e.target.value }))}
                  className='w-full px-3.5 py-2.5 rounded-xl bg-[#030a1a] border border-[#173b7d] text-white focus:outline-none focus:border-amber-400'
                  placeholder='Leave blank to keep current'
                />
              </div>

              <div className='flex justify-end gap-3 pt-3 border-t border-slate-800'>
                <button 
                  type='button' 
                  onClick={() => setShowProfileModal(false)}
                  className='px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition cursor-pointer'
                >
                  Cancel
                </button>
                <button 
                  type='submit' 
                  disabled={profileSaving}
                  className='px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black shadow-lg hover:brightness-110 transition flex items-center gap-1.5 cursor-pointer'
                >
                  <Save className='w-3.5 h-3.5' />
                  <span>{profileSaving ? 'Saving...' : 'Save to Database'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
