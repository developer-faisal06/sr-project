import React, { useEffect, useState } from 'react';
import { LockKeyhole, Plus, RefreshCw, Unlock, CalendarDays, Trash2, Save, Megaphone } from 'lucide-react';
import { createManualWithdrawalLock, fetchAllWithdrawalLocks, releaseWithdrawalLock, fetchHolidays, createHolidaysWithNotification, deleteHoliday, updateSiteSettings } from '../../services/api';
import { notifyError, notifySuccess, notifyWarning } from '../../lib/notify';

export default function LockManagement({ users = [], settings = {} }) {
  const [locks, setLocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [holidays, setHolidays] = useState([]);
  const [holidayForm, setHolidayForm] = useState({ dates: '', recurring: false, dayOfWeek: 3, title: '', message: '' });
  const [settingsForm, setSettingsForm] = useState({ global_notice_text: settings.global_notice_text || '', global_notice_visible: settings.global_notice_visible !== false, global_notice_style: settings.global_notice_style || 'warning', withdraw_warning_text: settings.withdraw_warning_text || '', invest_warning_text: settings.invest_warning_text || '' });
  const [form, setForm] = useState({ userId: '', lockType: 'MANUAL_HOLD', amount: '', days: 30, reason: '' });
  const load = async () => { setLoading(true); try { setLocks(await fetchAllWithdrawalLocks()); } catch (error) { notifyError('Lock Load Failed', error?.message || 'Could not load lock records.'); } finally { setLoading(false); } };
  const loadHolidays = async () => { try { setHolidays(await fetchHolidays()); } catch (error) { notifyError('Holiday Load Failed', error?.message || 'Could not load holidays.'); } };
  useEffect(() => { load(); loadHolidays(); }, []);
  const update = (key, value) => setForm((previous) => ({ ...previous, [key]: value }));
  const updateHoliday = (key, value) => setHolidayForm((previous) => ({ ...previous, [key]: value }));
  const updateSetting = (key, value) => setSettingsForm((previous) => ({ ...previous, [key]: value }));

  const saveHoliday = async (event) => {
    event.preventDefault();
    const dates = holidayForm.dates.split(',').map((value) => value.trim()).filter(Boolean);
    if (!holidayForm.title.trim() || (!holidayForm.recurring && !dates.length)) {
      notifyWarning('Holiday Details Required', 'Add a title and date(s), or choose a recurring weekday.');
      return;
    }
    try {
      await createHolidaysWithNotification({ dates, isRecurring: holidayForm.recurring, dayOfWeek: holidayForm.dayOfWeek, title: holidayForm.title, notificationMessage: holidayForm.message });
      await loadHolidays();
      setHolidayForm({ dates: '', recurring: false, dayOfWeek: 3, title: '', message: '' });
      notifySuccess('Holiday Saved', 'Holiday schedule and notification were saved.');
    } catch (error) { notifyError('Holiday Save Failed', error?.message || 'Could not save holiday schedule.'); }
  };

  const removeHoliday = async (holiday) => {
    try { await deleteHoliday(holiday.id, holiday.kind); await loadHolidays(); notifySuccess('Holiday Removed', 'The holiday was removed from the working-day calendar.'); }
    catch (error) { notifyError('Holiday Remove Failed', error?.message || 'Could not remove holiday.'); }
  };

  const saveSettings = async (event) => {
    event.preventDefault();
    try { await updateSiteSettings(settingsForm); notifySuccess('Settings Saved', 'Notice and lock warning settings updated.'); }
    catch (error) { notifyError('Settings Save Failed', error?.message || 'Could not update settings.'); }
  };
  const create = async (event) => {
    event.preventDefault();
    if (!form.userId || !form.amount || form.days === '' || form.reason.trim().length < 3) { notifyWarning('Required Fields', 'Select a user, enter amount/days, and provide a reason.'); return; }
    try { const created = await createManualWithdrawalLock(form); setLocks((rows) => [created, ...rows]); setForm({ userId: '', lockType: 'MANUAL_HOLD', amount: '', days: 30, reason: '' }); setShowForm(false); notifySuccess('Lock Created', 'The manual lock was saved and audited.'); } catch (error) { notifyError('Lock Creation Failed', error?.message || 'Could not create lock.'); }
  };
  const release = async (lock) => {
    const reason = window.prompt('Enter a reason for releasing this lock:');
    if (!reason || reason.trim().length < 3) return;
    try { const updated = await releaseWithdrawalLock(lock.id, reason); setLocks((rows) => rows.map((row) => row.id === lock.id ? updated : row)); notifySuccess('Lock Released', 'The release was saved to the audit log.'); } catch (error) { notifyError('Release Failed', error?.message || 'Could not release lock.'); }
  };

  return <div className="bg-[#071738] border border-[#173b7d] rounded-2xl p-5 shadow-xl space-y-5 text-xs">
    <div className="flex flex-col sm:flex-row justify-between gap-3"><div><h3 className="text-lg font-black text-white flex items-center gap-2"><LockKeyhole className="w-5 h-5 text-amber-400" /> Lock &amp; Release Management</h3><p className="text-slate-400">View, create and release withdrawal locks with database audit logging.</p></div><div className="flex gap-2"><button onClick={load} className="px-3 py-2 rounded-lg border border-[#173b7d] text-slate-300 flex items-center gap-1"><RefreshCw className="w-3.5 h-3.5" />Refresh</button><button onClick={() => setShowForm((value) => !value)} className="px-3 py-2 rounded-lg bg-amber-400 text-slate-950 font-black flex items-center gap-1"><Plus className="w-3.5 h-3.5" />Add Lock</button></div></div>
    <section className="rounded-2xl border border-cyan-500/30 bg-[#030a1a] p-4 space-y-4">
      <h4 className="flex items-center gap-2 text-sm font-black text-cyan-300"><CalendarDays className="w-4 h-4" /> Holiday &amp; Global Notice Manager</h4>
      <form onSubmit={saveHoliday} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <input type="text" placeholder="Dates: 2026-12-25, 2026-12-31" value={holidayForm.dates} onChange={(e) => updateHoliday('dates', e.target.value)} className="field lg:col-span-2" disabled={holidayForm.recurring} />
        <select value={holidayForm.dayOfWeek} onChange={(e) => updateHoliday('dayOfWeek', Number(e.target.value))} className="field" disabled={!holidayForm.recurring}><option value={0}>Every Sunday</option><option value={1}>Every Monday</option><option value={2}>Every Tuesday</option><option value={3}>Every Wednesday</option><option value={4}>Every Thursday</option><option value={5}>Every Friday</option><option value={6}>Every Saturday</option></select>
        <label className="field flex items-center gap-2"><input type="checkbox" checked={holidayForm.recurring} onChange={(e) => updateHoliday('recurring', e.target.checked)} /> Recurring weekday</label>
        <input required placeholder="Holiday title" value={holidayForm.title} onChange={(e) => updateHoliday('title', e.target.value)} className="field" />
        <input placeholder="Exact notification message (optional)" value={holidayForm.message} onChange={(e) => updateHoliday('message', e.target.value)} className="field lg:col-span-2" />
        <button className="rounded-lg bg-cyan-500 py-2 font-black text-slate-950 flex items-center justify-center gap-1"><Megaphone className="w-3.5 h-3.5" />Save Holiday &amp; Broadcast</button>
      </form>
      <div className="flex flex-wrap gap-2">{holidays.map((holiday) => <div key={`${holiday.kind}-${holiday.id}`} className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-[10px] text-slate-300"><span>{holiday.is_recurring_day ? `Every weekday ${holiday.day_of_week}` : holiday.date} · {holiday.title}</span><button type="button" onClick={() => removeHoliday(holiday)} className="text-rose-300 hover:text-rose-100"><Trash2 className="w-3 h-3" /></button></div>)}</div>
      <form onSubmit={saveSettings} className="grid grid-cols-1 md:grid-cols-2 gap-3 border-t border-slate-800 pt-3">
        <textarea placeholder="Global notice text" value={settingsForm.global_notice_text} onChange={(e) => updateSetting('global_notice_text', e.target.value)} className="field md:col-span-2" rows="2" />
        <select value={settingsForm.global_notice_style} onChange={(e) => updateSetting('global_notice_style', e.target.value)} className="field"><option value="info">Info</option><option value="warning">Warning</option><option value="danger">Danger</option><option value="cyan">Cyan</option><option value="gold">Gold</option></select>
        <label className="field flex items-center gap-2"><input type="checkbox" checked={settingsForm.global_notice_visible} onChange={(e) => updateSetting('global_notice_visible', e.target.checked)} /> Show global notice</label>
        <textarea placeholder="Withdrawal warning text" value={settingsForm.withdraw_warning_text} onChange={(e) => updateSetting('withdraw_warning_text', e.target.value)} className="field" rows="2" />
        <textarea placeholder="Investment warning text" value={settingsForm.invest_warning_text} onChange={(e) => updateSetting('invest_warning_text', e.target.value)} className="field" rows="2" />
        <button className="md:col-span-2 rounded-lg bg-emerald-500 py-2 font-black text-white flex items-center justify-center gap-1"><Save className="w-3.5 h-3.5" />Save Notice &amp; Warning Settings</button>
      </form>
    </section>

    {showForm && <form onSubmit={create} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-4 rounded-xl bg-[#030a1a] border border-amber-400/30"><select value={form.userId} onChange={(e) => update('userId', e.target.value)} className="field"><option value="">Select user</option>{users.filter((user) => user.role !== 'admin').map((user) => <option key={user.id} value={user.id}>{user.name} — {user.id}</option>)}</select><select value={form.lockType} onChange={(e) => update('lockType', e.target.value)} className="field"><option value="MANUAL_HOLD">Manual hold</option><option value="RISK_HOLD">Risk hold</option><option value="PROFIT">Profit</option><option value="FIRST_DEPOSIT">First deposit</option></select><input type="number" min="0.01" step="0.01" placeholder="Amount" value={form.amount} onChange={(e) => update('amount', e.target.value)} className="field" /><input type="number" min="0" placeholder="Working days" value={form.days} onChange={(e) => update('days', e.target.value)} className="field" /><input placeholder="Reason (required)" value={form.reason} onChange={(e) => update('reason', e.target.value)} className="field" /><button className="sm:col-span-2 lg:col-span-5 py-2 rounded-lg bg-emerald-500 text-white font-black">Create audited lock</button></form>}
    {loading ? <p className="py-8 text-center text-amber-300">Loading lock records...</p> : <div className="sr-table-wrap"><table className="w-full text-left"><thead><tr className="border-b border-[#173b7d] text-slate-400 uppercase"><th className="p-3">User</th><th className="p-3">Type</th><th className="p-3">Amount</th><th className="p-3">Unlock date</th><th className="p-3">Status</th><th className="p-3 text-right">Action</th></tr></thead><tbody className="divide-y divide-[#173b7d]/50">{locks.length === 0 ? <tr><td colSpan="6" className="p-8 text-center text-slate-500">No database lock records found. Apply the migration and approve a deposit first.</td></tr> : locks.map((lock) => <tr key={lock.id}><td className="p-3 text-white font-bold">{users.find((user) => user.id === lock.user_id)?.name || lock.user_id}</td><td className="p-3 text-amber-300">{lock.lock_type}</td><td className="p-3 text-white font-bold">${Number(lock.principal_amount || lock.profit_amount || lock.referral_amount || 0).toFixed(2)}</td><td className="p-3 text-slate-300">{lock.unlock_date || '—'}</td><td className="p-3"><span className="px-2 py-1 rounded bg-amber-400/10 text-amber-300">{lock.status}</span></td><td className="p-3 text-right">{['RELEASED','CANCELLED'].includes(lock.status) ? <span className="text-slate-500">Closed</span> : <button onClick={() => release(lock)} className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold flex items-center gap-1 ml-auto"><Unlock className="w-3 h-3" />Release</button>}</td></tr>)}</tbody></table></div>}
    <style>{`.field{width:100%;padding:.55rem .7rem;border-radius:.6rem;background:#071738;border:1px solid #173b7d;color:white;outline:none}.field:focus{border-color:#fbbf24}`}</style>
  </div>;
}
