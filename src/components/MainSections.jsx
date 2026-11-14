import React from 'react';
import InvestmentPlansCard from './InvestmentPlansCard';
import ReferralCard from './ReferralCard';
import DashboardPreviewCard from './DashboardPreviewCard';

export default function MainSections({ plans, settings, onInvest, onCopyReferral, onWithdraw, onReinvest, userData, onNavigate, isLoggedIn }) {
  return (
    <section className="py-8 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Col 1: Dynamic Investment Plans */}
        <div className="lg:col-span-5 flex">
          <div className="w-full">
            <InvestmentPlansCard plans={plans} onInvest={onInvest} />
          </div>
        </div>

        {/* Col 2: Dynamic Referral Commission */}
        <div className="lg:col-span-3 xl:col-span-3 flex">
          <div className="w-full">
            <ReferralCard rates={settings} onCopyReferral={onCopyReferral} />
          </div>
        </div>

        {/* Col 3: Dynamic User Dashboard Preview */}
        <div className="lg:col-span-4 xl:col-span-4 flex">
          <div className="w-full">
            <DashboardPreviewCard 
              onWithdraw={onWithdraw} 
              onReinvest={onReinvest} 
              userData={userData} 
            />
          </div>
        </div>

      </div>
    </section>
  );
}

