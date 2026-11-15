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
  const [showHead, setShowHead] = useState(true);
  const [lastY, setLastY] = useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const curY = window.scrollY;
      if (curY < 30) {
        setShowHead(true);
      } else if (curY > lastY && curY > 60) {
        setShowHead(false);
        setDropdown(false);
      } else if (curY < lastY) {
        setShowHead(true);
      }
      setLastY(curY);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);
  const initials = (user.name || 'User').split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
  const avatarUrl = user.avatar_url || user.avatarUrl;

  return (
    <div className="sticky top-2 sm:top-3 z-40 px-2 sm:px-4 lg:px-6 w-full">
      <header className={`floating-header-3d bg-[#040d21]/85 border border-[#1b3f8a]/60 rounded-full px-4 pr-16 sm:px-6 sm:pr-6 py-2 sm:py-2.5 flex items-center justify-between gap-2 min-h-14 transition-transform duration-300 ease-in-out ${showHead ? 'translate-y-0' : '-translate-y-24'}`}>
        <div className="flex items-center gap-2 min-w-0">
          <span className="sm:hidden text-sm font-black text-white whitespace-nowrap">SR <b className="text-amber-400">Investment</b></span>
          <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-400">
            <span>Portal</span>
            <span>/</span>
            <span className="text-amber-400 font-bold">Dashboard Overview</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="btn-3d rounded-full">
            <NotificationCenter userId={user?.id} isAdmin={user?.role === 'admin'} onNavigate={onOpenSupport} />
          </div>

          {/* User Profile */}
          <div className="relative">
            <div 
              onClick={() => setDropdown(!dropdown)}
              className="btn-3d flex items-center gap-2 bg-gradient-to-r from-[#07193d] to-[#0a2354] border border-[#1b3f8a] px-2.5 py-1.5 rounded-full cursor-pointer transition max-w-[9rem] sm:max-w-none"
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
                  <span className="text-xs font-black text-white truncate max-w-[6rem]">{user.name}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <span className="text-[10px] font-semibold text-amber-300/90 font-mono">ID: {user.id}</span>
              </div>
            </div>

            {dropdown && (
              <div className="floating-header-3d absolute right-0 mt-2 w-[min(88vw,18rem)] bg-[#07193d]/95 border border-amber-400/40 rounded-2xl p-2 z-50 text-xs animate-scale-in">
                <div className="px-3 py-2 border-b border-[#173a78] text-slate-300">
                  <span className="font-bold text-white block truncate">{user.name}</span>
                  <span className="text-[10px] text-slate-400 truncate block">{user.email}</span>
                </div>
                <button onClick={() => { onOpenSettings?.(); setDropdown(false); }} className="w-full flex items-center space-x-2 text-left px-3 py-2 hover:bg-[#0d2a66] rounded-xl text-white font-semibold mt-1 transition-colors">
                  <User className="w-3.5 h-3.5 text-amber-400" /><span>Profile Overview</span>
                </button>
                <button onClick={() => { onOpenSettings?.(); setDropdown(false); }} className="w-full flex items-center space-x-2 text-left px-3 py-2 hover:bg-[#0d2a66] rounded-xl text-white font-semibold transition-colors">
                  <Settings className="w-3.5 h-3.5 text-amber-400" /><span>Profile Settings</span>
                </button>
                <button onClick={() => { onOpenSettings?.(); setDropdown(false); }} className="w-full flex items-center space-x-2 text-left px-3 py-2 hover:bg-[#0d2a66] rounded-xl text-white font-semibold transition-colors">
                  <Shield className="w-3.5 h-3.5 text-amber-400" /><span>Security</span>
                </button>
                <button onClick={() => { onOpenSettings?.(); setDropdown(false); }} className="w-full flex items-center space-x-2 text-left px-3 py-2 hover:bg-[#0d2a66] rounded-xl text-white font-semibold transition-colors">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" /><span>Notifications &amp; Preferences</span>
                </button>
                <button onClick={() => { onOpenSupport?.(); setDropdown(false); }} className="w-full flex items-center space-x-2 text-left px-3 py-2 hover:bg-[#0d2a66] rounded-xl text-white font-semibold transition-colors">
                  <Headphones className="w-3.5 h-3.5 text-amber-400" /><span>Support Center</span>
                </button>
                <button onClick={() => { onBackHome?.(); setDropdown(false); }} className="w-full flex items-center space-x-2 text-left px-3 py-2 hover:bg-[#0d2a66] rounded-xl text-amber-300 font-semibold transition-colors">
                  <Home className="w-3.5 h-3.5" /><span>Home Website</span>
                </button>
                <button onClick={onLogout || onBackHome} className="w-full flex items-center space-x-2 text-left px-3 py-2 hover:bg-rose-950/40 rounded-xl text-rose-300 font-semibold transition-colors">
                  <LogOut className="w-3.5 h-3.5" /><span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Active Pill Badge */}
          <div className="btn-3d px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-xs font-black flex items-center space-x-1.5 shadow">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span>Active</span>
          </div>
        </div>
      </header>
    </div>
  );
  );
}
