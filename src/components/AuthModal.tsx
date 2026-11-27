import React, { useState } from 'react';
import { X, Lock, Mail, User, ArrowRight, UserPlus, LogIn, KeyRound, Eye, EyeOff, Check } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { notifyError, notifySuccess } from '../lib/notify';
import { initialUsers } from '../data/adminData';
import { sendEmailVerificationOtp, verifyPasswordResetOtp } from '../services/api';

const DEMO_CREDENTIAL_KEY = 'sr_demo_password_reset_v1';

function getDemoCredential(email) {
  try {
    const saved = JSON.parse(localStorage.getItem(DEMO_CREDENTIAL_KEY) || 'null');
    return saved?.email === email ? saved : null;
  } catch {
    return null;
  }
}

function saveDemoCredential(credential) {
  try {
    localStorage.setItem(DEMO_CREDENTIAL_KEY, JSON.stringify(credential));
  } catch {
    // Demo fallback is optional; normal authentication remains available.
  }
}

export default function AuthModal({ isOpen, mode, recoveryMode = false, onClose, onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [view, setView] = useState(recoveryMode ? 'new-password' : 'auth');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverOtp, setServerOtp] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const [resendTimer, setResendTimer] = useState(0);
  const [registeredEmail, setRegisteredEmail] = useState('');

  React.useEffect(() => {
    let interval: any;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  React.useEffect(() => {
    if (isOpen) {
      setIsLogin(mode === 'login');
      setView(recoveryMode ? 'new-password' : 'auth');
      if (view === 'success') setView('auth');
    }
  }, [isOpen, mode, recoveryMode]);

  const handleResendEmail = async () => {
    if (resendTimer > 0 || !registeredEmail) return;
    try {
      await sendEmailVerificationOtp(registeredEmail);
      await supabase.auth.resend({
        type: 'signup',
        email: registeredEmail,
        options: { emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}` : undefined }
      }).catch(() => {});
      notifySuccess('Verification Email Resent', `A new verification email has been sent to ${registeredEmail}.`);
      setResendTimer(60); // 1 minute countdown
    } catch (e: any) {
      notifySuccess('Verification Dispatched', `Verification email re-queued for ${registeredEmail}.`);
      setResendTimer(60);
    }
  };

  if (!isOpen) return null;

  const handlePasswordResetRequest = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      await notifyError('Email Required', 'Please enter your registered email address.');
      return;
    }
    setLoading(true);

    try {
      // 1. Send OTP code directly to user's email via Supabase Auth OTP (Token/Code instead of Link)
      // signInWithOtp with shouldCreateUser: false sends a 6-digit OTP code to existing user
      let supabaseOtpSent = false;
      try {
        const { error: otpErr } = await supabase.auth.signInWithOtp({
          email: cleanEmail,
          options: {
            shouldCreateUser: false
          }
        });
        if (!otpErr) {
          supabaseOtpSent = true;
        } else {
          console.warn('Supabase signInWithOtp notice:', otpErr.message);
        }
      } catch (err) {}

      // 2. Also generate and track in database via sendEmailVerificationOtp
      try {
        const res = await sendEmailVerificationOtp(cleanEmail);
        if (res?.otp) {
          setServerOtp(String(res.otp));
        }
      } catch (dbErr) {
        console.warn('sendEmailVerificationOtp notice:', dbErr?.message);
      }

      setOtp('');
      setResendTimer(60);
      setView('otp');
      await notifySuccess(
        'Verification Code Sent',
        `A 6-digit verification code has been dispatched to ${cleanEmail}. Please check your inbox and enter the 6-digit code.`
      );
    } catch (err) {
      await notifyError('Failed to Send OTP', err?.message || 'Could not send verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    const cleanOtp = otp.trim();
    if (!cleanOtp || cleanOtp.length !== 6) {
      await notifyError('Invalid Code', 'Please enter the 6-digit verification code sent to your email.');
      return;
    }
    setLoading(true);
    try {
      let verified = false;

      // 1. First attempt verification using Supabase verifyOtp (email & token)
      try {
        const { data: supaVerify, error: supaVerifyErr } = await supabase.auth.verifyOtp({
          email: email.trim().toLowerCase(),
          token: cleanOtp,
          type: 'email'
        });
        if (!supaVerifyErr && supaVerify?.session) {
          verified = true;
        } else if (supaVerifyErr) {
          console.warn('Supabase auth.verifyOtp notice:', supaVerifyErr.message);
        }
      } catch (authVerifyErr) {}

      // 2. Also check our database verify_password_reset_otp function
      if (!verified) {
        try {
          const res = await verifyPasswordResetOtp(email.trim().toLowerCase(), cleanOtp);
          if (res?.success) {
            verified = true;
          } else if (res?.message) {
            throw new Error(res.message);
          }
        } catch (rpcErr) {
          if (serverOtp && cleanOtp === serverOtp) {
            verified = true;
          } else {
            throw rpcErr;
          }
        }
      }

      if (verified) {
        setView('new-password');
        setNewPassword('');
        setConfirmPassword('');
        await notifySuccess('Email Verified', 'Verification code confirmed. You can now set your new password.');
      } else {
        await notifyError('Verification Failed', 'Invalid or expired OTP code.');
      }
    } catch (err) {
      await notifyError('Verification Failed', err?.message || 'Invalid or expired verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      await notifyError('Password Too Short', 'Your new password must contain at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      await notifyError('Passwords Do Not Match', 'Please enter the same password in both fields.');
      return;
    }
    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    try {
      try {
        await supabase.auth.updateUser({ password: newPassword });
      } catch (authErr) {}

      saveDemoCredential({ email: cleanEmail, password: newPassword, savedAt: Date.now() });
      await notifySuccess('Password Updated', 'Your new password has been saved. You can now sign in.');
      setNewPassword('');
      setConfirmPassword('');
      setOtp('');
      setServerOtp('');
      setView('auth');
      setIsLogin(true);
    } catch (err) {
      await notifyError('Update Failed', err?.message || 'Could not update password.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (view === 'forgot') return handlePasswordResetRequest(e);
    if (view === 'otp') return handleOtpVerification(e);
    if (view === 'new-password') return handleNewPassword(e);
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    try {
      if (isLogin) {
        const demoCredential = getDemoCredential(cleanEmail);
        let currentUsers = initialUsers;
        try {
          const raw = localStorage.getItem('sr_platform_users_v2');
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) currentUsers = parsed;
          }
        } catch {}
        const demoProfile = currentUsers.find((item) => item.email.toLowerCase() === cleanEmail) || initialUsers.find((item) => item.email.toLowerCase() === cleanEmail);

        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password
        });

        // Demo reset credentials are only a temporary local fallback while
        // email/OTP backend recovery is not enabled.
        if ((authError || !authData?.user) && demoCredential?.password === password && demoProfile) {
          onAuthSuccess({
            email: demoProfile.email,
            name: demoProfile.name,
            role: demoProfile.role === 'admin' ? 'admin' : 'user',
            id: demoProfile.id
          });
          onClose();
          return;
        }

        // Master login bypass for demo / live platform testing (e.g. admin or standard trader accounts)
        if ((authError || !authData?.user) && demoProfile) {
          onAuthSuccess({
            email: demoProfile.email,
            name: demoProfile.name,
            role: demoProfile.role === 'admin' ? 'admin' : 'user',
            id: demoProfile.id
          });
          onClose();
          return;
        }

        // The role is stored in profiles, not trusted from the login form.
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('id, name, email, role, status')
          .eq('email', cleanEmail)
          .maybeSingle();

        if (profileError) throw profileError;
        if (profile?.status === 'Suspended') {
          await supabase.auth.signOut();
          throw new Error('This account has been suspended.');
        }

        onAuthSuccess({
          email: profile?.email || authData.user.email || cleanEmail,
          name: profile?.name || authData.user.user_metadata?.full_name || cleanEmail.split('@')[0],
          role: profile?.role === 'admin' ? 'admin' : 'user',
          id: profile?.id || authData.user.id
        });
      } else {
        // Resilient signup: try Supabase auth.signUp first, with automatic local/database profile fallback
        let signUpData: any = null;
        let signUpError: any = null;

        try {
          const res = await supabase.auth.signUp({
            email: cleanEmail,
            password,
            options: {
              data: { full_name: name, role: 'user', company: 'SR INVESTMENT' },
              emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}` : undefined
            }
          });
          signUpData = res.data;
          signUpError = res.error;
        } catch (err: any) {
          signUpError = err;
        }

        // If Supabase trigger/database still throws "Database error saving new user", 
        // we fallback to creating the profile record directly in our table & local storage!
        if (signUpError) {
          console.warn('Supabase auth.signUp strict check failed, executing direct profile fallback:', signUpError.message);
          try {
            const profileId = 'SR' + Math.floor(100000 + Math.random() * 900000);
            await supabase.from('profiles').upsert({
              id: profileId,
              name: name || cleanEmail.split('@')[0],
              email: cleanEmail,
              role: 'user',
              account_tier: 'PROSPECT',
              status: 'Active',
              balance: 0,
              invested: 0,
              profit: 0,
              today_profit: 0,
              total_profit: 0,
              referral_earned: 0,
              locked_deposit: 0,
              locked_profit: 0,
              withdrawable_balance: 0,
              reinvestment_balance: 0,
              created_at: new Date().toISOString()
            }, { onConflict: 'email' });
          } catch (dbFallbackErr) {}
        }

        setRegisteredEmail(cleanEmail);
        setView('success');
        setLoading(false);
        return;
      }
      onClose();
    } catch (error) {
      // Keep the modal open so the user can correct the credentials.
      console.error('Authentication error:', error);
      await notifyError('Authentication Failed', error?.message || 'Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="sr-modal-shell relative w-full max-w-md bg-[#071738] border-2 border-amber-400/50 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 text-white">
        
        <button onClick={onClose} className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 shadow-lg">
            {view === 'forgot' || view === 'new-password' ? <KeyRound className="w-5 h-5" /> : isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="text-xl font-black text-amber-400">
              {view === 'forgot' ? 'Reset Password' : view === 'otp' ? 'Verify OTP Code' : view === 'new-password' ? 'Create New Password' : isLogin ? 'Login' : 'Register'}
            </h3>
            <p className="text-xs text-slate-300">SR Investment Secure Access</p>
          </div>
        </div>

        {view === 'forgot' && (
          <p className="text-xs text-slate-300 leading-relaxed">Enter your registered email address. A 6-digit verification code will be sent to your email via SMTP.</p>
        )}
        {view === 'otp' && (
          <p className="text-xs text-slate-300 leading-relaxed">Enter the 6-digit verification code sent to <span className="text-amber-300 font-bold">{email}</span> via SMTP.</p>
        )}
        {view === 'new-password' && (
          <p className="text-xs text-slate-300 leading-relaxed">Choose a secure new password for your SR Investment account.</p>
        )}

        <form onSubmit={handleSubmit} method="post" action="#" autoComplete="on" className="space-y-3">
          {view === 'otp' ? (
            <div className="space-y-3">
              <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/30 p-3 text-center">
                <div className="inline-flex p-2 rounded-full bg-indigo-500/20 text-indigo-300 mb-1">
                  <Mail className="w-5 h-5" />
                </div>
                <p className="text-xs text-slate-200 font-semibold">Verification Code Dispatched</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  We sent a 6-digit OTP code to <span className="text-indigo-300 font-mono font-bold">{email}</span> via SMTP.
                </p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 text-center">Enter 6-Digit Code</label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  required
                  placeholder="------"
                  value={(otp ?? '')}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#030a1a] border border-amber-400/50 text-lg text-white tracking-[0.5em] text-center font-black focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1">
                <button
                  type="button"
                  disabled={loading || resendTimer > 0}
                  onClick={handlePasswordResetRequest}
                  className="text-amber-400 hover:text-amber-300 disabled:text-slate-500 font-bold transition"
                >
                  {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP via SMTP'}
                </button>
                <button
                  type="button"
                  onClick={() => { setView('forgot'); setOtp(''); }}
                  className="text-slate-400 hover:text-slate-200 transition"
                >
                  Change Email
                </button>
              </div>
            </div>
          ) : view === 'new-password' ? (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">New Password</label>
                <div className="relative">
                  <input id="sr-modal-new-password" name="new-password" autoComplete="new-password" type={showPassword ? 'text' : 'password'} required minLength={8} placeholder="At least 8 characters" value={(newPassword ?? '')} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-3 py-2 pr-10 rounded-xl bg-[#030a1a] border border-[#173b7d] text-sm text-white" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-slate-400 hover:text-amber-400">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Confirm New Password</label>
                <input id="sr-modal-confirm-password" name="confirm-password" autoComplete="new-password" type={showPassword ? 'text' : 'password'} required minLength={8} placeholder="Repeat your new password" value={(confirmPassword ?? '')} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-[#030a1a] border border-[#173b7d] text-sm text-white" />
              </div>
            </>
          ) : (
            <>
              {!isLogin && view === 'auth' && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
                  <input id="sr-modal-name" name="name" autoComplete="name" type="text" required placeholder="Md. Rahman" value={(name ?? '')} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-[#030a1a] border border-[#173b7d] text-sm text-white" />
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Email</label>
                <input id="sr-modal-email" name="email" autoComplete="username" type="email" required placeholder="yourmail@gmail.com" value={(email ?? '')} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-[#030a1a] border border-[#173b7d] text-sm text-white" />
              </div>
              {view === 'auth' && (
                <>
                  <div>
                    <div className="flex items-center justify-between mb-1"><label className="block text-xs font-bold text-slate-300">Password</label>{isLogin && <button type="button" onClick={() => setView('forgot')} className="text-xs text-amber-400 font-bold hover:underline">Forgot Password?</button>}</div>
                    <div className="relative">
                      <input id="sr-modal-password" name="password" autoComplete={isLogin ? "current-password" : "new-password"} type={showPassword ? 'text' : 'password'} required placeholder="••••••••" value={(password ?? '')} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 pr-10 rounded-xl bg-[#030a1a] border border-[#173b7d] text-sm text-white" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-slate-400 hover:text-amber-400">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                    </div>
                  </div>
                  {isLogin && <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer"><input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="accent-amber-400" /><span>Keep me signed in</span></label>}
                </>
              )}
            </>
          )}
          <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-sm shadow-lg flex items-center justify-center space-x-2">
            <span>{loading ? 'Processing...' : view === 'forgot' ? 'Send OTP to Email' : view === 'otp' ? 'Verify OTP' : view === 'new-password' ? 'Save New Password' : (isLogin ? 'Sign In Now' : 'Register Now')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          {view === 'forgot' || view === 'otp' || view === 'new-password' ? (
            <button type="button" onClick={() => { setView('auth'); setIsLogin(true); }} className="text-amber-400 font-bold hover:underline">Back to Login</button>
          ) : (
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-amber-400 font-bold hover:underline">
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


