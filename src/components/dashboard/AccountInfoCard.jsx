import React from 'react';
import { ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';

export default function AccountInfoCard({ user, onEditProfile }) {
  const status = user.status || 'Active';
  const emailVerified = user.email_verified ?? Boolean(user.email_confirmed_at);
  const phoneVerified = user.phone_verified ?? false;

  const StatusRow = ({ ok, children }) => {
    const Icon = ok ? CheckCircle2 : XCircle;
    return (
      <div className={`flex items-center space-x-1 ${ok ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-slate-400 bg-slate-500/10 border-slate-500/20'} px-2 py-1 rounded-lg border`}>
        <Icon className="w-3 h-3" />
        <span>{children}</span>
      </div>
    );
  };

  return (
    <div className="bg-[#051330] border border-[#173870] rounded-2xl p-4 shadow-xl space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-[#143063]">
        <div className="flex items-center space-x-2 text-white font-bold text-sm">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Account Information</span>
        </div>
        <button 
          onClick={onEditProfile} 
          className="text-[11px] font-bold text-amber-400 hover:text-amber-300"
        >
          Edit Profile ➔
        </button>
      </div>

      <div className="grid grid-cols-12 gap-2 text-xs">
        <div className="col-span-7 space-y-1.5 text-slate-300">
          <div className="flex"><span className="w-20 text-slate-400">Full Name</span>: <strong className="text-white ml-1 font-semibold">{user.name}</strong></div>
          <div className="flex"><span className="w-20 text-slate-400">User ID</span>: <strong className="text-amber-400 ml-1 font-mono font-bold">{user.id}</strong></div>
          <div className="flex"><span className="w-20 text-slate-400">Email</span>: <span className="text-white ml-1 font-medium truncate">{user.email}</span></div>
          <div className="flex"><span className="w-20 text-slate-400">Phone</span>: <span className="text-white ml-1 font-medium">{user.phone}</span></div>
          <div className="flex"><span className="w-20 text-slate-400">Joined</span>: <span className="text-slate-300 ml-1">{user.reg_date || user.joined_date || '—'}</span></div>
          <div className="flex"><span className="w-20 text-slate-400">Role</span>: <span className="text-amber-300 ml-1 font-bold uppercase">{user.role || 'user'}</span></div>
          <div className="flex"><span className="w-20 text-slate-400">Tier</span>: <span className="text-slate-300 ml-1">{user.account_tier || 'PROSPECT'}</span></div>
        </div>

        <div className="col-span-5 flex flex-col justify-center space-y-2 text-[10px] font-bold">
          <div className="flex items-center space-x-1 text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Account Status: {status}</span>
          </div>
          <StatusRow ok={emailVerified}>{emailVerified ? 'Email Verified' : 'Email Unverified'}</StatusRow>
          <StatusRow ok={phoneVerified}>{phoneVerified ? 'Phone Verified' : 'Phone Unverified'}</StatusRow>
        </div>
      </div>
    </div>
  );
}
