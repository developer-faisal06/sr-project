export const defaultDashboardUser = {
  currency: '$',
  name: 'Md. Rahman',
  id: 'SR100245',
  email: 'rahman@example.com',
  phone: '+880 1712 345678',
  reg_date: 'Jan 15, 2025',
  status: 'Active',
  email_verified: true,
  phone_verified: true,
  total_deposited: 5000.00,
  active_investment: 4500.00,
  profit: 750.00,
  monthly_profit: 315.00,
  monthly_profit_pct: 7.00,
  referral: 250.00,
  withdrawable_balance: 600.00,
  reinvestment_balance: 400.00,
  locked_balance: 200.00,
  total_orders: 12,
  available_commission: 100.00,
  pending_commission: 150.00,
  total_referrals: 25,
  team_members: 78,
  active_referrals: 22,
  current_month_profit: 315.00,
  current_month_growth: 12.00,
  previous_month_profit: 281.00
};

export const defaultPortfolio = [
  { id: 'INV-001', date_str: 'Jan 15, 2025', amount: 1000.00, current_value: 1070.00, rate_pct: 7.00, profit: 70.00, status: 'Active' },
  { id: 'INV-002', date_str: 'Feb 10, 2025', amount: 2000.00, current_value: 2140.00, rate_pct: 7.00, profit: 140.00, status: 'Active' },
  { id: 'INV-003', date_str: 'Mar 05, 2025', amount: 1000.00, current_value: 1070.00, rate_pct: 7.00, profit: 70.00, status: 'Active' }
];

export const defaultTransactions = [
  { txn_id: 'TXN-100245', date_time: 'Oct 19, 2025 14:30', type: 'Withdrawal', amount: 100.00, method: 'Bank Transfer', status: 'Completed' },
  { txn_id: 'TXN-100244', date_time: 'Oct 18, 2025 10:15', type: 'Profit Credit', amount: 50.00, method: 'System', status: 'Completed' },
  { txn_id: 'TXN-100243', date_time: 'Oct 17, 2025 16:20', type: 'Deposit', amount: 500.00, method: 'Binance Pay', status: 'Completed' },
  { txn_id: 'TXN-100242', date_time: 'Oct 15, 2025 12:10', type: 'Referral Commission', amount: 25.00, method: 'Referral', status: 'Completed' },
  { txn_id: 'TXN-100241', date_time: 'Oct 14, 2025 09:45', type: 'Reinvestment', amount: 200.00, method: 'Balance', status: 'Processing' }
];
