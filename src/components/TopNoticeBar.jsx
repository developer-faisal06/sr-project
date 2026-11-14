import React from 'react';
import { AlertTriangle, Sparkles } from 'lucide-react';

export default function TopNoticeBar({ settings }) {
  const text = settings?.notice_text || 'Demo mode only. No real deposits, investments, profit payments or withdrawals are processed.';
  const badge = settings?.notice_badge || 'DEMO MODE ONLY';
  const theme = settings?.notice_theme || 'gold';
  const visible = settings?.notice_visible !== false;

  if (!visible) return null;

  const getThemeClass = (th) => {
    switch (th) {
      case 'cyan':
        return 'from-cyan-600 via-blue-600 to-indigo-800 text-white border-cyan-400/40 shadow-blue-900/30';
      case 'crimson':
        return 'from-rose-600 via-red-600 to-amber-600 text-white border-rose-400/40 shadow-rose-900/30';
      case 'emerald':
        return 'from-emerald-600 via-teal-600 to-cyan-800 text-white border-emerald-400/40 shadow-emerald-900/30';
      case 'gold':
      default:
        return 'from-amber-500 via-yellow-400 to-amber-500 text-slate-950 border-amber-300/40 shadow-amber-500/20';
    }
  };

  return (
    <div className={`relative z-50 w-full py-2 px-3 sm:px-6 text-center text-xs font-black tracking-wide shadow-lg border-b bg-gradient-to-r flex items-center justify-center space-x-2.5 transition-all ${getThemeClass(theme)}`}>
      <span className="px-2 py-0.5 rounded-full bg-black/20 text-[10px] font-black uppercase tracking-wider flex items-center space-x-1.5 flex-shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
        <span>{badge}</span>
      </span>
      <span className="truncate max-w-4xl text-[11px] sm:text-xs">
        {text}
      </span>
    </div>
  );
}


