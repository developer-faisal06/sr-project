import React from 'react';
import { ArrowLeft, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function TermsPage({ onBackHome }) {
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
        <span className="text-xs font-black text-amber-400 uppercase tracking-wider">COMPLIANCE &amp; DISCLOSURE</span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Terms &amp; Conditions</h1>
        <p className="text-xs text-slate-400">Trading Risk Disclosure &amp; Service Agreement</p>
      </div>

      <div className="bg-[#071738] border border-[#173b7d] rounded-3xl p-6 sm:p-8 space-y-6 text-sm text-slate-300 leading-relaxed">
        
        {/* Risk Banner */}
        <div className="p-4 rounded-2xl bg-rose-500/10 border-2 border-rose-500/40 flex items-start space-x-3 text-rose-200">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-rose-400 mt-0.5" />
          <div>
            <strong className="block font-bold text-white mb-1">General Risk Warning</strong>
            <span>
              Trading financial markets, including Gold (XAUUSD) and Silver (XAGUSD), involves significant financial risk. Losses can occur, including loss of principal. Demo website only. No return is guaranteed.
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-2">1. Nature of the Demo Platform</h3>
          <p>
            SR Investment is presented as an interface prototype and demo business concept. No actual financial transactions, cash deposits, or real profit dividends occur through this software.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-2">2. No Financial Advice</h3>
          <p>
            Any simulated charts, rates, or figures displayed are for conceptual illustration only and do not constitute financial advice, investment recommendations, or an offer of securities.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-2">3. Pre-Launch Requirement</h3>
          <p>
            Before public launch, replace this sample content with reviewed, accurate company information and jurisdiction-specific legal documents.
          </p>
        </div>

      </div>
    </div>
  );
}
