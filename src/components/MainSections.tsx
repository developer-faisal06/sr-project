import React from 'react';
import InvestmentPlansCard from './InvestmentPlansCard';
import ReferralCard from './ReferralCard';
import DashboardPreviewCard from './DashboardPreviewCard';

export default function MainSections({ plans, settings, onInvest, onCopyReferral, onWithdraw, onReinvest, userData, onNavigate, isLoggedIn }: any) {
  return (
    <section className="py-8 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Row 1: Investment Plans in 4 columns */}
      <div className="w-full">
        <InvestmentPlansCard plans={plans} onInvest={onInvest} />
      </div>

      {/* Row 2: Referral Commission & User Dashboard Preview in 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div className="w-full">
          <ReferralCard rates={settings} onCopyReferral={onCopyReferral} />
        </div>
        <div className="w-full">
          <DashboardPreviewCard 
            onWithdraw={onWithdraw} 
            onReinvest={onReinvest} 
            userData={userData} 
          />
        </div>
      </div>

    </section>
  );
}


