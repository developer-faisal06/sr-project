import React from 'react';
import { AlertCircle, AlertTriangle, Info, Sparkles, Bell } from 'lucide-react';

export default function TopNoticeBar({ settings }) {
  // Support both legacy notice fields and new SiteSettings requirements
  const text = settings?.global_notice_text || settings?.notice_text || 'Demo mode only. Institutional Gold & Commodity trading operates 24/5.';
  const visible = settings?.global_notice_visible !== undefined 
    ? settings.global_notice_visible 
    : (settings?.notice_visible !== false);
  const style = settings?.global_notice_style || settings?.notice_theme || 'warning';

  if (!visible) return null;

  const getStyleConfig = (s) => {
    switch (s) {
      case 'danger':
      case 'crimson':
        return {
          bg: 'from-rose-950 via-red-900 to-rose-950 text-rose-100 border-rose-500/40 shadow-rose-950/50',
          badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          badgeText: 'URGENT NOTICE',
          Icon: AlertCircle
        };
      case 'info':
      case 'cyan':
        return {
          bg: 'from-cyan-950 via-slate-900 to-blue-950 text-cyan-100 border-cyan-500/40 shadow-cyan-950/50',
          badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
          badgeText: 'MARKET ADVISORY',
          Icon: Info
        };
      case 'success':
      case 'emerald':
        return {
          bg: 'from-emerald-950 via-teal-900 to-emerald-950 text-emerald-100 border-emerald-500/40 shadow-emerald-950/50',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          badgeText: 'SYSTEM UPDATE',
          Icon: Sparkles
        };
      case 'warning':
      case 'gold':
      default:
        return {
          bg: 'from-amber-950/90 via-slate-900 to-yellow-950/90 text-amber-100 border-amber-500/40 shadow-amber-950/50',
          badge: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
          badgeText: 'GLOBAL NOTICE',
          Icon: AlertTriangle
        };
    }
  };

  const config = getStyleConfig(style);
  const IconComponent = config.Icon;

  return (
    // STRICTLY NON-STICKY: relative flow, scrolls out of view naturally
    <div className={`relative z-30 w-full py-2.5 px-3 sm:px-6 text-center text-xs font-bold shadow-lg border-b bg-gradient-to-r flex items-center justify-center gap-2.5 transition-all ${config.bg}`}>
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shrink-0 border ${config.badge}`}>
        <IconComponent className="w-3 h-3 animate-pulse" />
        <span>{config.badgeText}</span>
      </span>
      <span className="truncate max-w-4xl text-[11px] sm:text-xs text-slate-200">
        {text}
      </span>
    </div>
  );
}



