// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle } from 'lucide-react';
import { defaultSettings, sendEmailVerificationOtp } from '../../services/api';
import { notifySuccess, notifyWarning, notifyError } from '../../lib/notify';

export const GLOBAL_SMS_PROVIDERS = [
  { id: 'vonage', name: 'Vonage / Nexmo (Global Enterprise)' },
  { id: 'twilio', name: 'Twilio (Global SMS & Verify)' },
  { id: 'messagebird', name: 'MessageBird (Bird.com Global)' },
  { id: 'infobip', name: 'Infobip Global Omnichannel' },
  { id: 'plivo', name: 'Plivo Global Messaging' },
  { id: 'sinch', name: 'Sinch Enterprise SMS' },
  { id: 'telnyx', name: 'Telnyx Next-Gen Global SMS' },
  { id: 'clickatell', name: 'Clickatell Chat Commerce' },
  { id: 'bandwidth', name: 'Bandwidth Communications' },
  { id: 'textlocal', name: 'Textlocal Global & UK/India' },
  { id: 'routee', name: 'Routee Global Cloud Comm' },
  { id: 'telesign', name: 'TeleSign Mobile Identity & SMS' },
  { id: 'mitto', name: 'Mitto Global SMS Routing' },
  { id: 'kaleyra', name: 'Kaleyra (Tata Comm Global)' },
  { id: 'cmcom', name: 'CM.com Global Messaging' },
  { id: 'bulksms', name: 'BulkSMS International Gateway' },
  { id: 'tyntec', name: 'Tyntec Global Mobile Gateway' },
  { id: 'retarus', name: 'Retarus Enterprise Messaging' },
  { id: 'gatewayapi', name: 'GatewayAPI European & Global' },
  { id: 'sendinblue', name: 'Brevo / Sendinblue Transactional SMS' },
  { id: 'mailjet', name: 'Mailjet by Sinch SMS API' },
  { id: 'amazon_sns', name: 'Amazon Web Services (AWS) SNS' },
  { id: 'azure_comm', name: 'Microsoft Azure Communication Services' },
  { id: 'google_firebase', name: 'Firebase SMS Authentication / Cloud' },
  { id: 'bandwidth_global', name: 'Bandwidth Global Voice & SMS' },
  { id: 'clicksend', name: 'ClickSend Global Messaging' },
  { id: 'burstsms', name: 'Burst SMS / Whispir Global' },
  { id: 'textmagic', name: 'TextMagic Business SMS' },
  { id: 'broadnet', name: 'BroadNet International Gateway' },
  { id: 'cequens', name: 'Cequens MEA & Global SMS' },
  { id: 'unifonic', name: 'Unifonic Customer Engagement' },
  { id: 'silverstreet', name: 'Silverstreet Global Mobile Solutions' },
  { id: 'soprano', name: 'Soprano Design Mobile Enterprise' },
  { id: 'linkmobility', name: 'LINK Mobility Global Gateway' },
  { id: 'textanywhere', name: 'TextAnywhere Business Gateway' },
  { id: 'smsapi', name: 'SMSAPI Global European Gateway' },
  { id: 'messagemedia', name: 'MessageMedia Sinch Business SMS' },
  { id: 'tatacomm', name: 'Tata Communications Global SMS' },
  { id: 'montnets', name: 'Montnets International Gateway' },
  { id: 'smstrade', name: 'SMSTrade High-Performance Gateway' },
  { id: 'sipgate', name: 'Sipgate Transactional Cloud SMS' },
  { id: 'skebby', name: 'Skebby Enterprise SMS' },
  { id: 'smsfactor', name: 'SMSFactor European Platform' },
  { id: 'apifonica', name: 'Apifonica Cloud Communications' },
  { id: 'zenvia', name: 'Zenvia Latin America & Global' },
  { id: 'movile', name: 'Movile Latin America Messaging' },
  { id: 'orange_api', name: 'Orange Developer Global SMS API' },
  { id: 'vodafone_api', name: 'Vodafone Business Messaging Gateway' },
  { id: 'dialogic', name: 'Dialogic Enterprise Cloud Gateway' },
  { id: 'route_mobile', name: 'Route Mobile Global Gateway' },
  { id: 'gupshup', name: 'Gupshup Global Conversational SMS' },
  { id: 'vibes', name: 'Vibes Mobile Engagement Platform' },
  { id: 'aircall', name: 'Aircall Business Messaging' },
  { id: 'fast2sms', name: 'Fast2SMS International Gateway' }
];

export default function SystemConfig({ settings = defaultSettings, onSaveSettings }: any) {
  const [minDeposit, setMinDeposit] = useState(settings?.min_deposit ?? 100);
  const [baseCurrency, setBaseCurrency] = useState(settings?.base_currency || 'USD');
  const [rates, setRates] = useState(settings?.exchange_rates || { USD: 1, BDT: 121.5, MYR: 4.7, EUR: 0.92 });
  
  // Separate SMTP and 50+ International SMS Gateways
  const [smtp, setSmtp] = useState(settings?.smtp_config || {
    host: settings?.email_host || 'smtp.gmail.com',
    port: settings?.email_port || 587,
    user: settings?.email_from_email || 'demo.srinvestment@gmail.com',
    pass: settings?.email_provider_secret_name || 'demo-app-pass-1234',
    fromEmail: settings?.email_from_email || 'no-reply@srinvestment.com',
    fromName: settings?.email_from_name || 'SR INVESTMENT'
  });

  const [smsIntl, setSmsIntl] = useState(settings?.sms_intl_config || {
    provider: settings?.sms_provider || 'vonage',
    apiKey: (settings?.sms_provider_secret_name || 'demo_vonage_api_key_8849:demo_vonage_secret_992182').split(':')[0] || 'demo_vonage_api_key_8849',
    apiSecret: (settings?.sms_provider_secret_name || 'demo_vonage_api_key_8849:demo_vonage_secret_992182').split(':')[1] || 'demo_vonage_secret_992182',
    senderId: settings?.sms_sender_id || 'SRGlobal'
  });

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
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (settings) {
      setMinDeposit(settings?.min_deposit ?? 100);
      setBaseCurrency(settings?.base_currency || 'USD');
      setRates(settings?.exchange_rates || { USD: 1, BDT: 121.5, MYR: 4.7, EUR: 0.92 });
      if (settings?.smtp_config) setSmtp(settings?.smtp_config);
      if (settings?.sms_intl_config) setSmsIntl(settings?.sms_intl_config);
      setToggles((previous) => ({ ...previous, ...Object.fromEntries(Object.keys(previous).map((key) => [key, settings[key] ?? previous[key]])) }));
    }
  }, [settings]);

  const commitSection = (sectionName: string, payload: any) => {
    onSaveSettings({
      min_deposit: minDeposit,
      base_currency: baseCurrency,
      exchange_rates: rates,
      supported_currencies: Object.keys(rates),
      currency_converter_enabled: true,
      smtp_config: smtp,
      sms_intl_config: smsIntl,
      email_provider: 'smtp',
      email_host: smtp.host,
      email_port: smtp.port,
      email_from_name: smtp.fromName,
      email_from_email: smtp.fromEmail,
      email_provider_secret_name: smtp.pass,
      sms_provider: smsIntl.provider,
      sms_sender_id: smsIntl.senderId,
      sms_provider_secret_name: smsIntl.apiKey + ':' + smsIntl.apiSecret,
      ...toggles,
      ...payload
    });
    setSaved(true);
    notifySuccess('Saved!', String(sectionName) + ' updated successfully in database.');
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    commitSection('All Platform Settings', {});
  };

  return (
    <div className='bg-[#071738] border border-[#173b7d] rounded-2xl p-5 shadow-xl space-y-5'>
      <div className='flex justify-between items-center pb-3 border-b border-[#173b7d]'>
        <div className='flex items-center space-x-2'>
          <Settings className='w-5 h-5 text-amber-400' />
          <h3 className='font-black text-white text-base'>Platform System Settings</h3>
        </div>
        {saved && (
          <span className='flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold'>
            <CheckCircle className='w-3.5 h-3.5' />
            <span>Updated Successfully!</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSaveAll} className='space-y-4 text-xs'>
        <div className='bg-[#030a1a] p-3 rounded-xl border border-[#173b7d] space-y-1'>
          <label className='font-bold text-slate-300 block'>Minimum Deposit ($)</label>
          <input 
            type='number' min='10' value={(minDeposit ?? '')} onChange={(e) => setMinDeposit(Number(e.target.value))}
            className='w-full p-2 rounded bg-[#071738] border border-[#173b7d] text-white'
          />
        </div>

        {/* Currency Section 1: Primary Currency */}
        <div className='bg-[#030a1a] p-4 rounded-xl border border-cyan-400/30 space-y-3'>
          <div className='flex justify-between items-center'>
            <span className='font-bold text-cyan-300 uppercase block'>Primary Platform Currency</span>
            <button type='button' onClick={() => commitSection('Primary Currency', { base_currency: baseCurrency })} className='px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[10px] cursor-pointer'>Update Primary Currency</button>
          </div>
          <div>
            <label className='text-[10px] text-slate-400 block mb-1'>Select Default Base Currency</label>
            <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)} className='w-full p-2 rounded bg-[#071738] text-white text-xs border border-[#173b7d]'>
              {Object.keys(rates).map((code) => <option key={code} value={code}>{code}</option>)}
            </select>
          </div>
        </div>

        {/* Currency Section 2: Multiple Supported Currencies & Exchange Rates */}
        <div className='bg-[#030a1a] p-4 rounded-xl border border-cyan-400/30 space-y-3'>
          <div className='flex justify-between items-center'>
            <span className='font-bold text-cyan-300 uppercase block'>Multiple Currencies Manager (Exchange Rates)</span>
            <button type='button' onClick={() => commitSection('Currencies', { exchange_rates: rates, supported_currencies: Object.keys(rates) })} className='px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[10px] cursor-pointer'>Update Currencies</button>
          </div>
          <div className='space-y-2'>
            {Object.entries(rates).map(([curr, rate]) => (
              <div key={curr} className='flex items-center gap-2 bg-[#071738] p-2 rounded-lg border border-[#173b7d]'>
                <span className='font-mono font-black text-amber-300 w-16'>{curr}</span>
                <input type='number' step='0.0001' value={(rate as any ?? '')} onChange={(e) => { const val = Number(e.target.value); setRates(prev => ({ ...prev, [curr]: val })); }} className='w-32 p-1 rounded bg-[#030a1a] text-white font-bold text-xs' />
                <span className='text-slate-400 text-[10px]'>vs 1 USD</span>
                {curr !== 'USD' && (
                  <button type='button' onClick={() => { const next = { ...rates }; delete next[curr]; setRates(next); }} className='ml-auto px-2 py-1 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold cursor-pointer'>Remove</button>
                )}
              </div>
            ))}
          </div>
          <div className='flex items-center gap-2 pt-1'>
            <input id='new-curr-code' placeholder='Code (e.g. GBP)' className='p-2 rounded bg-[#071738] text-white font-bold text-xs uppercase w-28 border border-[#173b7d]' />
            <input id='new-curr-rate' type='number' step='0.0001' placeholder='Rate vs USD' className='p-2 rounded bg-[#071738] text-white font-bold text-xs w-36 border border-[#173b7d]' />
            <button type='button' onClick={() => {
              const codeEl = document.getElementById('new-curr-code');
              const rateEl = document.getElementById('new-curr-rate');
              const code = (codeEl as any)?.value.trim().toUpperCase();
              const rate = Number((rateEl as any)?.value);
              if (!code || !rate || rate <= 0) { notifyWarning('Invalid Currency', 'Enter valid currency code and exchange rate.'); return; }
              setRates(prev => ({ ...prev, [code]: rate }));
              if (codeEl) (codeEl as any).value = '';
              if (rateEl) (rateEl as any).value = '';
              notifySuccess('Currency Added', String(code) + ' added successfully.');
            }} className='px-3 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs cursor-pointer'>+ Add Currency</button>
          </div>
        </div>

        {/* SMTP Gmail Configuration Section (Dedicated & Separate) */}
        <div className='bg-[#030a1a] p-4 rounded-xl border border-indigo-400/30 space-y-3'>
          <div className='flex justify-between items-center'>
            <span className='font-bold text-indigo-300 uppercase block'>SMTP Email Configuration</span>
            <div className='flex gap-2'>
              <button
                type='button'
                onClick={async () => {
                  const targetEmail = window.prompt('Enter an email address to send test SMTP email OTP:', smtp.fromEmail || 'test@example.com');
                  if (!targetEmail) return;
                  try {
                    const res = await sendEmailVerificationOtp(targetEmail);
                    notifySuccess('SMTP Test Sent!', res.message || `Test OTP generated for ${targetEmail}`);
                  } catch (e: any) {
                    notifyError('SMTP Test Failed', e?.message || 'Could not send test email.');
                  }
                }}
                className='px-2.5 py-1 rounded bg-amber-400/20 border border-amber-400/40 text-amber-300 font-bold text-[10px] hover:bg-amber-400 hover:text-slate-950 transition cursor-pointer'
              >
                Send Test Email
              </button>
              <button type='button' onClick={() => commitSection('SMTP Settings', { smtp_config: smtp })} className='px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] cursor-pointer'>Update SMTP</button>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] text-slate-400'>
            <label>SMTP Host<input value={(smtp.host ?? '')} onChange={(e) => setSmtp(prev => ({ ...prev, host: e.target.value }))} className='w-full p-2 mt-1 rounded bg-[#071738] text-white text-xs border border-[#173b7d]' /></label>
            <label>SMTP Port<input type='number' value={(smtp.port ?? '')} onChange={(e) => setSmtp(prev => ({ ...prev, port: Number(e.target.value) }))} className='w-full p-2 mt-1 rounded bg-[#071738] text-white text-xs border border-[#173b7d]' /></label>
            <label>Gmail Username / Email<input value={(smtp.user ?? '')} onChange={(e) => setSmtp(prev => ({ ...prev, user: e.target.value }))} placeholder='admin@gmail.com' className='w-full p-2 mt-1 rounded bg-[#071738] text-white text-xs border border-[#173b7d]' /></label>
            <label>App Password / Secret<input type='password' value={(smtp.pass ?? '')} onChange={(e) => setSmtp(prev => ({ ...prev, pass: e.target.value }))} placeholder='16-char app password' className='w-full p-2 mt-1 rounded bg-[#071738] text-white text-xs border border-[#173b7d]' /></label>
            <label>From Email<input value={(smtp.fromEmail ?? '')} onChange={(e) => setSmtp(prev => ({ ...prev, fromEmail: e.target.value }))} placeholder='noreply@srinvestment.com' className='w-full p-2 mt-1 rounded bg-[#071738] text-white text-xs border border-[#173b7d]' /></label>
            <label>Sender Name<input value={(smtp.fromName ?? '')} onChange={(e) => setSmtp(prev => ({ ...prev, fromName: e.target.value }))} className='w-full p-2 mt-1 rounded bg-[#071738] text-white text-xs border border-[#173b7d]' /></label>
          </div>
        </div>

        {/* International SMS Gateways (50+ Global Gateways Supported) */}
        <div className='bg-[#030a1a] p-4 rounded-xl border border-purple-400/30 space-y-3'>
          <div className='flex justify-between items-center'>
            <div>
              <span className='font-bold text-purple-300 uppercase block'>International SMS Gateways (50+ Providers)</span>
              <span className='text-[10px] text-slate-400'>Select from 50+ global telecommunication &amp; SMS gateways</span>
            </div>
            <button type='button' onClick={() => commitSection('International SMS Gateway', { sms_intl_config: smsIntl })} className='px-3 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white font-bold text-[10px] cursor-pointer'>Update International SMS</button>
          </div>
          <div className='space-y-2 bg-[#071738] p-3 rounded-lg border border-[#173b7d]'>
            <label className='text-[10px] text-slate-400 block font-bold'>Select International SMS Provider ({GLOBAL_SMS_PROVIDERS.length} Available)
              <select 
                value={smsIntl.provider} 
                onChange={(e) => setSmsIntl(prev => ({ ...prev, provider: e.target.value }))} 
                className='w-full p-2 mt-1 rounded bg-[#030a1a] text-white text-xs border border-[#173b7d] focus:border-amber-400 font-bold'
              >
                {GLOBAL_SMS_PROVIDERS.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </label>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1'>
              <label className='text-[10px] text-slate-400 block'>API Key / Account SID
                <input value={(smsIntl.apiKey ?? '')} onChange={(e) => setSmsIntl(prev => ({ ...prev, apiKey: e.target.value }))} className='w-full p-2 mt-1 rounded bg-[#030a1a] text-white text-xs border border-[#173b7d]' />
              </label>
              <label className='text-[10px] text-slate-400 block'>API Secret / Auth Token
                <input type='password' value={(smsIntl.apiSecret ?? '')} onChange={(e) => setSmsIntl(prev => ({ ...prev, apiSecret: e.target.value }))} className='w-full p-2 mt-1 rounded bg-[#030a1a] text-white text-xs border border-[#173b7d]' />
              </label>
              <label className='text-[10px] text-slate-400 block'>Global Sender ID
                <input value={(smsIntl.senderId ?? '')} onChange={(e) => setSmsIntl(prev => ({ ...prev, senderId: e.target.value }))} className='w-full p-2 mt-1 rounded bg-[#030a1a] text-white text-xs border border-[#173b7d]' />
              </label>
            </div>
          </div>
        </div>

        {/* Platform Controls */}
        <div className='space-y-2'>
          <span className='font-bold text-amber-300 uppercase block'>Platform Controls</span>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>{Object.entries(toggles).map(([key, value]) => <button type='button' key={key} onClick={() => setToggles((prev) => ({ ...prev, [key]: !value }))} className='flex justify-between items-center p-2 rounded-lg bg-[#030a1a] border border-[#173b7d] text-xs text-slate-300 cursor-pointer'><span>{key.replaceAll('_', ' ')}</span><span className={value ? 'text-emerald-400 font-black' : 'text-rose-400 font-black'}>{value ? 'ON' : 'OFF'}</span></button>)}</div>
        </div>

        <button type='submit' className='px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black uppercase shadow-lg flex items-center space-x-1.5 cursor-pointer hover:brightness-110 transition'>
          <Save className='w-4 h-4' />
          <span>Save All Platform Settings</span>
        </button>
      </form>
    </div>
  );
}
