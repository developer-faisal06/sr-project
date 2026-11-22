import React from 'react';
import { ShieldCheck, TrendingUp, Users, Zap, Headphones } from 'lucide-react';

export default function FeatureBar() {
  const features = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      bg: "bg-emerald-500/15 border-emerald-500/30",
      title: "100% Secure",
      subtitle: "Capital Custody"
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-amber-400" />,
      bg: "bg-amber-500/15 border-amber-500/30",
      title: "Monthly Yield",
      subtitle: "Profit Crediting"
    },
    {
      icon: <Users className="w-5 h-5 text-cyan-400" />,
      bg: "bg-cyan-500/15 border-cyan-500/30",
      title: "Multi-Referral",
      subtitle: "Up to 15% Comm."
    },
    {
      icon: <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />,
      bg: "bg-yellow-500/15 border-yellow-500/30",
      title: "Instant Liquidity",
      subtitle: "Withdraw / Reinvest"
    },
    {
      icon: <Headphones className="w-5 h-5 text-blue-400" />,
      bg: "bg-blue-500/15 border-blue-500/30",
      title: "24/7 Support",
      subtitle: "Live Trading Desk"
    }
  ];

  return (
    <div className="relative z-20 -mt-4 sm:-mt-6 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#061430]/95 border-2 border-amber-400/40 rounded-2xl lg:rounded-full py-3.5 px-3 sm:px-8 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-0 items-center lg:divide-x divide-amber-400/20">
          {features.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex items-center justify-center space-x-3 px-2 sm:px-4 py-2 lg:py-1 transition-all hover:scale-[1.02] ${
                idx === 4 ? 'col-span-2 sm:col-span-1' : ''
              }`}
            >
              <div className={`p-2 rounded-xl border ${item.bg} shadow-md shrink-0`}>
                {item.icon}
              </div>
              <div className="text-left">
                <span className="block text-xs sm:text-sm font-black text-white leading-tight">
                  {item.title}
                </span>
                <span className="block text-[10px] sm:text-xs text-slate-300 font-semibold leading-tight mt-0.5">
                  {item.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

