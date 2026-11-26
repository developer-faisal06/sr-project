import React, { useState } from "react";
import { Settings, User, Lock, Bell, Shield, Save, CheckCircle2 } from "lucide-react";
import { notifySuccess, notifyWarning, notifyError } from "../../../lib/notify";
import { supabase } from '../../../lib/supabaseClient';
import { sendPhoneVerificationOtp, verifyPhoneOtp, sendEmailVerificationOtp, verifyEmailOtp } from '../../../services/api';


export default function UserSettingsView({ user, onSaveProfile, settings }: any) {
  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [country, setCountry] = useState(user.country || "");
  const [twoFA, setTwoFA] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [profitNotif, setProfitNotif] = useState(true);
  const [withdrawNotif, setWithdrawNotif] = useState(true);
  const [depositNotif, setDepositNotif] = useState(true);
  const [referralNotif, setReferralNotif] = useState(true);
  const [timezone, setTimezone] = useState(user.timezone || "Asia/Dhaka");
  const [currency, setCurrency] = useState(user.currency || "USD");
  const [avatarUrl, setAvatarUrl] = useState(user.avatar_url || "");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confPass, setConfPass] = useState("");

  React.useEffect(() => {
    if (user?.name) setName(user.name);
    if (user?.phone) setPhone(user.phone);
    if (user?.country !== undefined) setCountry(user.country);
    if (user?.timezone) setTimezone(user.timezone);
    if (user?.currency) setCurrency(user.currency);
    if (user?.avatar_url !== undefined) setAvatarUrl(user.avatar_url);
  }, [user?.name, user?.phone, user?.country, user?.timezone, user?.currency, user?.avatar_url]);

  const handleAvatarFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { notifyWarning('Invalid Avatar', 'Please choose an image file.'); return; }
    if (file.size > 1024 * 1024) { notifyWarning('Image Too Large', 'Avatar must be smaller than 1 MB.'); return; }
    const reader = new FileReader();
    reader.onload = () => setAvatarUrl(String(reader.result || ''));
    reader.readAsDataURL(file);
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) { notifyWarning("Name Required", "Please enter your full name."); return; }
    try {
      await onSaveProfile?.({
        name,
        phone,
        country,
        avatar_url: avatarUrl,
        timezone,
        currency,
        notification_preferences: {
          email: emailNotif,
          profit: profitNotif,
          deposit: depositNotif,
          withdrawal: withdrawNotif,
          referral: referralNotif,
          system: true
        }
      });
      notifySuccess("Profile Updated!", "Your profile information has been saved successfully.");
    } catch (error: any) {
      notifyError("Profile Update Failed", error?.message || "Could not save your profile.");
    }
  };

  const handlePassChange = async (e) => {
    e.preventDefault();
    if (!oldPass) { notifyWarning("Current Password Required", "Please enter your current password."); return; }
    if (newPass.length < 6) { notifyWarning("Weak Password", "New password must be at least 6 characters."); return; }
    if (newPass !== confPass) { notifyWarning("Mismatch", "New password and confirm password do not match."); return; }
    try {
      const { error } = await supabase.auth.updateUser({ password: newPass });
      if (error) throw error;
      notifySuccess("Password Changed!", "Your password has been updated successfully.");
      setOldPass(""); setNewPass(""); setConfPass("");
    } catch (err) {
      notifyError("Password Update Failed", err?.message || "Could not update password.");
    }
  };

  const Toggle = ({ value, onChange, label }) => (
    <div className="flex items-center justify-between py-3 border-b border-[#122b59] last:border-0">
      <span className="text-xs font-semibold text-slate-300">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={"relative w-10 h-5 rounded-full transition-colors duration-200 " + (value ? "bg-amber-400" : "bg-[#143269]")}
      >
        <span className={"absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 " + (value ? "translate-x-5" : "translate-x-0.5")} />
      </button>
    </div>
  );


  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#091f4d] via-[#09245c] to-[#0e3b91] border border-amber-400/40 rounded-3xl p-6 shadow-xl">
        <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">Account Management</span>
        <h2 className="text-2xl font-black text-white mt-1">Profile Settings</h2>
        <p className="text-slate-300 text-xs mt-0.5">Manage your account details, security, and notification preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-[#051330] border border-[#173870] rounded-2xl p-6 shadow-xl">
            <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
              <User className="w-4 h-4 text-amber-400" /><span>Profile Information</span>
            </h3>
            <form onSubmit={handleProfileSave} className="space-y-4">
              <div><label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
                <input type="text" value={(name ?? '')} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 bg-[#030c1f] border border-[#173a78] rounded-xl text-white text-xs focus:outline-none focus:border-amber-400" /></div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">Email Address</label>
                  {user.email_verified || user.email_confirmed_at ? (
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={async () => {
                        if (!user.email) { notifyWarning('Email Missing', 'User email not found.'); return; }
                        try {
                          const res = await sendEmailVerificationOtp(user.email);
                          notifySuccess('OTP Sent via SMTP', res.message || `Verification code sent to ${user.email}`);
                          const entered = window.prompt(`[SR INVESTMENT EMAIL VERIFICATION]\nEnter the 6-digit OTP code sent to ${user.email}:`);
                          if (entered) {
                            const vRes = await verifyEmailOtp(entered);
                            if (vRes.success) {
                              notifySuccess('Email Verified!', 'Your email has been verified via SMTP.');
                              await onSaveProfile?.({ email_verified: true });
                            } else {
                              notifyError('Verification Failed', vRes.message || 'Invalid code.');
                            }
                          }
                        } catch (err: any) {
                          notifyError('OTP Error', err?.message || 'Could not send verification code.');
                        }
                      }}
                      className="text-[10px] text-amber-400 hover:text-yellow-300 font-bold underline cursor-pointer"
                    >
                      Verify Email via OTP
                    </button>
                  )}
                </div>
                <input type="email" readOnly value={(user.email ?? '')} className="w-full px-4 py-2.5 bg-[#030c1f] border border-[#173a78] rounded-xl text-slate-300 text-xs font-mono cursor-not-allowed" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">Phone Number</label>
                  {user.phone_verified ? (
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={async () => {
                        if (!phone) { notifyWarning('Phone Required', 'Please enter a phone number first.'); return; }
                        try {
                          const res = await sendPhoneVerificationOtp(phone);
                          notifySuccess('OTP Sent from SR INVESTMENT', res.message || `Verification code sent to ${phone}`);
                          const entered = window.prompt(`[SR INVESTMENT SMS]\nEnter the 6-digit OTP code sent to ${phone}:`);
                          if (entered) {
                            const vRes = await verifyPhoneOtp(entered);
                            if (vRes.success) {
                              notifySuccess('Phone Verified!', 'Your phone number has been verified.');
                              await onSaveProfile?.({ phone, phone_verified: true });
                            } else {
                              notifyError('Verification Failed', vRes.message || 'Invalid code.');
                            }
                          }
                        } catch (err: any) {
                          notifyError('OTP Error', err?.message || 'Could not send verification code.');
                        }
                      }}
                      className="text-[10px] text-amber-400 hover:text-yellow-300 font-bold underline cursor-pointer"
                    >
                      Verify Phone via OTP
                    </button>
                  )}
                </div>
                <input type="text" value={(phone ?? '')} onChange={(e) => setPhone(e.target.value)} placeholder="+880 1700 000000" className="w-full px-4 py-2.5 bg-[#030c1f] border border-[#173a78] rounded-xl text-white text-xs focus:outline-none focus:border-amber-400" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Profile Avatar</label>
                <div className="flex items-center gap-3 mb-2"><div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400/60 bg-[#07193d] flex items-center justify-center text-amber-300 font-black">{avatarUrl ? <img src={avatarUrl} alt="Avatar preview" className="w-full h-full object-cover" /> : (name || 'U').split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase()}</div><label className="px-3 py-2 rounded-lg bg-[#0c265e] border border-[#1d4ed8] text-blue-200 text-[11px] font-bold cursor-pointer">Choose Image<input type="file" accept="image/*" onChange={handleAvatarFile} className="hidden" /></label>{avatarUrl && <button type="button" onClick={() => setAvatarUrl('')} className="px-3 py-2 rounded-lg bg-rose-500/15 border border-rose-500/40 text-rose-300 text-[11px] font-bold">Remove</button>}</div>
                <input type="url" value={(avatarUrl.startsWith('data:') ? '' : avatarUrl ?? '')} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="Or paste image URL" className="w-full px-4 py-2.5 bg-[#030c1f] border border-[#173a78] rounded-xl text-white text-xs focus:outline-none focus:border-amber-400" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Currency</label>
                  <select 
                    value={currency} 
                    onChange={(e) => setCurrency(e.target.value)} 
                    className="w-full px-3 py-2.5 bg-[#030c1f] border border-[#173a78] rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    {(() => {
                      const currencySymbols: Record<string, { symbol: string; flag: string }> = {
                        USD: { symbol: '$', flag: '🇺🇸' },
                        BDT: { symbol: '৳', flag: '🇧🇩' },
                        EUR: { symbol: '€', flag: '🇪🇺' },
                        GBP: { symbol: '£', flag: '🇬🇧' },
                        MYR: { symbol: 'RM', flag: '🇲🇾' },
                        INR: { symbol: '₹', flag: '🇮🇳' },
                        CAD: { symbol: 'C$', flag: '🇨🇦' },
                        AUD: { symbol: 'A$', flag: '🇦🇺' },
                        JPY: { symbol: '¥', flag: '🇯🇵' },
                        AED: { symbol: 'AED', flag: '🇦🇪' },
                        SAR: { symbol: 'SAR', flag: '🇸🇦' },
                        SGD: { symbol: 'S$', flag: '🇸🇬' },
                        TRY: { symbol: '₺', flag: '🇹🇷' },
                        CHF: { symbol: 'CHF', flag: '🇨🇭' },
                        CNY: { symbol: '¥', flag: '🇨🇳' }
                      };
                      const dynamicList = Array.from(new Set([
                        settings?.base_currency || 'USD',
                        ...(settings?.supported_currencies || []),
                        ...(settings?.exchange_rates ? Object.keys(settings.exchange_rates) : [])
                      ])).filter(Boolean);

                      return dynamicList.map((code) => {
                        const meta = currencySymbols[code] || { symbol: code, flag: '🌐' };
                        const rate = settings?.exchange_rates?.[code];
                        const rateText = rate && code !== (settings?.base_currency || 'USD') ? ` (${rate})` : '';
                        return (
                          <option key={code} value={code}>
                            {meta.flag} {code} ({meta.symbol}){rateText}
                          </option>
                        );
                      });
                    })()}
                  </select>
                </div>
                <div><label className="text-xs font-semibold text-slate-300 block mb-1">Timezone</label>
                  <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="w-full px-3 py-2.5 bg-[#030c1f] border border-[#173a78] rounded-xl text-white text-xs"><option value="Asia/Dhaka">Dhaka</option><option value="Asia/Kolkata">Kolkata</option><option value="UTC">UTC</option></select></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Country</label>
                  <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="e.g. Bangladesh" className="w-full px-4 py-2.5 bg-[#030c1f] border border-[#173a78] rounded-xl text-white text-xs focus:outline-none focus:border-amber-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">User ID</label>
                  <input type="text" readOnly value={(user.id ?? '')} className="w-full px-4 py-2.5 bg-[#030c1f] border border-[#173a78] rounded-xl text-slate-400 text-xs font-mono cursor-not-allowed" />
                </div>
              </div>
              <button type="submit" className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs shadow-lg hover:brightness-110 transition flex items-center justify-center space-x-2">
                <Save className="w-3.5 h-3.5" /><span>Save Profile Changes</span>
              </button>
            </form>
          </div>

          <div className="bg-[#051330] border border-[#173870] rounded-2xl p-6 shadow-xl">
            <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
              <Bell className="w-4 h-4 text-amber-400" /><span>Notifications</span>
            </h3>
            <Toggle value={emailNotif} onChange={setEmailNotif} label="Email Notifications" />
            <Toggle value={profitNotif} onChange={setProfitNotif} label="Profit Credit Alerts" />
            <Toggle value={depositNotif} onChange={setDepositNotif} label="Deposit Alerts" />
            <Toggle value={withdrawNotif} onChange={setWithdrawNotif} label="Withdrawal Status Alerts" />
            <Toggle value={referralNotif} onChange={setReferralNotif} label="Referral Commission Alerts" />
          </div>
        </div>


        <div className="lg:col-span-7 space-y-5">
          <div className="bg-[#051330] border border-[#173870] rounded-2xl p-6 shadow-xl">
            <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
              <Lock className="w-4 h-4 text-amber-400" /><span>Change Password</span>
            </h3>
            <form onSubmit={handlePassChange} className="space-y-4">
              <div><label className="text-xs font-semibold text-slate-300 block mb-1">Current Password</label>
                <input type="password" value={(oldPass ?? '')} onChange={(e) => setOldPass(e.target.value)} placeholder="Enter current password" className="w-full px-4 py-2.5 bg-[#030c1f] border border-[#173a78] rounded-xl text-white text-xs focus:outline-none focus:border-amber-400" /></div>
              <div><label className="text-xs font-semibold text-slate-300 block mb-1">New Password</label>
                <input type="password" value={(newPass ?? '')} onChange={(e) => setNewPass(e.target.value)} placeholder="Min. 6 characters" className="w-full px-4 py-2.5 bg-[#030c1f] border border-[#173a78] rounded-xl text-white text-xs focus:outline-none focus:border-amber-400" /></div>
              <div><label className="text-xs font-semibold text-slate-300 block mb-1">Confirm New Password</label>
                <input type="password" value={(confPass ?? '')} onChange={(e) => setConfPass(e.target.value)} placeholder="Re-enter new password" className="w-full px-4 py-2.5 bg-[#030c1f] border border-[#173a78] rounded-xl text-white text-xs focus:outline-none focus:border-amber-400" /></div>
              <button type="submit" className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black text-xs shadow-lg hover:brightness-110 transition flex items-center justify-center space-x-2">
                <Lock className="w-3.5 h-3.5" /><span>Update Password</span>
              </button>
            </form>
          </div>

          <div className="bg-[#051330] border border-[#173870] rounded-2xl p-6 shadow-xl">
            <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
              <Shield className="w-4 h-4 text-amber-400" /><span>Security Settings</span>
            </h3>
            <Toggle value={twoFA} onChange={setTwoFA} label="Two-Factor Authentication (2FA)" />
            <div className="mt-4 p-3 bg-blue-950/40 border border-blue-800/40 rounded-xl text-[11px] text-blue-300 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>{twoFA ? "2FA is ENABLED. Your account has enhanced security protection." : "Enable 2FA to add an extra layer of security to your account."}</span>
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-center text-xs">
              <div className="bg-[#030c1f] border border-[#143269] rounded-xl p-2.5">
                <p className="text-slate-400 text-[10px] uppercase font-bold">Account Status</p>
                <p className="text-emerald-400 font-black mt-0.5">{user.status || "Active"}</p>
              </div>
              <div className="bg-[#030c1f] border border-[#143269] rounded-xl p-2.5">
                <p className="text-slate-400 text-[10px] uppercase font-bold">Account Tier</p>
                <p className="text-amber-300 font-black mt-0.5">{user.account_tier || "ACTIVE_INVESTOR"}</p>
              </div>
              <div className="bg-[#030c1f] border border-[#143269] rounded-xl p-2.5">
                <p className="text-slate-400 text-[10px] uppercase font-bold">Country</p>
                <p className="text-white font-black mt-0.5">{country || user.country || "Global"}</p>
              </div>
              <div className="bg-[#030c1f] border border-[#143269] rounded-xl p-2.5">
                <p className="text-slate-400 text-[10px] uppercase font-bold">System Role</p>
                <p className="text-cyan-400 font-black mt-0.5 uppercase">{user.role || "user"}</p>
              </div>
              <div className="bg-[#030c1f] border border-[#143269] rounded-xl p-2.5">
                <p className="text-slate-400 text-[10px] uppercase font-bold">Invested</p>
                <p className="text-white font-black mt-0.5">${user.active_investment || user.invested || 0}</p>
              </div>
              <div className="bg-[#030c1f] border border-[#143269] rounded-xl p-2.5">
                <p className="text-slate-400 text-[10px] uppercase font-bold">Member Since</p>
                <p className="text-white font-black mt-0.5">{user.reg_date || user.joinedDate || "Feb 2026"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
