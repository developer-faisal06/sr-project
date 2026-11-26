import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, ShieldCheck, Zap } from 'lucide-react';
import { notifyWarning } from '../lib/notify';

export default function RegisterCard({ onOpenAuth, onRegisterSuccess }: any) {
  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      notifyWarning('Missing Information', 'Please fill in all fields!');
      return;
    }
    onRegisterSuccess({ name, email, password });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 px-5 py-3 rounded-t-3xl font-black text-xs sm:text-sm flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-2">
          <UserPlus className="w-4 h-4 text-slate-950 shrink-0" />
          <span className="uppercase tracking-wider">Create Account</span>
        </div>
        <span className="bg-slate-950/20 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
          Instant Setup
        </span>
      </div>

      <div className="bg-gradient-to-b from-[#08183a]/95 to-[#030919]/95 rounded-b-3xl p-5 sm:p-6 text-white shadow-2xl border-x-2 border-b-2 border-amber-400/40 backdrop-blur-xl space-y-3.5">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-500">
            Open Trading Account
          </h3>
          <p className="text-xs text-slate-300">
            Join institutional session trading with 1-click execution.
          </p>
        </div>

        <form onSubmit={handleSubmit} autoComplete="on" className="space-y-3 pt-1">
          <div className="relative">
            <User className="w-4 h-4 absolute left-3.5 top-3.5 text-amber-400/80 pointer-events-none" />
            <input 
              id="sr-register-name"
              name="name"
              autoComplete="name"
              type="text" required placeholder="Full Legal / Trading Name" 
              value={name} onChange={(e) => setName(e.target.value)} 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-[#020713]/80 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40" 
            />
          </div>

          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-amber-400/80 pointer-events-none" />
            <input 
              id="sr-register-email"
              name="email"
              autoComplete="email"
              type="email" required placeholder="yourmail@gmail.com" 
              value={email} onChange={(e) => setEmail(e.target.value)} 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-[#020713]/80 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40" 
            />
          </div>

          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-amber-400/80 pointer-events-none" />
            <input 
              id="sr-register-password"
              name="password"
              autoComplete="new-password"
              type={showPass ? 'text' : 'password'} required placeholder="Create Secure Password" 
              value={password} onChange={(e) => setPassword(e.target.value)} 
              className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-slate-700 bg-[#020713]/80 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40" 
            />
            <button 
              type="button" onClick={() => setShowPass(!showPass)} 
              className="absolute right-3.5 top-3 text-slate-400 hover:text-amber-400 p-0.5"
              aria-label={showPass ? "Hide password" : "Show password"}
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>256-Bit SSL Encr.</span>
            </div>
            <div className="flex items-center space-x-1.5 justify-end">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Instant Desk Access</span>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/25 active:scale-[0.98] transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create Account &rarr;</span>
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
          Already have an investor account?{' '}
          <button 
            type="button" onClick={() => onOpenAuth('login')} 
            className="text-amber-400 hover:text-yellow-300 font-extrabold hover:underline ml-1"
          >
            Sign In &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
