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
      <header className={`clay-card px-4 pr-16 sm:px-6 sm:pr-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 min-h-14 transition-transform duration-300 ease-in-out border border-cyan-500/20 ${showHead ? 'translate-y-0' : '-translate-y-28'}`}>
        <div className="flex items-center gap-2 min-w-0">
          <button type="button" onClick={onBackHome} className="btn-neu-clay p-2 rounded-xl bg-slate-800/80 text-cyan-400 hover:text-white flex items-center justify-center shrink-0" title="Home">
            <Home className="w-4 h-4" />
          </button>
          <span className="text-slate-600 font-bold">/</span>
          <span className="text-xs font-black text-cyan-400 tracking-wide truncate">Dashboard</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="btn-neu-clay rounded-full">
            <NotificationCenter userId={user?.id} isAdmin={user?.role === 'admin'} onNavigate={onOpenSupport} />
          </div>

          {/* User Profile */}
          <div className="relative">
            <div 
              onClick={() => setDropdown(!dropdown)}
              className="btn-neu-clay flex items-center gap-2 bg-slate-900 border border-cyan-500/30 px-2.5 py-1.5 rounded-full cursor-pointer transition max-w-[9rem] sm:max-w-none"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 p-0.5 shadow-md shadow-cyan-500/20 overflow-hidden">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={user.name || 'Profile'} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-cyan-300 font-black text-xs">
                    {initials}
                  </div>
                )}
              </div>
              <div className="flex flex-col text-left leading-tight hidden sm:block">
                <div className="flex items-center space-x-1">
                  <span className="text-xs font-black text-white truncate max-w-[6rem]">{user.name}</span>
                  <ChevronDown className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-[10px] font-semibold text-cyan-400/90 font-mono">ID: {user.id}</span>
              </div>
            </div>

            {dropdown && (
              <div className="clay-card absolute right-0 mt-2 w-[min(88vw,18rem)] bg-slate-950/95 border border-cyan-500/30 rounded-2xl p-2.5 z-50 text-xs animate-scale-in shadow-2xl">
                <div className="px-3 py-2 border-b border-slate-800 text-slate-300">
                  <span className="font-bold text-white block truncate">{user.name}</span>
                  <span className="text-[10px] text-cyan-400 truncate block font-mono">{user.email}</span>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                    {user.role === 'admin' ? 'Administrator' : 'Verified User'}
                  </span>
                </div>
                <button onClick={() => { onOpenSettings?.(); setDropdown(false); }} className="w-full flex items-center space-x-2 text-left px-3 py-2 hover:bg-slate-800/80 rounded-xl text-slate-200 hover:text-cyan-300 font-semibold mt-1 transition-colors">
                  <User className="w-3.5 h-3.5 text-cyan-400" /><span>View Profile</span>
                </button>
                <button onClick={() => { onOpenSettings?.(); setDropdown(false); }} className="w-full flex items-center space-x-2 text-left px-3 py-2 hover:bg-slate-800/80 rounded-xl text-slate-200 hover:text-cyan-300 font-semibold transition-colors">
                  <Settings className="w-3.5 h-3.5 text-cyan-400" /><span>Edit Profile</span>
                </button>
                <button onClick={() => { onOpenSettings?.(); setDropdown(false); }} className="w-full flex items-center space-x-2 text-left px-3 py-2 hover:bg-slate-800/80 rounded-xl text-slate-200 hover:text-cyan-300 font-semibold transition-colors">
                  <Shield className="w-3.5 h-3.5 text-cyan-400" /><span>Account Settings</span>
                </button>
                <button onClick={() => { onOpenSettings?.(); setDropdown(false); }} className="w-full flex items-center space-x-2 text-left px-3 py-2 hover:bg-slate-800/80 rounded-xl text-slate-200 hover:text-cyan-300 font-semibold transition-colors">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" /><span>Change Password</span>
                </button>
                <button onClick={() => { onOpenSupport?.(); setDropdown(false); }} className="w-full flex items-center space-x-2 text-left px-3 py-2 hover:bg-slate-800/80 rounded-xl text-slate-200 hover:text-cyan-300 font-semibold transition-colors">
                  <Headphones className="w-3.5 h-3.5 text-cyan-400" /><span>Help & Support</span>
                </button>
                <button onClick={onLogout || onBackHome} className="w-full flex items-center space-x-2 text-left px-3 py-2 hover:bg-rose-950/40 rounded-xl text-rose-300 font-semibold transition-colors">
                  <LogOut className="w-3.5 h-3.5" /><span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Active Pill Badge */}
          <div className="btn-neu-clay px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 text-xs font-black flex items-center space-x-1.5 shadow">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <span>Active</span>
          </div>
        </div>
      </header>
    </div>
  );
}
