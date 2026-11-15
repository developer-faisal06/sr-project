import React, { useState } from 'react';
import { ChevronDown, User, Settings, Shield, Headphones, LogOut, Home, SlidersHorizontal } from 'lucide-react';
import NotificationCenter from '../NotificationCenter';

export default function Header({
  user,
  onBackHome,
  onLogout,
  onOpenSettings,
  onOpenSupport
}) {
  const [dropdown, setDropdown] = useState(false);
  const initials = (user.name || 'User').split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
  const avatarUrl = user.avatar_url || user.avatarUrl;

  return (
    <header className="sticky top-0 z-40 bg-[#040d21]/95 backdrop-blur-md border-b border-[#142e61] px-3 pr-16 sm:px-6 sm:pr-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 shadow-lg min-h-14">
      <div className="flex items-center gap-2 min-w-0">

        <span className="sm:hidden text-sm font-black text-white whitespace-nowrap">SR <b className="text-amber-400">Investment</b></span>
        <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-400">
          <span>Portal</span>
          <span>/</span>
          <span className="text-amber-400 font-bold">Dashboard Overview</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
        <NotificationCenter userId={user?.id} isAdmin={user?.role === 'admin'} onNavigate={onOpenSupport} />

        {/* User Profile */}
        <div className="relative">
          <div 
            onClick={() => setDropdown(!dropdown)}
            className="flex items-center gap-2 bg-[#07193d] hover:bg-[#0a2354] border border-[#173a78] px-2 py-1.5 rounded-full cursor-pointer transition shadow max-w-[9rem] sm:max-w-none"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 p-0.5 shadow overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl} alt={user.name || 'Profile'} className="w-full h-full rounded-full object-cover" />
              ) : (
                <div className="w-full h-full rounded-full bg-[#07193d] flex items-center justify-center text-amber-300 font-black text-xs">
                  {initials}
                </div>
              )}
            </div>
            <div className="flex flex-col text-left leading-tight hidden sm:block">
              <div className="flex items-center space-x-1">
                <span className="text-xs font-black text-white truncate max-w-[5rem]">{user.name}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <span className="text-[10px] font-semibold text-amber-300/90 font-mono">ID: {user.id}</span>
            </div>
          </div>

          {dropdown && (
            <div className="absolute right-0 mt-2 w-[min(88vw,18rem)] bg-[#07193d] border border-amber-400/40 rounded-xl shadow-2xl p-2 z-50 text-xs">
              <div className="px-2.5 py-1.5 border-b border-[#173a78] text-slate-300">
                <span className="font-bold text-white block truncate">{user.name}</span>
                <span className="text-[10px] text-slate-400 truncate block">{user.email}</span>
              </div>
              <button onClick={() => { onOpenSettings?.(); setDropdown(false); }} className="w-full flex items-center space-x-2 text-left px-2.5 py-1.5 hover:bg-[#0d2a66] rounded-md text-white font-semibold mt-1">
                <User className="w-3.5 h-3.5 text-amber-400" /><span>Profile Overview</span>
              </button>
              <button onClick={() => { onOpenSettings?.(); setDropdown(false); }} className="w-full flex items-center space-x-2 text-left px-2.5 py-1.5 hover:bg-[#0d2a66] rounded-md text-white font-semibold">
                <Settings className="w-3.5 h-3.5 text-amber-400" /><span>Profile Settings</span>
              </button>
              <button onClick={() => { onOpenSettings?.(); setDropdown(false); }} className="w-full flex items-center space-x-2 text-left px-2.5 py-1.5 hover:bg-[#0d2a66] rounded-md text-white font-semibold">
                <Shield className="w-3.5 h-3.5 text-amber-400" /><span>Security</span>
              </button>
              <button onClick={() => { onOpenSettings?.(); setDropdown(false); }} className="w-full flex items-center space-x-2 text-left px-2.5 py-1.5 hover:bg-[#0d2a66] rounded-md text-white font-semibold">
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" /><span>Notifications &amp; Preferences</span>
              </button>
              <button onClick={() => { onOpenSupport?.(); setDropdown(false); }} className="w-full flex items-center space-x-2 text-left px-2.5 py-1.5 hover:bg-[#0d2a66] rounded-md text-white font-semibold">
                <Headphones className="w-3.5 h-3.5 text-amber-400" /><span>Support Center</span>
              </button>
              <button onClick={() => { onBackHome?.(); setDropdown(false); }} className="w-full flex items-center space-x-2 text-left px-2.5 py-1.5 hover:bg-[#0d2a66] rounded-md text-amber-300 font-semibold">
                <Home className="w-3.5 h-3.5" /><span>Home Website</span>
              </button>
              <button onClick={onLogout || onBackHome} className="w-full flex items-center space-x-2 text-left px-2.5 py-1.5 hover:bg-rose-950/40 rounded-md text-rose-300 font-semibold">
                <LogOut className="w-3.5 h-3.5" /><span>Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* Active Pill Badge */}
        <div className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-xs font-black flex items-center space-x-1.5 shadow">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span>Active</span>
        </div>
      </div>
    </header>
  );
}
