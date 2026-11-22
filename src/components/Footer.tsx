import React from 'react';
import { ShieldCheck, Activity } from 'lucide-react';

export default function Footer({ onNavigate }: any) {
  return (
    <footer className="bg-[#020713] border-t border-amber-400/20 py-10 mt-auto text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="text-center md:text-left space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-500">
              SR INVESTMENT
            </h3>
            <p className="text-xs text-slate-300 max-w-md">
              Quantitative algorithmic desk focused on Gold (XAU/USD) &amp; Silver (XAG/USD) London &amp; New York sessions.
            </p>
          </div>

          <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Activity className="w-3.5 h-3.5" />
            <span>All Systems Operational (99.98% Uptime)</span>
          </div>
        </div>

        {/* Links Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-bold text-slate-300">
          <button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors cursor-pointer">
            Home Desk
          </button>
          <span className="text-slate-700">|</span>
          <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors cursor-pointer">
            About Our Desk
          </button>
          <span className="text-slate-700">|</span>
          <button onClick={() => onNavigate('markets')} className="hover:text-amber-400 transition-colors cursor-pointer">
            Live Markets
          </button>
          <span className="text-slate-700">|</span>
          <button onClick={() => onNavigate('plans')} className="hover:text-amber-400 transition-colors cursor-pointer">
            Investment Plans
          </button>
          <span className="text-slate-700">|</span>
          <button onClick={() => onNavigate('privacy')} className="hover:text-amber-400 transition-colors cursor-pointer">
            Privacy Policy
          </button>
          <span className="text-slate-700">|</span>
          <button onClick={() => onNavigate('terms')} className="hover:text-amber-400 transition-colors cursor-pointer">
            Terms &amp; Risk Policy
          </button>
          <span className="text-slate-700">|</span>
          <button onClick={() => onNavigate('contact')} className="hover:text-amber-400 transition-colors cursor-pointer">
            Desk Support
          </button>
        </div>

        {/* Risk Disclaimer */}
        <div className="pt-2 text-[11px] sm:text-xs text-slate-400 max-w-2xl mx-auto text-center leading-relaxed">
          Risk Disclosure: Simulated demonstration trading platform. Commodity and bullion trading involves market exposure and risks. Past performance does not guarantee future results.
        </div>

        <div className="text-[11px] text-slate-400 text-center flex items-center justify-center space-x-1">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>&copy; {new Date().getFullYear()} SR Investment Group. All rights reserved.</span>
        </div>

      </div>
    </footer>
  );
}

