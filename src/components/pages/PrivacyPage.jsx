import React from 'react';
import { ArrowLeft, ShieldCheck, Lock, EyeOff, FileText } from 'lucide-react';

export default function PrivacyPage({ onBackHome }) {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div>
        <button 
          onClick={onBackHome}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#071738] border border-amber-400/40 text-amber-300 hover:text-white text-xs font-bold transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to home</span>
        </button>
      </div>

      <div className="text-center space-y-2">
        <span className="text-xs font-black text-amber-400 uppercase tracking-wider">LEGAL DOCUMENTATION</span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: November 2026</p>
      </div>

      <div className="bg-[#071738] border border-[#173b7d] rounded-3xl p-6 sm:p-8 space-y-6 text-sm text-slate-300 leading-relaxed">
        <div>
          <h3 className="text-lg font-bold text-white mb-2">1. Demo Environment Data Collection</h3>
          <p>
            SR Investment operates solely as an educational demonstration environment. We do not solicit, collect, or store real financial accounts, credit card credentials, or personal banking documents. Any mock credentials entered are used strictly for session simulation.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-2">2. Local Storage &amp; Cookies</h3>
          <p>
            Our website uses local browser storage strictly to remember your active user session and preference settings (such as UI theme and demo balance calculations). No persistent third-party tracking cookies are deployed for commercial advertising.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-2">3. Pre-Launch Data Security</h3>
          <p>
            All interface endpoints are protected with standard transport layer security (TLS 1.3 / HTTPS). Before any prospective public launch, full data privacy audits and ISO-compliant data protection frameworks will be implemented.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-xs text-amber-200">
          <strong>Notice:</strong> This is an illustrative demo policy. Replace with reviewed, jurisdiction-specific legal documentation prior to commercial launch.
        </div>
      </div>
    </div>
  );
}
