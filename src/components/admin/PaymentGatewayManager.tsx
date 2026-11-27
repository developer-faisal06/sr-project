import React, { useState } from 'react';
import { useRef } from 'react';
import { Upload, Trash2, Image, Link } from 'lucide-react';
import { uploadGatewayQr, deleteGatewayQr } from '../../services/api';

import { CreditCard, Save, CheckCircle2, Loader2 } from 'lucide-react';
import { notifyError, notifySuccess, notifyWarning } from '../../lib/notify';

export default function PaymentGatewayManager({ gateways = [], onSaveGateway }) {
  const [editingCode, setEditingCode] = useState(null);
  const [draft, setDraft] = useState(null);
  const [savingCode, setSavingCode] = useState(null);
  const [uploadingQr, setUploadingQr] = useState(null);
  const [qrInputMode, setQrInputMode] = useState('upload');
  const fileInputRef = useRef(null);

  const handleQrFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      notifyWarning('Invalid File', 'Only image files (PNG, JPG, WebP, SVG) are allowed.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      notifyWarning('File Too Large', 'QR code image must be under 2 MB.');
      return;
    }
    setUploadingQr(draft.code);
    try {
      const publicUrl = await uploadGatewayQr(draft.code, file);
      updateDraft('qr_code_url', publicUrl);
      notifySuccess('QR Code Uploaded', 'Image uploaded successfully. Save the gateway to apply.');
    } catch (error) {
      notifyError('Upload Failed', error?.message || 'Could not upload QR code image.');
    } finally {
      setUploadingQr(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleQrDelete = async () => {
    if (!draft?.code) return;
    setUploadingQr(draft.code);
    try {
      await deleteGatewayQr(draft.code);
      updateDraft('qr_code_url', '');
      notifySuccess('QR Code Removed', 'Image deleted. Save the gateway to apply.');
    } catch (error) {
      notifyError('Delete Failed', error?.message || 'Could not remove QR code image.');
    } finally {
      setUploadingQr(null);
    }
  };


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
              <div className="flex items-start gap-3">
                {gateway.qr_code_url ? (
                  <img src={gateway.qr_code_url} alt={`${gateway.name} QR`} className="w-10 h-10 rounded-lg border border-[#173b7d] object-contain bg-white shrink-0" />
                ) : (
                  <div className="w-10 h-10 rounded-lg border border-[#173b7d] bg-[#071738] flex items-center justify-center shrink-0">
                    <Image className="w-4 h-4 text-slate-600" />
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-black text-white">{gateway.name}</h4>
                  <div className="flex items-center gap-1.5 flex-wrap mt-1">
                    <span className="text-[10px] text-slate-400">{gateway.code} · {gateway.currency || 'USD'}</span>
                    {gateway.network && (
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-black tracking-wider uppercase ${
                        gateway.code?.toLowerCase().includes('binance') || gateway.name?.toLowerCase().includes('binance')
                          ? 'bg-amber-400 text-slate-950 shadow-sm'
                          : 'bg-[#0f2759] text-amber-300 border border-amber-400/30'
                      }`}>
                        Network: {gateway.network}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-300 mt-1 truncate max-w-[220px] font-mono">{gateway.account_identifier || 'Setup required'}</p>
                </div>
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
                <label className="text-[10px] text-slate-400">Gateway Label / Name<input value={(draft.name ?? '')} onChange={(e) => updateDraft('name', e.target.value)} placeholder="e.g. Binance Pay or Touch 'n Go" className="field mt-1" /></label>
                <label className="text-[10px] text-slate-400">Account / Wallet<input value={(draft.account_identifier ?? '')} onChange={(e) => updateDraft('account_identifier', e.target.value)} placeholder="Wallet, mobile, or account number" className="field mt-1" /></label>
                <label className="text-[10px] text-slate-400">Currency<input value={(draft.currency ?? '')} onChange={(e) => updateDraft('currency', e.target.value.toUpperCase())} placeholder="USD / BDT / MYR" className="field mt-1" /></label>
                <label className="text-[10px] text-slate-400">Network<input value={(draft.network ?? '')} onChange={(e) => updateDraft('network', e.target.value)} placeholder="TRC20 / Wallet / Mobile" className="field mt-1" /></label>
                {/* QR Code Upload / Link Section */}
                <div className="sm:col-span-2 rounded-xl border border-[#173b7d] bg-[#030a1a] p-3.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                      <Image className="w-3.5 h-3.5" /> QR Code / Payment Image
                    </span>
                    <div className="flex bg-[#071738] rounded-lg border border-[#173b7d] overflow-hidden">
                      <button type="button" onClick={() => setQrInputMode('upload')} className={`px-2 py-0.5 text-[9px] font-bold transition ${qrInputMode === 'upload' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}>
                        <Upload className="w-2.5 h-2.5 inline mr-1" />Upload
                      </button>
                      <button type="button" onClick={() => setQrInputMode('url')} className={`px-2 py-0.5 text-[9px] font-bold transition ${qrInputMode === 'url' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}>
                        <Link className="w-2.5 h-2.5 inline mr-1" />URL
                      </button>
                    </div>
                  </div>

                  {qrInputMode === 'upload' ? (
                    <div className="flex items-start gap-3">
                      {/* Preview Box */}
                      <div className="shrink-0">
                        {draft.qr_code_url ? (
                          <div className="relative group">
                            <img src={draft.qr_code_url} alt="QR Preview" className="w-20 h-20 rounded-xl border border-amber-400/40 object-contain bg-white p-1 shadow-md" />
                            <button type="button" onClick={handleQrDelete} disabled={uploadingQr === draft.code} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-80 hover:opacity-100 transition shadow" title="Remove QR Image">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="w-20 h-20 rounded-xl border-2 border-dashed border-[#173b7d] bg-[#071738] flex flex-col items-center justify-center text-slate-500">
                            <Image className="w-5 h-5 mb-0.5 text-slate-600" />
                            <span className="text-[8px]">No QR</span>
                          </div>
                        )}
                      </div>

                      {/* Upload Button & Info */}
                      <div className="flex-1 space-y-1.5">
                        <input type="file" ref={fileInputRef} accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={handleQrFileSelect} className="hidden" id={`qr-file-${draft.code}`} />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploadingQr === draft.code}
                          className="w-full py-2.5 px-3 rounded-xl border-2 border-dashed border-amber-400/40 bg-[#071738] hover:bg-amber-400/10 hover:border-amber-400 transition flex items-center justify-center gap-2 text-amber-300 font-bold disabled:opacity-50"
                        >
                          {uploadingQr === draft.code ? (
                            <><Loader2 className="w-4 h-4 animate-spin text-amber-400" /><span className="text-[10px]">Uploading image...</span></>
                          ) : (
                            <><Upload className="w-4 h-4 text-amber-400" /><span className="text-[10px]">Upload QR Image</span></>
                          )}
                        </button>
                        <p className="text-[9px] text-slate-400">PNG, JPG, WebP, SVG · Max 2MB</p>
                        {draft.qr_code_url && (
                          <p className="text-[9px] text-emerald-400 flex items-center gap-1 font-semibold truncate max-w-[280px]">
                            <CheckCircle2 className="w-3 h-3 shrink-0" /> QR Code saved
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <input type="url" value={(draft.qr_code_url ?? '')} onChange={(e) => updateDraft('qr_code_url', e.target.value)} placeholder="https://example.com/qr-code.png" className="field" />
                      {draft.qr_code_url && (
                        <div className="flex items-center gap-2 pt-1">
                          <img src={draft.qr_code_url} alt="QR Preview" className="w-12 h-12 rounded-lg border border-amber-400/30 object-contain bg-white p-0.5" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                          <span className="text-[9px] text-emerald-400 flex items-center gap-1 font-semibold">
                            <CheckCircle2 className="w-3 h-3" /> Preview OK
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
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
