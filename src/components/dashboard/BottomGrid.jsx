import React from 'react';
import ReferralPanel from './ReferralPanel';
import WithdrawPanel from './WithdrawPanel';
import ReinvestPanel from './ReinvestPanel';
import TransactionsTable from './TransactionsTable';
import AccountInfoCard from './AccountInfoCard';
import TrophyCard from './TrophyCard';

export default function BottomGrid({
  user,
  fmt,
  cur,
  reinvestAmount,
  setReinvestAmount,
  handleConfirmReinvest,
  onWithdraw,
  handleCopyLink,
  transactions,
  onEditProfile,
  settings,
  holidays = []
}) {
  return (
    <div className="space-y-5">
      {/* 3 Top Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <ReferralPanel user={user} fmt={fmt} handleCopyLink={handleCopyLink} />
        <WithdrawPanel user={user} fmt={fmt} onWithdraw={onWithdraw} settings={settings} holidays={holidays} />
        <ReinvestPanel 
          user={user} 
          fmt={fmt} 
          cur={cur} 
          reinvestAmount={reinvestAmount} 
          setReinvestAmount={setReinvestAmount} 
          handleConfirmReinvest={handleConfirmReinvest} 
        />
      </div>

      {/* 2 Bottom Columns: Recent Transactions (Span 2) & Account Info + Trophy */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <TransactionsTable transactions={transactions} fmt={fmt} />
        <div className="space-y-4">
          <AccountInfoCard user={user} onEditProfile={onEditProfile} />
          <TrophyCard />
        </div>
      </div>
    </div>
  );
}
