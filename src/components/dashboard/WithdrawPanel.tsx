import React, { useEffect, useState } from 'react';
import { Upload, LockKeyhole, Clock3 } from 'lucide-react';
import { fetchWithdrawalEligibility } from '../../services/api';
import { calculateUnlockDate } from '../../utils/workingDays';

export default function WithdrawPanel({ user, fmt, onWithdraw, settings = {}, holidays = [] }) {
  const [eligibility, setEligibility] = useState(null);
  useEffect(() => { let active = true; fetchWithdrawalEligibility(user?.id).then((data) => { if (active) setEligibility(data); }).catch(() => {}); return () => { active = false; }; }, [user?.id]);

  const depositUnlock = user?.first_deposit_approved_at
    ? calculateUnlockDate(user.first_deposit_approved_at, Number((settings as any).deposit_lock_working_days || 30), holidays)
    : null;
  const depositLockedByDate = Boolean(depositUnlock && !depositUnlock.isUnlocked);
  const lockedDeposit = Number(eligibility?.locked_deposit ?? user.locked_balance ?? 0);
  const lockedProfit = Number(eligibility?.locked_profit ?? 0);
  const lockedReferral = Number(eligibility?.locked_referral_commission ?? 0);
  const hasLock = Boolean(depositLockedByDate || eligibility?.deposit_lock_active || eligibility?.referral_lock_active || lockedDeposit || lockedProfit || lockedReferral);
  const warningText = (settings as any).withdraw_warning_text || 'Withdrawals may remain locked until the required working-day holding period has elapsed.';
  return (
    <div className="bg-[#051330] border border-[#173870] rounded-2xl p-4 shadow-xl flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-center space-x-2 text-white font-bold text-sm pb-3 border-b border-[#143063]">
          <Upload className="w-4 h-4 text-amber-400" />
          <span>Withdraw Your Funds</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3 items-center">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                $
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Available Balance</span>
                <span className="text-base font-black text-white block">{fmt(user.withdrawable_balance)}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold">
                🔒
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Locked Balance</span>
                <span className="text-xs font-bold text-amber-300 block">{fmt(lockedDeposit + lockedProfit + lockedReferral)}</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={onWithdraw}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:brightness-110 text-white font-bold text-xs shadow-lg flex items-center justify-center space-x-1 transition"
            >
              <span>Request Withdrawal ➔</span>
            </button>
            <span className="text-[10px] font-semibold text-slate-400 mt-1 block">
              Min. Amount: {fmt(50)}
            </span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-[#122b59] flex items-start gap-2 text-[10px] text-amber-100 bg-amber-950/30 p-3 rounded-lg border border-amber-700/30">
          <LockKeyhole className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{warningText}</span>
        </div>
        {depositUnlock && <div className="flex items-center gap-2 text-[10px] text-amber-300"><Clock3 className="w-3.5 h-3.5" />{depositLockedByDate ? `${depositUnlock.workingDaysCompleted}/${(settings as any).deposit_lock_working_days || 30} working days complete · ${depositUnlock.workingDaysRemaining} remain · unlock ${depositUnlock.unlockDateISO}` : 'Deposit/profit lock period completed.'}</div>}
        {!depositUnlock && eligibility?.deposit_lock_until && <div className="flex items-center gap-2 text-[10px] text-amber-300"><Clock3 className="w-3.5 h-3.5" />{eligibility.working_days_completed || 0}/{eligibility.working_days_required || 30} working days completed · Unlock {eligibility.deposit_lock_until}</div>}
        {lockedReferral > 0 && <p className="text-[10px] text-amber-300">Referral commission pending: {fmt(lockedReferral)} · required holding period {(settings as any).referral_lock_working_days || 45} working days.</p>}
      </div>
    </div>
  );
}
