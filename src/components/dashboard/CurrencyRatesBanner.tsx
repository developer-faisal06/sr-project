import React, { useState } from 'react';
import { TrendingUp, Calculator, ArrowRightLeft, Globe } from 'lucide-react';

interface CurrencyRatesBannerProps {
  settings?: any;
  user?: any;
}

const CURRENCY_METADATA: Record<string, { name: string; flag: string; symbol: string }> = {
  USD: { name: 'US Dollar', flag: '🇺🇸', symbol: '$' },
  BDT: { name: 'Bangladeshi Taka', flag: '🇧🇩', symbol: '৳' },
  EUR: { name: 'Euro', flag: '🇪🇺', symbol: '€' },
  GBP: { name: 'British Pound', flag: '🇬🇧', symbol: '£' },
  MYR: { name: 'Malaysian Ringgit', flag: '🇲🇾', symbol: 'RM' },
  INR: { name: 'Indian Rupee', flag: '🇮🇳', symbol: '₹' },
  CAD: { name: 'Canadian Dollar', flag: '🇨🇦', symbol: 'C$' },
  AUD: { name: 'Australian Dollar', flag: '🇦🇺', symbol: 'A$' },
  JPY: { name: 'Japanese Yen', flag: '🇯🇵', symbol: '¥' },
  AED: { name: 'UAE Dirham', flag: '🇦🇪', symbol: 'AED' },
  SAR: { name: 'Saudi Riyal', flag: '🇸🇦', symbol: 'SAR' },
  SGD: { name: 'Singapore Dollar', flag: '🇸🇬', symbol: 'S$' }
};

export default function CurrencyRatesBanner({ settings, user }: CurrencyRatesBannerProps) {
  const [calcAmount, setCalcAmount] = useState<number>(100);
  const [showConverter, setShowConverter] = useState<boolean>(false);

  const baseCurrency = settings?.base_currency || 'USD';
  const defaultRates: Record<string, number> = { USD: 1, BDT: 121.5, EUR: 0.92, GBP: 0.79, MYR: 4.70 };
  const rates: Record<string, number> = settings?.exchange_rates && Object.keys(settings.exchange_rates).length > 0
    ? settings.exchange_rates
    : defaultRates;

  const currencyList = Array.from(new Set([
    baseCurrency,
    ...(settings?.supported_currencies || []),
    ...Object.keys(rates)
  ])).filter(Boolean);

  const userCurrency = user?.currency || baseCurrency;

  return (
    <div className="relative rounded-3xl bg-gradient-to-r from-[#061430]/95 via-[#081f4d]/90 to-[#061430]/95 border-2 border-amber-400/35 p-4 sm:p-5 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-amber-400/20">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow">
            <Globe className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                Live Dynamic Currency &amp; Bullion Rates
              </h3>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-300">
              Real-time exchange rates synchronized dynamically with System Desk
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-end sm:self-center">
          <span className="px-2.5 py-1 rounded-full bg-[#030919] border border-amber-400/40 text-[10px] font-black text-amber-300">
            Base: {baseCurrency}
          </span>
          <button
            type="button"
            onClick={() => setShowConverter(!showConverter)}
            className="flex items-center space-x-1 px-3 py-1 rounded-full bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-400/40 text-cyan-300 font-bold text-[10px] sm:text-xs transition cursor-pointer"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>{showConverter ? 'Hide' : 'Quick Calculator'}</span>
          </button>
        </div>
      </div>
      {showConverter && (
        <div className="my-3 p-3.5 rounded-2xl bg-[#030919]/90 border border-cyan-500/30 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-black text-white flex items-center gap-1.5">
              <ArrowRightLeft className="w-3.5 h-3.5 text-cyan-400" /> Convert {baseCurrency}:
            </span>
            <input
              type="number"
              min="1"
              value={calcAmount}
              onChange={(e) => setCalcAmount(Math.max(0, Number(e.target.value)))}
              className="w-28 px-2.5 py-1 rounded-lg bg-[#071738] border border-cyan-400/50 text-white font-mono font-bold text-xs text-right"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {currencyList.map((code) => {
              const rate = Number(rates[code] ?? 1);
              const converted = (calcAmount * rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
              const meta = CURRENCY_METADATA[code] || { name: code, flag: '🌐', symbol: code };
              return (
                <div key={code} className="bg-[#071738]/80 p-2 rounded-xl border border-slate-700/80 text-center">
                  <span className="text-[10px] text-slate-400 block">{meta.flag} {code}</span>
                  <span className="text-xs font-black text-emerald-400 font-mono block mt-0.5">
                    {meta.symbol}{converted}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mt-3">
        {currencyList.map((code) => {
          const rate = Number(rates[code] ?? 1);
          const meta = CURRENCY_METADATA[code] || { name: code, flag: '🌐', symbol: code };
          const isUserCurr = code === userCurrency;

          return (
            <div
              key={code}
              className={`rounded-2xl p-3 border transition-all hover:scale-[1.02] flex flex-col justify-between ${
                isUserCurr
                  ? 'bg-gradient-to-b from-[#0e2c69] to-[#040e24] border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                  : 'bg-gradient-to-b from-[#071738]/90 to-[#030919]/90 border-slate-700/80 hover:border-amber-400/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-base">{meta.flag}</span>
                  <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    {code}
                  </span>
                </div>
                <div className="mt-1">
                  <span className="block text-[10px] text-slate-400 truncate">{meta.name}</span>
                  <div className="mt-0.5 flex items-baseline justify-between">
                    <span className="text-sm font-black font-mono text-white">
                      {rate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                    </span>
                    <span className="text-[10px] font-bold text-amber-300">{meta.symbol}</span>
                  </div>
                </div>
              </div>
              <div className="mt-1.5 pt-1.5 border-t border-slate-700/60 flex items-center justify-between text-[9px]">
                <span className="text-slate-400">1 {baseCurrency} =</span>
                <span className="font-bold text-emerald-400 flex items-center gap-0.5">
                  <TrendingUp className="w-2.5 h-2.5" /> {rate}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}