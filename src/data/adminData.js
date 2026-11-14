export const MASTER_ADMIN_EMAIL = 'mrfaisal795@gmail.com';

export const initialUsers = [
  { id: 'SR-ADMIN-FAISAL', name: 'Faisal (Master Admin)', email: 'mrfaisal795@gmail.com', role: 'admin', invested: 0, balance: 0, status: 'Active', joinedDate: '2026-01-10' },
  { id: 'SR100245', name: 'Md. Rahman', email: 'trader@srinvestment.com', role: 'user', invested: 500, balance: 75, status: 'Active', joinedDate: '2026-02-14' },
  { id: 'SR100892', name: 'Tanvir Ahmed', email: 'tanvir@gmail.com', role: 'user', invested: 1000, balance: 120, status: 'Active', joinedDate: '2026-02-28' },
  { id: 'SR100944', name: 'Sharmin Sultana', email: 'sharmin@yahoo.com', role: 'user', invested: 2500, balance: 340, status: 'Active', joinedDate: '2026-03-05' },
];

export const initialWithdrawals = [
  { id: 101, userName: 'Tanvir Ahmed', userEmail: 'tanvir@gmail.com', amount: 50, method: 'bKash', account: '01712345678', date: 'Today, 14:20', status: 'Pending', txId: 'TXN-98421' },
  { id: 102, userName: 'Md. Rahman', userEmail: 'trader@srinvestment.com', amount: 25, method: 'Nagad', account: '01887654321', date: 'Yesterday, 19:10', status: 'Approved', txId: 'TXN-87612' },
  { id: 103, userName: 'Sharmin Sultana', userEmail: 'sharmin@yahoo.com', amount: 150, method: 'USDT (TRC20)', account: 'TJk89qLx14890mNz', date: '3 days ago', status: 'Approved', txId: 'TXN-76190' },
];

