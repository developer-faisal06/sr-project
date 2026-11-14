import React, { useState, useEffect } from 'react';
import { Megaphone, Eye, CheckCircle } from 'lucide-react';

export default function NoticeManager({ settings, onSaveSettings }) {
  const [text, setText] = useState(settings?.notice_text || 'Demo mode only. No real deposits, investments, profit payments or withdrawals are processed.');
  const [badge, setBadge] = useState(settings?.notice_badge || 'DEMO MODE ONLY');
  const [theme, setTheme] = useState(settings?.notice_theme || 'gold');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (settings) {
      if (settings.notice_text) setText(settings.notice_text);
      if (settings.notice_badge) setBadge(settings.notice_badge);
      if (settings.notice_theme) setTheme(settings.notice_theme);
    }
  }, [settings]);

  const handleSave = (e) => {
    e.preventDefault();
    onSaveSettings({ notice_text: text, notice_badge: badge, notice_theme: theme, notice_visible: true });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const getThemeClass = (th) => {
    if (th === 'cyan') return 'from-cyan-500 to-blue-600 text-white border-cyan-400';
    if (th === 'crimson') return 'from-rose-600 to-amber-600 text-white border-rose-400';
    if (th === 'emerald') return 'from-emerald-500 to-teal-700 text-white border-emerald-400';
    return 'from-amber-400 via-yellow-400 to-amber-500 text-slate-950 border-amber-300';
  };

  return (
    <div className="bg-[#071738] border border-[#173b7d] rounded-2xl p-5 shadow-xl space-y-4 text-xs">
      <div className="flex justify-between items-center pb-2 border-b border-[#173b7d]">
        <div className="flex items-center space-x-2">
          <Megaphone className="w-4 h-4 text-amber-400" />
          <h3 className="font-black text-white text-sm">Notice Bar Controller (Live Home Sync)</h3>
        </div>
        {saved && (
          <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
            <CheckCircle className="w-3 h-3" />
            <span>Updated Home Banner!</span>
          </span>
        )}
      </div>

      <div className="space-y-1">
        <span className="font-bold text-amber-400 flex items-center space-x-1"><Eye className="w-3.5 h-3.5" /><span>Live Banner Preview</span></span>
        <div className={`w-full py-2 px-3 rounded-xl font-bold flex items-center justify-center space-x-2 border bg-gradient-to-r ${getThemeClass(theme)}`}>
          <span className="px-2 py-0.5 rounded-full bg-black/25 text-[10px] font-black uppercase flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
            <span>{badge}</span>
          </span>
          <span className="truncate">{text}</span>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-3">
        <div>
          <label className="font-bold text-slate-300 block mb-1">Notice Message Text</label>
          <input type="text" required value={text} onChange={(e) => setText(e.target.value)} className="w-full p-2 rounded bg-[#030a1a] border border-[#173b7d] text-white" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="font-bold text-slate-300 block mb-1">Badge Tag</label>
            <input type="text" required value={badge} onChange={(e) => setBadge(e.target.value.toUpperCase())} className="w-full p-2 rounded bg-[#030a1a] border border-[#173b7d] text-white font-mono" />
          </div>
          <div>
            <label className="font-bold text-slate-300 block mb-1">Theme Gradient</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value)} className="w-full p-2 rounded bg-[#030a1a] border border-[#173b7d] text-white">
              <option value="gold">👑 Gold Luxury (Default)</option>
              <option value="cyan">💎 Cyber Neon Blue</option>
              <option value="emerald">🟢 Emerald Green</option>
              <option value="crimson">🔴 Crimson Alert</option>
            </select>
          </div>
        </div>

        <button type="submit" className="px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-black uppercase shadow-lg">
          Broadcast Notice to Website
        </button>
      </form>
    </div>
  );
}
