import React from 'react';

export default function KpiCards({ user, fmt }) {
  const cards = [
    {
      label: 'Total Deposited',
      amount: fmt(user.total_deposited),
      subtext: '↑ From 3 Deposits',
      subColor: 'text-cyan-400',
      icon: '🪙',
      iconBg: 'from-amber-400/20 to-yellow-500/10 border-amber-400/40',
      borderHover: 'hover:border-amber-400/50'
    },
    {
      label: 'Active Investment',
      amount: fmt(user.active_investment),
      subtext: '↑ Currently Active',
      subColor: 'text-blue-400',
      icon: '📈',
      iconBg: 'from-blue-500/20 to-indigo-500/10 border-blue-400/40',
      borderHover: 'hover:border-blue-400/50'
    },
    {
      label: 'Total Profit Earned',
      amount: fmt(user.profit),
      subtext: '↑ Lifetime Profit',
      subColor: 'text-emerald-400',
      icon: '🏆',
      iconBg: 'from-amber-500/20 to-yellow-600/10 border-amber-400/40',
      borderHover: 'hover:border-amber-400/50'
    },
    {
      label: 'Monthly Profit',
      amount: fmt(user.monthly_profit),
      subtext: `↑ ${user.monthly_profit_pct}% Monthly`,
      subColor: 'text-emerald-400',
      icon: '📅',
      iconBg: 'from-emerald-500/20 to-green-600/10 border-emerald-400/40',
      borderHover: 'hover:border-emerald-400/50'
    },
    {
      label: 'Referral Commission',
      amount: fmt(user.referral),
      subtext: '↑ From Referrals',
      subColor: 'text-cyan-400',
      icon: '👥',
      iconBg: 'from-cyan-500/20 to-teal-500/10 border-cyan-400/40',
      borderHover: 'hover:border-cyan-400/50'
    },
    {
      label: 'Withdrawable Balance',
      amount: fmt(user.withdrawable_balance),
      subtext: '↑ Available Now',
      subColor: 'text-amber-400',
      icon: '💼',
      iconBg: 'from-orange-500/20 to-amber-600/10 border-orange-400/40',
      borderHover: 'hover:border-orange-400/50'
    },
    {
      label: 'Reinvestment Balance',
      amount: fmt(user.reinvestment_balance),
      subtext: '↑ Ready to Reinvest',
      subColor: 'text-emerald-400',
      icon: '🔄',
      iconBg: 'from-emerald-500/20 to-teal-500/10 border-emerald-400/40',
      borderHover: 'hover:border-emerald-400/50'
    },
    {
      label: 'Total Investment Orders',
      amount: `${user.total_orders} Orders`,
      subtext: '↑ All Time',
      subColor: 'text-blue-400',
      icon: '📋',
      iconBg: 'from-blue-500/20 to-indigo-600/10 border-blue-400/40',
      borderHover: 'hover:border-blue-400/50'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div 
          key={i} 
          className={`bg-gradient-to-br from-[#061433] to-[#040e24] border border-[#163870] ${card.borderHover} rounded-2xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3.5 shadow-xl transition min-w-0`}
        >
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.iconBg} border flex items-center justify-center flex-shrink-0 text-xl font-bold`}>
            {card.icon}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-slate-300 truncate">{card.label}</span>
            <span className="text-xl font-black text-white mt-0.5 truncate">{card.amount}</span>
            <span className={`text-[11px] font-bold ${card.subColor} mt-0.5`}>{card.subtext}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
