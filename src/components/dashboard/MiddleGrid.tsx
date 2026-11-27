import React from 'react';
import PortfolioTable from './PortfolioTable';
import ProfitChart from './ProfitChart';
import QuickActions from './QuickActions';

export default function MiddleGrid({
  portfolio,
  user,
  fmt,
  onDeposit,
  onWithdraw,
  onReinvest,
  onNavigateTab,
  handleCopyLink,
  copied
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <PortfolioTable 
        portfolio={portfolio} 
        fmt={fmt} 
        onViewAll={() => onNavigateTab ? onNavigateTab('investments') : null} 
      />
      <ProfitChart user={user} fmt={fmt} />
      <QuickActions 
        onDeposit={onDeposit} 
        onWithdraw={onWithdraw} 
        onReinvest={onReinvest} 
        onNavigateTab={onNavigateTab}
        handleCopyLink={handleCopyLink} 
        copied={copied} 
      />
    </div>
  );
}
