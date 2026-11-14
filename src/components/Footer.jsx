import React from 'react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#030a1a] border-t border-[#173b7d]/60 py-10 mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        
        <div>
          <h3 className="text-xl font-black text-amber-400">SR Investment</h3>
          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
            Forex market activity focused on Gold (XAUUSD) and Silver (XAGUSD).
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-bold text-slate-400">
          <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">
            About Us
          </button>
          <span>·</span>
          <button onClick={() => onNavigate('privacy')} className="hover:text-amber-400 transition-colors">
            Privacy Policy
          </button>
          <span>·</span>
          <button onClick={() => onNavigate('terms')} className="hover:text-amber-400 transition-colors">
            Terms &amp; Conditions
          </button>
          <span>·</span>
          <button onClick={() => onNavigate('contact')} className="hover:text-amber-400 transition-colors">
            Contact
          </button>
        </div>

        {/* Disclaimer */}
        <div className="pt-2 text-xs text-slate-400 max-w-xl mx-auto">
          Demo website only. Trading involves risk; losses are possible. No return is guaranteed.
        </div>

        <div className="text-[11px] text-slate-400">
          &copy; {new Date().getFullYear()} SR Investment. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

