import React, { useState } from 'react';
import { LogOut, User, Menu, X, Shield, CreditCard } from 'lucide-react';

export default function Navbar({ activePage, onNavigate, onOpenAuth, isLoggedIn, userRole, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'markets', label: 'Markets' },
    { id: 'plans', label: 'Plans' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'terms', label: 'Terms' },
    { id: 'contact', label: 'Contact' },
    ...(isLoggedIn
      ? (userRole === 'admin'
          ? [{ id: 'admin', label: 'Admin Panel', isAdmin: true }]
          : [{ id: 'dashboard', label: 'Dashboard' }])
      : []),
  ];


  return (
    <nav className="sticky top-0 z-50 bg-[#06132d]/95 backdrop-blur-md border-b border-[#173b7d]/60 shadow-xl">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-300 p-0.5 shadow-lg flex items-center justify-center">
              <div className="w-full h-full bg-[#06132d] rounded-[9px] flex items-end justify-center p-1.5 space-x-1">
                <div className="w-1.5 h-3 bg-amber-400 rounded-sm"></div>
                <div className="w-1.5 h-5 bg-amber-400 rounded-sm"></div>
                <div className="w-1.5 h-7 bg-amber-400 rounded-sm"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="text-xl font-black text-amber-400">SR</span>
                <span className="text-xl font-black text-white ml-1.5 uppercase">INVESTMENT</span>
              </div>
              <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-1.5 rounded w-fit">
                Gold &amp; Silver Focus
              </span>
            </div>
          </div>

          <div className="hidden xl:flex items-center space-x-1 text-sm font-semibold">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition-all ${
                  item.isAdmin
                    ? (activePage === 'admin' 
                        ? 'bg-amber-400 text-slate-950 font-black shadow-lg' 
                        : 'bg-amber-400/10 border border-amber-400/40 text-amber-300 font-bold hover:bg-amber-400 hover:text-slate-950')
                    : (activePage === item.id ? 'bg-amber-400 text-slate-950 font-black shadow-md' : 'text-slate-200 hover:text-amber-400')
                }`}
              >
                {item.isAdmin && <Shield className="w-3.5 h-3.5 text-amber-400" />}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center space-x-2">
            {isLoggedIn ? (
              <button onClick={onLogout} className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-rose-600/20 border border-rose-500/40 text-rose-300 text-xs font-bold">
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            ) : (
              <button onClick={() => onOpenAuth('login')} className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 text-xs font-extrabold shadow-md">
                <User className="w-3.5 h-3.5" />
                <span>Login / Register</span>
              </button>
            )}
          </div>

          <div className="xl:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-300 hover:text-amber-400">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#06132d] border-b border-[#173b7d] px-4 pt-2 pb-4 space-y-1 text-sm">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg font-bold flex items-center space-x-2 ${
                item.isAdmin 
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' 
                  : (activePage === item.id ? 'bg-amber-400 text-slate-950' : 'text-slate-200')
              }`}
            >
              {item.isAdmin && <Shield className="w-3.5 h-3.5 text-amber-400" />}
              <span>{item.label}</span>
            </button>
          ))}
          <div className="pt-2">
            {isLoggedIn ? (
              <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="w-full py-2 rounded bg-rose-600/20 text-rose-300 text-xs font-bold">
                Logout
              </button>
            ) : (
              <button onClick={() => { onOpenAuth('login'); setMobileMenuOpen(false); }} className="w-full py-2 rounded bg-amber-400 text-slate-950 text-xs font-bold">
                Login / Register
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}




