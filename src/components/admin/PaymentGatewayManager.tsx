import React, { useState } from 'react';
import { CreditCard, Save, CheckCircle2, Loader2 } from 'lucide-react';
import { notifyError, notifySuccess, notifyWarning } from '../../lib/notify';

export default function PaymentGatewayManager({ gateways = [], onSaveGateway }) {
  const [editingCode, setEditingCode] = useState(null);
  const [draft, setDraft] = useState(null);
  const [savingCode, setSavingCode] = useState(null);

  const startEdit = (gateway) => {
    setEditingCode(gateway.code);
    setDraft({
      code: gateway.code,
      name: gateway.name || '',
      enabled: Boolean(gateway.enabled),
      currency: gateway.currency || 'USD',
      network: gateway.network || '',
      account_identifier: gateway.account_identifier || '',
      qr_code_url: gateway.qr_code_url || '',
      instructions: gateway.instructions || '',
      fee_percent: gateway.fee_percent ?? 0,
      min_amount: gateway.min_amount ?? 0,
      max_amount: gateway.max_amount ?? ''
    });
  };

  const updateDraft = (key, value) => setDraft((previous) => ({ ...previous, [key]: value }));

  const saveGateway = async (event) => {
    event.preventDefault();
    if (!draft?.account_identifier?.trim()) {
      notifyWarning('Account Required', 'Add a wallet, mobile number, or account identifier.');
      return;
    }
    if (Number(draft.max_amount || 0) > 0 && Number(draft.max_amount) < Number(draft.min_amount || 0)) {
      notifyWarning('Invalid Limits', 'Maximum amount must be greater than minimum amount.');
      return;
    }
    setSavingCode(draft.code);
    try {
      await onSaveGateway({ ...draft, enabled: Boolean(draft.enabled) });
      setEditingCode(null);
      setDraft(null);
    } catch (error) {
      notifyError('Gateway Update Failed', error?.message || 'Could not save gateway settings.');
    } finally {
      setSavingCode(null);
    }
  };

  const toggleGateway = async (gateway) => {
    if (!gateway.enabled) {
      startEdit({ ...gateway, enabled: true });
      return;
    }
    setSavingCode(gateway.code);
    try {
      await onSaveGateway({ code: gateway.code, enabled: false });
    } catch (error) {
      notifyError('Gateway Update Failed', error?.message || 'Could not disable gateway.');
    } finally {
      setSavingCode(null);
    }
  };

  return (
    <div className="bg-[#071738] border border-[#173b7d] rounded-2xl p-5 shadow-xl space-y-5 text-xs">
      <div className="flex items-center space-x-2 pb-3 border-b border-[#173b7d]">
        <CreditCard className="w-5 h-5 text-amber-400" />
        <div>
          <h3 className="font-black text-white text-base">Payment Gateways &amp; QR Code Manager</h3>
          <p className="text-[11px] text-slate-400">Each gateway has its own setup and database save control.</p>
        </div>
      </div>

      {gateways.length === 0 && <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-amber-200">No payment gateways found. Run the database migration first.</div>}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {gateways.map((gateway) => (
          <section key={gateway.code} className={`rounded-2xl border p-4 transition ${gateway.enabled ? 'border-emerald-400/40 bg-[#061d2d]' : 'border-[#173b7d] bg-[#030a1a]'}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-sm font-black text-white">{gateway.name}</h4>
                <p className="text-[10px] text-slate-400 mt-1">{gateway.code} · {gateway.currency || 'USD'} · {gateway.network || 'Network not set'}</p>
                <p className="text-[10px] text-slate-300 mt-1 truncate max-w-[260px]">{gateway.account_identifier || 'Setup required'}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[10px] font-black ${gateway.enabled ? 'text-emerald-400' : 'text-slate-500'}`}>{gateway.enabled ? 'ON' : 'OFF'}</span>
                <button type="button" onClick={() => toggleGateway(gateway)} disabled={savingCode === gateway.code} className={`relative w-12 h-6 rounded-full transition ${gateway.enabled ? 'bg-emerald-500' : 'bg-slate-700'} disabled:opacity-50`} aria-label={`Toggle ${gateway.name}`}>
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition ${gateway.enabled ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>

            {editingCode === gateway.code && draft ? (
              <form onSubmit={saveGateway} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-[#173b7d] pt-4">
                <label className="text-[10px] text-slate-400">Account / Wallet<input value={(draft.account_identifier ?? '')} onChange={(e) => updateDraft('account_identifier', e.target.value)} placeholder="Wallet, mobile, or account number" className="field mt-1" /></label>
                <label className="text-[10px] text-slate-400">Currency<input value={(draft.currency ?? '')} onChange={(e) => updateDraft('currency', e.target.value.toUpperCase())} placeholder="USD / BDT / MYR" className="field mt-1" /></label>
                <label className="text-[10px] text-slate-400">Network<input value={(draft.network ?? '')} onChange={(e) => updateDraft('network', e.target.value)} placeholder="TRC20 / Wallet / Mobile" className="field mt-1" /></label>
                <label className="text-[10px] text-slate-400">QR Code URL<input type="url" value={(draft.qr_code_url ?? '')} onChange={(e) => updateDraft('qr_code_url', e.target.value)} placeholder="https://..." className="field mt-1" /></label>
                <label className="text-[10px] text-slate-400">Fee %<input type="number" min="0" step="0.01" value={(draft.fee_percent ?? '')} onChange={(e) => updateDraft('fee_percent', e.target.value)} className="field mt-1" /></label>
                <label className="text-[10px] text-slate-400">Minimum amount<input type="number" min="0" value={(draft.min_amount ?? '')} onChange={(e) => updateDraft('min_amount', e.target.value)} className="field mt-1" /></label>
                <label className="text-[10px] text-slate-400">Maximum amount<input type="number" min="0" value={(draft.max_amount ?? '')} onChange={(e) => updateDraft('max_amount', e.target.value)} placeholder="No limit" className="field mt-1" /></label>
                <label className="text-[10px] text-slate-400">Display order<input type="number" min="1" value={draft.sort_order || gateway.sort_order || 1} onChange={(e) => updateDraft('sort_order', e.target.value)} className="field mt-1" /></label>
                <label className="text-[10px] text-slate-400 sm:col-span-2">Payment instructions<textarea value={draft.instructions} onChange={(e) => updateDraft('instructions', e.target.value)} placeholder="Instructions shown to users" rows={3} className="field mt-1 resize-none" /></label>
                <label className="flex items-center gap-2 text-xs text-slate-300 sm:col-span-2"><input type="checkbox" checked={draft.enabled} onChange={(e) => updateDraft('enabled', e.target.checked)} className="accent-amber-400" />Enable this gateway after saving</label>
                <div className="flex justify-end gap-2 sm:col-span-2"><button type="button" onClick={() => { setEditingCode(null); setDraft(null); }} className="px-3 py-2 rounded-lg bg-slate-700 text-white font-bold">Cancel</button><button type="submit" disabled={savingCode === gateway.code} className="px-3 py-2 rounded-lg bg-emerald-500 text-white font-black flex items-center gap-1">{savingCode === gateway.code ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}Save to Database</button></div>
              </form>
            ) : (
              <button type="button" onClick={() => startEdit(gateway)} className="mt-4 w-full py-2 rounded-lg border border-amber-400/40 text-amber-300 font-black hover:bg-amber-400/10">{gateway.enabled ? 'Edit Gateway Setup' : 'Setup Gateway'}</button>
            )}
          </section>
        ))}
      </div>

      <style>{`.field{width:100%;padding:.55rem .7rem;border-radius:.6rem;background:#071738;border:1px solid #173b7d;color:white;outline:none}.field:focus{border-color:#fbbf24}`}</style>
    </div>
  );
}
