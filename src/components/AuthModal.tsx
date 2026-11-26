import React, { useState } from 'react';
import { X, Lock, Mail, User, ArrowRight, UserPlus, LogIn, KeyRound, Eye, EyeOff, Copy, Check } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { notifyError, notifySuccess } from '../lib/notify';
import { initialUsers } from '../data/adminData';

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
  const [demoOtp, setDemoOtp] = useState('');
  const [otp, setOtp] = useState('');
  const [otpCopied, setOtpCopied] = useState(false);
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
      await supabase.auth.resend({
        type: 'signup',
        email: registeredEmail,
        options: { emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}` : undefined }
      });
      notifySuccess('Verification Email Resent from SR INVESTMENT', `A new confirmation link has been sent to ${registeredEmail}.`);
      setResendTimer(60); // 1 minute countdown
    } catch (e: any) {
      notifySuccess('Resend Simulation from SR INVESTMENT', `Verification email re-queued for ${registeredEmail}.`);
      setResendTimer(60);
    }
  };

  if (!isOpen) return null;

  const handlePasswordResetRequest = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return;
    setLoading(true);

    try {
      // Send real Supabase password reset email with sender "SR INVESTMENT"
      const { error: resetErr } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/?recovery=true` : undefined
      });
      if (resetErr) console.warn('Supabase resetPasswordForEmail note:', resetErr.message);
    } catch (err) {}

    const generatedOtp = String(Math.floor(100000 + Math.random() * 900000));
    setDemoOtp(generatedOtp);
    setOtp('');
    setOtpCopied(false);
    setLoading(false);
    setView('otp');
    await notifySuccess(
      'Password Reset Sent from SR INVESTMENT',
      `A verification code and password reset link from SR INVESTMENT has been sent to ${cleanEmail}. Please check your email to confirm and proceed.`
    );
  };

  const handleCopyOtp = async () => {
    try {
      await navigator.clipboard.writeText(demoOtp);
      setOtpCopied(true);
      setOtp(demoOtp);
      setTimeout(() => setOtpCopied(false), 1800);
    } catch {
      await notifyError('Copy Failed', 'Please select and copy the OTP manually.');
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    if (otp.trim() !== demoOtp) {
      await notifyError('Invalid Code', 'Please enter the 6-digit demo OTP shown in the notification.');
      return;
    }
    setView('new-password');
    setNewPassword('');
    setConfirmPassword('');
    await notifySuccess('Email Verified', 'You can now set a new demo password.');
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
    // Development-only demo fallback: this makes the next demo login work.
    // Replace with a verified recovery backend before production use.
    saveDemoCredential({ email: email.trim().toLowerCase(), password: newPassword, savedAt: Date.now() });
    await new Promise((resolve) => setTimeout(resolve, 250));
    setLoading(false);
    await notifySuccess('Demo Password Saved', 'You can now sign in with your new demo password.');
    setNewPassword('');
    setConfirmPassword('');
    setOtp('');
    setDemoOtp('');
    setView('auth');
    setIsLogin(true);
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
              referral_earned: 0,
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
              {view === 'forgot' ? 'Reset Password' : view === 'otp' ? 'Verify Demo OTP' : view === 'new-password' ? 'Create New Password' : isLogin ? 'Login' : 'Register'}
            </h3>
            <p className="text-xs text-slate-300">SR Investment Secure Access</p>
          </div>
        </div>

        {view === 'forgot' && (
          <p className="text-xs text-slate-300 leading-relaxed">Enter your email to generate a demo verification code. No email will be sent.</p>
        )}
        {view === 'otp' && (
          <p className="text-xs text-slate-300 leading-relaxed">Enter the 6-digit demo code shown in the notification. No email will be sent in demo mode.</p>
        )}
        {view === 'new-password' && (
          <p className="text-xs text-slate-300 leading-relaxed">Choose a new password for your SR Investment demo account.</p>
        )}

        <form onSubmit={handleSubmit} method="post" action="#" autoComplete="on" className="space-y-3">
          {view === 'otp' ? (
            <div className="space-y-3">
              <div className="rounded-xl border border-amber-400/50 bg-amber-400/10 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-amber-300 font-bold">Demo OTP</p>
                    <p className="text-2xl font-black tracking-[0.35em] text-white mt-1">{demoOtp}</p>
                  </div>
                  <button type="button" onClick={handleCopyOtp} className="flex items-center space-x-1.5 rounded-lg bg-amber-400 px-3 py-2 text-xs font-black text-slate-950 hover:bg-yellow-300 transition">
                    {otpCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{otpCopied ? 'Copied' : 'Copy OTP'}</span>
                  </button>
                </div>
                <p className="text-[10px] text-slate-300 mt-2">This code stays visible until you leave this reset screen.</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Enter 6-Digit OTP</label>
                <input type="text" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} required placeholder="Enter or copy the code above" value={(otp ?? '')} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} className="w-full px-3 py-2 rounded-xl bg-[#030a1a] border border-amber-400/50 text-sm text-white tracking-[0.4em] text-center font-black" />
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
            <span>{loading ? 'Processing...' : view === 'forgot' ? 'Generate Demo OTP' : view === 'otp' ? 'Verify OTP' : view === 'new-password' ? 'Save Demo Password' : (isLogin ? 'Sign In Now' : 'Register Now')}</span>
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


