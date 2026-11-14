import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle } from 'lucide-react';
import { defaultSettings } from '../../services/api';

export default function SystemConfig({ settings = defaultSettings, onSaveSettings }) {
  const [noticeText, setNoticeText] = useState(settings?.notice_text || defaultSettings.notice_text);
  const [minDeposit, setMinDeposit] = useState(settings?.min_deposit ?? 100);
  const [lvl1, setLvl1] = useState(settings?.lvl1_commission ?? 15);
  const [lvl2, setLvl2] = useState(settings?.lvl2_commission ?? 10);
  const [lvl3, setLvl3] = useState(settings?.lvl3_commission ?? 5);
  const [lvl4, setLvl4] = useState(settings?.lvl4_commission ?? 1);
  const [baseCurrency, setBaseCurrency] = useState(settings?.base_currency || 'USD');
  const [rates, setRates] = useState(settings?.exchange_rates || { USD: 1, BDT: 121.5, MYR: 4.7, EUR: 0.92 });
  const [toggles, setToggles] = useState({
    registration_enabled: settings?.registration_enabled ?? true,
    deposit_enabled: settings?.deposit_enabled ?? true,
    withdrawal_enabled: settings?.withdrawal_enabled ?? true,
    reinvestment_enabled: settings?.reinvestment_enabled ?? true,
    referral_enabled: settings?.referral_enabled ?? true,
    require_email_verification: settings?.require_email_verification ?? false,
    maintenance_mode: settings?.maintenance_mode ?? false,
    lock_policy_enabled: settings?.lock_policy_enabled ?? true
  });
  const [depositLockDays, setDepositLockDays] = useState(settings?.deposit_lock_working_days ?? 30);
  const [referralLockDays, setReferralLockDays] = useState(settings?.referral_lock_working_days ?? 45);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (settings) {
      setNoticeText(settings.notice_text || defaultSettings.notice_text);
      setMinDeposit(settings.min_deposit ?? 100);
      setLvl1(settings.lvl1_commission ?? 15);
      setLvl2(settings.lvl2_commission ?? 10);
      setLvl3(settings.lvl3_commission ?? 5);
      setLvl4(settings.lvl4_commission ?? 1);
      setDepositLockDays(settings.deposit_lock_working_days ?? 30);
      setReferralLockDays(settings.referral_lock_working_days ?? 45);
      setBaseCurrency(settings.base_currency || 'USD');
      setRates(settings.exchange_rates || { USD: 1, BDT: 121.5, MYR: 4.7, EUR: 0.92 });
      setToggles((previous) => ({ ...previous, ...Object.fromEntries(Object.keys(previous).map((key) => [key, settings[key] ?? previous[key]])) }));
    }
  }, [settings]);

  const handleSave = (e) => {
    e.preventDefault();
    onSaveSettings({
      notice_text: noticeText,
      min_deposit: minDeposit,
      lvl1_commission: lvl1,
      lvl2_commission: lvl2,
      lvl3_commission: lvl3,
      lvl4_commission: lvl4,
      deposit_lock_working_days: Number(depositLockDays),
      referral_lock_working_days: Number(referralLockDays),
      base_currency: baseCurrency,
      exchange_rates: rates,
      supported_currencies: Object.keys(rates),
      currency_converter_enabled: true,
      ...toggles
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-[#071738] border border-[#173b7d] rounded-2xl p-5 shadow-xl space-y-5">
      <div className="flex justify-between items-center pb-3 border-b border-[#173b7d]">
        <div className="flex items-center space-x-2">
          <Settings className="w-5 h-5 text-amber-400" />
          <h3 className="font-black text-white text-base">Platform &amp; Home Page Sync</h3>
        </div>
        {saved && (
          <span className="flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Updated Home Page!</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-4 text-xs">
        <div className="bg-[#030a1a] p-3 rounded-xl border border-[#173b7d] space-y-1">
          <label className="font-bold text-amber-400 block uppercase">Top Notice Bar Text (Home Header)</label>
          <input 
            type="text" required value={noticeText} onChange={(e) => setNoticeText(e.target.value)}
            className="w-full p-2 rounded bg-[#071738] border border-[#173b7d] text-white"
          />
        </div>

        <div className="bg-[#030a1a] p-3 rounded-xl border border-[#173b7d] space-y-1">
          <label className="font-bold text-slate-300 block">Minimum Deposit ($)</label>
          <input 
            type="number" min="10" value={minDeposit} onChange={(e) => setMinDeposit(Number(e.target.value))}
            className="w-full p-2 rounded bg-[#071738] border border-[#173b7d] text-white"
          />
        </div>

        <div className="bg-[#030a1a] p-3 rounded-xl border border-cyan-400/30 space-y-3">
          <span className="font-bold text-cyan-300 uppercase block">Currency Converter</span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)} className="p-2 rounded bg-[#071738] text-white text-xs"><option>USD</option><option>BDT</option><option>MYR</option><option>EUR</option></select>
            {Object.keys(rates).filter((code) => code !== 'USD').map((code) => <label key={code} className="text-[10px] text-slate-400">{code}<input type="number" step="0.0001" value={rates[code]} onChange={(e) => setRates((prev) => ({ ...prev, [code]: Number(e.target.value) }))} className="w-full p-2 rounded bg-[#071738] text-white text-xs" /></label>)}
          </div>
          <p className="text-[10px] text-slate-500">Rates are display-only. Base financial values remain in the platform currency.</p>
        </div>

        <div className="space-y-2">
          <span className="font-bold text-amber-300 uppercase block">Working-Day Lock Policy</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <label className="text-[10px] text-slate-400">Deposit &amp; profit lock (working days)<input type="number" min="0" value={depositLockDays} onChange={(e) => setDepositLockDays(e.target.value)} className="w-full p-2 mt-1 rounded bg-[#071738] text-white text-xs" /></label>
            <label className="text-[10px] text-slate-400">Referral commission lock (working days)<input type="number" min="0" value={referralLockDays} onChange={(e) => setReferralLockDays(e.target.value)} className="w-full p-2 mt-1 rounded bg-[#071738] text-white text-xs" /></label>
            <div className="rounded-lg bg-[#030a1a] border border-amber-400/20 p-2 text-[10px] text-slate-400">Working days: <strong className="text-emerald-300">Monday–Friday</strong><br />Saturday and Sunday are excluded. Day 0 is the first approved deposit date.</div>
          </div>
        </div>

        <div className="space-y-2">
          <span className="font-bold text-amber-300 uppercase block">Platform Controls</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{Object.entries(toggles).map(([key, value]) => <button type="button" key={key} onClick={() => setToggles((prev) => ({ ...prev, [key]: !value }))} className="flex justify-between items-center p-2 rounded-lg bg-[#030a1a] border border-[#173b7d] text-xs text-slate-300"><span>{key.replaceAll('_', ' ')}</span><span className={value ? 'text-emerald-400 font-black' : 'text-rose-400 font-black'}>{value ? 'ON' : 'OFF'}</span></button>)}</div>
        </div>

        <div className="space-y-2">
          <span className="font-bold text-amber-300 uppercase block">Referral Rates (Syncs with Home Pyramid)</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="bg-[#030a1a] p-2 rounded border border-[#173b7d]">
              <span className="text-[10px] text-slate-400 block">Level 1 (%)</span>
              <input type="number" value={lvl1} onChange={(e) => setLvl1(Number(e.target.value))} className="w-full p-1 rounded bg-[#071738] text-white font-bold text-center" />
            </div>
            <div className="bg-[#030a1a] p-2 rounded border border-[#173b7d]">
              <span className="text-[10px] text-slate-400 block">Level 2 (%)</span>
              <input type="number" value={lvl2} onChange={(e) => setLvl2(Number(e.target.value))} className="w-full p-1 rounded bg-[#071738] text-white font-bold text-center" />
            </div>
            <div className="bg-[#030a1a] p-2 rounded border border-[#173b7d]">
              <span className="text-[10px] text-slate-400 block">Level 3 (%)</span>
              <input type="number" value={lvl3} onChange={(e) => setLvl3(Number(e.target.value))} className="w-full p-1 rounded bg-[#071738] text-white font-bold text-center" />
            </div>
            <div className="bg-[#030a1a] p-2 rounded border border-[#173b7d]">
              <span className="text-[10px] text-slate-400 block">Level 4 (%)</span>
              <input type="number" value={lvl4} onChange={(e) => setLvl4(Number(e.target.value))} className="w-full p-1 rounded bg-[#071738] text-white font-bold text-center" />
            </div>
          </div>
        </div>

        <button type="submit" className="px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-black uppercase shadow-lg flex items-center space-x-1">
          <Save className="w-3.5 h-3.5" />
          <span>Save &amp; Update Home Page</span>
        </button>
      </form>
    </div>
  );
}

