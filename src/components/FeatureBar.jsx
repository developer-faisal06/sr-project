import React from 'react';
import { ShieldCheck, TrendingUp, Users, Zap, Headphones } from 'lucide-react';

export default function FeatureBar() {
  const features = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: "100% Secure",
      subtitle: "& Trusted"
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-amber-400" />,
      title: "Monthly Profit",
      subtitle: "Share"
    },
    {
      icon: <Users className="w-5 h-5 text-amber-300" />,
      title: "Multi-Referral",
      subtitle: "Commission"
    },
    {
      icon: <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />,
      title: "Flexible Options",
      subtitle: "(Withdraw or Reinvest)"
    },
    {
      icon: <Headphones className="w-5 h-5 text-cyan-400" />,
      title: "24/7 Support",
      subtitle: ""
    }
  ];

  return (
    <div className="relative z-20 -mt-3 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#071738] border-2 border-amber-400/40 rounded-2xl lg:rounded-full py-3 px-3 sm:px-8 shadow-2xl shadow-blue-950/80">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-0 items-center divide-y sm:divide-y-0 lg:divide-x divide-amber-400/20">
          {features.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex items-center justify-center space-x-2.5 sm:space-x-3 px-2 sm:px-3 py-2 sm:py-1 ${
                idx === 4 ? 'col-span-2 sm:col-span-1' : ''
              }`}
            >
              <div className="flex-shrink-0">
                {item.icon}
              </div>
              <div className="text-left">
                <span className="block text-xs sm:text-sm font-bold text-white leading-tight">
                  {item.title}
                </span>
                {item.subtitle && (
                  <span className="block text-[10px] sm:text-xs text-slate-300 font-medium leading-tight">
                    {item.subtitle}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

