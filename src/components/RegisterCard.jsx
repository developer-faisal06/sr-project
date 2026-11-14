import React, { useState } from 'react';
import { Gift, User, Mail, Lock, Eye, EyeOff, UserPlus } from 'lucide-react';
import { notifyWarning } from '../lib/notify';

export default function RegisterCard({ onOpenAuth, onRegisterSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      notifyWarning('Missing Information', 'Please fill in all fields to create your demo account!');
      return;
    }
    onRegisterSuccess({ name, email });
  };


  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 px-6 py-3 rounded-t-3xl font-black text-base flex items-center justify-center space-x-2">
        <Gift className="w-5 h-5 fill-slate-950" />
        <span>Get Started Today!</span>
      </div>
      <div className="bg-white rounded-b-3xl p-6 text-slate-800 shadow-2xl border-x border-b border-amber-400/40 space-y-4">
        <h3 className="text-xl font-black text-center text-slate-900">Create Your Free Account</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input 
              type="text" required placeholder="Full Name" 
              value={name} onChange={(e) => setName(e.target.value)} 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-slate-50 text-slate-900" 
            />
          </div>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input 
              type="email" required placeholder="Email Address" 
              value={email} onChange={(e) => setEmail(e.target.value)} 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-slate-50 text-slate-900" 
            />
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input 
              type={showPassword ? 'text' : 'password'} required placeholder="Password" 
              value={password} onChange={(e) => setPassword(e.target.value)} 
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm bg-slate-50 text-slate-900" 
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-3 text-slate-400">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <button 
            type="submit" 
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-sm flex items-center justify-center space-x-2 shadow-lg"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register Now &rarr;</span>
          </button>
        </form>
        <div className="text-center text-xs text-slate-500 font-medium">
          Already have an account?{' '}
          <button onClick={() => onOpenAuth('login')} className="text-blue-600 font-bold hover:underline">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
