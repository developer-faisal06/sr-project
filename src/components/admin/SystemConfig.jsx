import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle } from 'lucide-react';
import { defaultSettings } from '../../services/api';
import { notifySuccess, notifyWarning } from '../../lib/notify';

export default function SystemConfig({ settings = defaultSettings, onSaveSettings }) {
  const [noticeText, setNoticeText] = useState(settings?.notice_text || defaultSettings.notice_text);
  const [minDeposit, setMinDeposit] = useState(settings?.min_deposit ?? 100);
  const [lvl1, setLvl1] = useState(settings?.lvl1_commission ?? 15);
  const [lvl2, setLvl2] = useState(settings?.lvl2_commission ?? 10);
  const [lvl3, setLvl3] = useState(settings?.lvl3_commission ?? 5);
  const [lvl4, setLvl4] = useState(settings?.lvl4_commission ?? 1);
  const [baseCurrency, setBaseCurrency] = useState(settings?.base_currency || 'USD');
  const [rates, setRates] = useState(settings?.exchange_rates || { USD: 1, BDT: 121.5, MYR: 4.7, EUR: 0.92 });
  
  // SMTP & SMS Gateway states
  const [smtp, setSmtp] = useState(settings?.smtp_config || { host: 'smtp.gmail.com', port: 587, user: '', pass: '', fromEmail: '', fromName: 'SR Investment' });
  const [smsLocal, setSmsLocal] = useState(settings?.sms_local_config || { provider: 'twilio', apiKey: '', senderId: 'SRInvest', countryCode: 'BD' });
  const [smsIntl, setSmsIntl] = useState(settings?.sms_intl_config || { provider: 'vonage', apiKey: '', apiSecret: '', senderId: 'SRGlobal' });

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
      if (settings.smtp_config) setSmtp(settings.smtp_config);
      if (settings.sms_local_config) setSmsLocal(settings.sms_local_config);
      if (settings.sms_intl_config) setSmsIntl(settings.sms_intl_config);
      setToggles((previous) => ({ ...previous, ...Object.fromEntries(Object.keys(previous).map((key) => [key, settings[key] ?? previous[key]])) }));
    }
  }, [settings]);

  const commitSection = (sectionName, payload) => {
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
      smtp_config: smtp,
      sms_local_config: smsLocal,
      sms_intl_config: smsIntl,
      ...toggles,
      ...payload
    });
    setSaved(true);
    notifySuccess('Saved!', `${sectionName} updated successfully in database.`);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSaveAll = (e) => {
    e.preventDefault();
    commitSection('All Platform Settings');
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

        {/* Primary Currency Section */}
        <div className="bg-[#030a1a] p-4 rounded-xl border border-cyan-400/30 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-cyan-300 uppercase block">Primary Platform Currency</span>
            <button type="button" onClick={() => commitSection('Primary Currency', { base_currency: baseCurrency })} className="px-3 py-1 rounded bg-cyan-600 text-white font-bold text-[10px]">Update Primary Currency</button>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Select Default Base Currency</label>
            <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)} className="w-full p-2 rounded bg-[#071738] text-white text-xs border border-[#173b7d]">
              {Object.keys(rates).map((code) => <option key={code} value={code}>{code}</option>)}
            </select>
          </div>
        </div>

        {/* Multiple Currencies Section */}
        <div className="bg-[#030a1a] p-4 rounded-xl border border-cyan-400/30 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-cyan-300 uppercase block">Multiple Currencies Manager (Dynamic Addition)</span>
            <button type="button" onClick={() => commitSection('Currencies', { exchange_rates: rates, supported_currencies: Object.keys(rates) })} className="px-3 py-1 rounded bg-cyan-600 text-white font-bold text-[10px]">Update Currencies</button>
          </div>
          <div className="space-y-2">
            {Object.entries(rates).map(([curr, rate]) => (
              <div key={curr} className="flex items-center gap-2 bg-[#071738] p-2 rounded-lg border border-[#173b7d]">
                <span className="font-mono font-black text-amber-300 w-16">{curr}</span>
        {/* SMTP Gmail Configuration Section */}
        <div className="bg-[#030a1a] p-4 rounded-xl border border-indigo-400/30 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-indigo-300 uppercase block">SMTP Gmail Configuration</span>
            <button type="button" onClick={() => commitSection('SMTP Settings', { smtp_config: smtp })} className="px-3 py-1 rounded bg-indigo-600 text-white font-bold text-[10px]">Update SMTP</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] text-slate-400">
            <label>SMTP Host<input value={smtp.host} onChange={(e) => setSmtp(prev => ({ ...prev, host: e.target.value }))} className="w-full p-2 mt-1 rounded bg-[#071738] text-white text-xs border border-[#173b7d]" /></label>
            <label>SMTP Port<input type="number" value={smtp.port} onChange={(e) => setSmtp(prev => ({ ...prev, port: Number(e.target.value) }))} className="w-full p-2 mt-1 rounded bg-[#071738] text-white text-xs border border-[#173b7d]" /></label>
            <label>Gmail Username / Email<input value={smtp.user} onChange={(e) => setSmtp(prev => ({ ...prev, user: e.target.value }))} placeholder="admin@gmail.com" className="w-full p-2 mt-1 rounded bg-[#071738] text-white text-xs border border-[#173b7d]" /></label>
            <label>App Password / Secret<input type="password" value={smtp.pass} onChange={(e) => setSmtp(prev => ({ ...prev, pass: e.target.value }))} placeholder="16-char app password" className="w-full p-2 mt-1 rounded bg-[#071738] text-white text-xs border border-[#173b7d]" /></label>
            <label>From Email<input value={smtp.fromEmail} onChange={(e) => setSmtp(prev => ({ ...prev, fromEmail: e.target.value }))} placeholder="noreply@srinvestment.com" className="w-full p-2 mt-1 rounded bg-[#071738] text-white text-xs border border-[#173b7d]" /></label>
            <label>Sender Name<input value={smtp.fromName} onChange={(e) => setSmtp(prev => ({ ...prev, fromName: e.target.value }))} className="w-full p-2 mt-1 rounded bg-[#071738] text-white text-xs border border-[#173b7d]" /></label>
          </div>
        </div>
        {/* SMS Gateway & International SMS Gateway Section */}
        <div className="bg-[#030a1a] p-4 rounded-xl border border-purple-400/30 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-bold text-purple-300 uppercase block">SMS &amp; International SMS Gateways</span>
            <button type="button" onClick={() => commitSection('SMS Gateways', { sms_local_config: smsLocal, sms_intl_config: smsIntl })} className="px-3 py-1 rounded bg-purple-600 text-white font-bold text-[10px]">Update SMS Gateways</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 bg-[#071738] p-3 rounded-lg border border-[#173b7d]">
              <span className="font-bold text-amber-300 text-[11px] block">Local SMS Gateway (e.g. Twilio / BulkSMS BD)</span>
              <label className="text-[10px] text-slate-400 block">Provider<select value={smsLocal.provider} onChange={(e) => setSmsLocal(prev => ({ ...prev, provider: e.target.value }))} className="w-full p-1.5 mt-0.5 rounded bg-[#030a1a] text-white text-xs border border-[#173b7d]"><option value="twilio">Twilio</option><option value="bulksmsbd">BulkSMS BD</option><option value="custom">Custom HTTP</option></select></label>
              <label className="text-[10px] text-slate-400 block">API Key / Auth Token<input value={smsLocal.apiKey} onChange={(e) => setSmsLocal(prev => ({ ...prev, apiKey: e.target.value }))} className="w-full p-1.5 mt-0.5 rounded bg-[#030a1a] text-white text-xs border border-[#173b7d]" /></label>
              <label className="text-[10px] text-slate-400 block">Sender ID<input value={smsLocal.senderId} onChange={(e) => setSmsLocal(prev => ({ ...prev, senderId: e.target.value }))} className="w-full p-1.5 mt-0.5 rounded bg-[#030a1a] text-white text-xs border border-[#173b7d]" /></label>
              <label className="text-[10px] text-slate-400 block">Default Country Code<input value={smsLocal.countryCode} onChange={(e) => setSmsLocal(prev => ({ ...prev, countryCode: e.target.value }))} className="w-full p-1.5 mt-0.5 rounded bg-[#030a1a] text-white text-xs border border-[#173b7d]" /></label>
            </div>
            <div className="space-y-2 bg-[#071738] p-3 rounded-lg border border-[#173b7d]">
              <span className="font-bold text-cyan-300 text-[11px] block">International SMS Gateway (e.g. Vonage / MessageBird)</span>
              <label className="text-[10px] text-slate-400 block">Provider<select value={smsIntl.provider} onChange={(e) => setSmsIntl(prev => ({ ...prev, provider: e.target.value }))} className="w-full p-1.5 mt-0.5 rounded bg-[#030a1a] text-white text-xs border border-[#173b7d]"><option value="vonage">Vonage (Nexmo)</option><option value="messagebird">MessageBird</option><option value="infobip">Infobip</option></select></label>
              <label className="text-[10px] text-slate-400 block">API Key / Account SID<input value={smsIntl.apiKey} onChange={(e) => setSmsIntl(prev => ({ ...prev, apiKey: e.target.value }))} className="w-full p-1.5 mt-0.5 rounded bg-[#030a1a] text-white text-xs border border-[#173b7d]" /></label>
              <label className="text-[10px] text-slate-400 block">API Secret / Auth Token<input type="password" value={smsIntl.apiSecret} onChange={(e) => setSmsIntl(prev => ({ ...prev, apiSecret: e.target.value }))} className="w-full p-1.5 mt-0.5 rounded bg-[#030a1a] text-white text-xs border border-[#173b7d]" /></label>
              <label className="text-[10px] text-slate-400 block">Global Sender ID<input value={smsIntl.senderId} onChange={(e) => setSmsIntl(prev => ({ ...prev, senderId: e.target.value }))} className="w-full p-1.5 mt-0.5 rounded bg-[#030a1a] text-white text-xs border border-[#173b7d]" /></label>
            </div>
          </div>
        </div>
                <input type="number" step="0.0001" value={rate} onChange={(e) => { const val = Number(e.target.value); setRates(prev => ({ ...prev, [curr]: val })); }} className="w-32 p-1 rounded bg-[#030a1a] text-white font-bold text-xs" />
                <span className="text-slate-400 text-[10px]">vs 1 USD</span>
                {curr !== 'USD' && (
                  <button type="button" onClick={() => { const next = { ...rates }; delete next[curr]; setRates(next); }} className="ml-auto px-2 py-1 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">Remove</button>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 pt-1">
            <input id="new-curr-code" placeholder="Code (e.g. GBP)" className="p-2 rounded bg-[#071738] text-white font-bold text-xs uppercase w-28 border border-[#173b7d]" />
            <input id="new-curr-rate" type="number" step="0.0001" placeholder="Rate vs USD" className="p-2 rounded bg-[#071738] text-white font-bold text-xs w-36 border border-[#173b7d]" />
            <button type="button" onClick={() => {
              const codeEl = document.getElementById('new-curr-code');
              const rateEl = document.getElementById('new-curr-rate');
              const code = codeEl?.value.trim().toUpperCase();
              const rate = Number(rateEl?.value);
              if (!code || !rate || rate <= 0) { notifyWarning('Invalid Currency', 'Enter valid currency code and exchange rate.'); return; }
              setRates(prev => ({ ...prev, [code]: rate }));
              if (codeEl) codeEl.value = '';
              if (rateEl) rateEl.value = '';
              notifySuccess('Currency Added', `${code} added successfully.`);
            }} className="px-3 py-2 rounded-lg bg-cyan-600 text-white font-bold text-xs">+ Add Currency</button>
          </div>
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

