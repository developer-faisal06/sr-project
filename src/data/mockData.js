export const investmentPlans = [
  {
    id: 'starter',
    name: 'Starter Wealth',
    minDeposit: '$500',
    targetRoi: '8% - 12%',
    duration: '6 Months',
    risk: 'Low',
    popular: false,
    features: [
      'Automated Index Funds',
      'Basic Portfolio Rebalancing',
      'Email Support',
      'Monthly Market Report'
    ]
  },
  {
    id: 'growth',
    name: 'Growth Accelerator',
    minDeposit: '$5,000',
    targetRoi: '15% - 22%',
    duration: '12 Months',
    risk: 'Moderate',
    popular: true,
    features: [
      'Tech & Green Energy Stocks',
      'Bi-weekly Rebalancing',
      'Priority 24/7 Support',
      'Dedicated Financial Advisor',
      'Advanced Tax Loss Harvesting'
    ]
  },
  {
    id: 'elite',
    name: 'Elite Venture',
    minDeposit: '$25,000',
    targetRoi: '28% - 40%',
    duration: '24 Months',
    risk: 'High Growth',
    popular: false,
    features: [
      'Private Equity & Crypto Index',
      'Real-time AI Arbitrage',
      'Private Wealth Manager',
      'VIP Masterclasses & Networking',
      'Zero Management Fees'
    ]
  }
];

export const marketTrends = [
  { symbol: 'BTC/USD', name: 'Bitcoin', price: '$68,450.00', change: '+4.32%', isUp: true },
  { symbol: 'ETH/USD', name: 'Ethereum', price: '$3,580.20', change: '+2.15%', isUp: true },
  { symbol: 'S&P 500', name: 'S&P 500 Index', price: '$5,240.10', change: '+0.85%', isUp: true },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: '$178.50', change: '-1.24%', isUp: false },
  { symbol: 'AAPL', name: 'Apple Inc.', price: '$172.30', change: '+0.45%', isUp: true },
  { symbol: 'GOLD', name: 'Spot Gold', price: '$2,165.40', change: '+0.92%', isUp: true },
];

export const portfolioAssets = [
  { category: 'US Equities', percentage: 40, amount: '$42,500', color: 'bg-indigo-500' },
  { category: 'Cryptocurrency', percentage: 25, amount: '$26,562', color: 'bg-purple-500' },
  { category: 'Real Estate REITS', percentage: 20, amount: '$21,250', color: 'bg-emerald-500' },
  { category: 'Bonds & Cash', percentage: 15, amount: '$15,938', color: 'bg-blue-500' },
];

export const testimonials = [
  {
    quote: "SR Investment transformed how I manage my savings. The Growth Accelerator plan gave me a 19% return in under a year!",
    author: "Tanvir Ahmed",
    title: "Software Architect",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    quote: "The interface is so clean and intuitive. Real-time portfolio tracking and expert advisors make wealth building effortless.",
    author: "Sarah Jenkins",
    title: "Startup Founder",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    quote: "Security and transparency are top-notch. I love the ROI calculator which accurately predicted my returns.",
    author: "Rahim Chowdhury",
    title: "Investment Analyst",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  }
];
