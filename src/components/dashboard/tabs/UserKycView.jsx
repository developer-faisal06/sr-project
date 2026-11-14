import React, { useEffect, useState } from 'react';
import { ShieldCheck, Save, Loader2, CheckCircle2, AlertCircle, Upload, FileText } from 'lucide-react';
import { notifyError, notifySuccess, notifyWarning } from '../../../lib/notify';
import { fetchKycDocumentList, saveKycDocument } from '../../../services/api';


const empty = {
  user_id: '',
  legal_name: '',
  date_of_birth: '',
  nationality: '',
  country: '',
  address_line: '',
  city: '',
  state: '',
  postal_code: '',
  tax_residency: '',
  source_of_funds: '',
  source_of_income: ''
};

export default function UserKycView({ user, fetchKycProfile, saveKycProfile }) {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState('NOT_STARTED');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [docType, setDocType] = useState('NATIONAL_ID_FRONT');
  const [docFile, setDocFile] = useState(null);
  const [docPreview, setDocPreview] = useState('');
  const [docSaving, setDocSaving] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      try {
        const profile = await fetchKycProfile?.(user?.id);
        if (!active) return;
        if (profile) {
          setForm({
            ...empty,
            user_id: user?.id || '',
            legal_name: profile.legal_name || '',
            date_of_birth: profile.date_of_birth || '',
            nationality: profile.nationality || '',
            country: profile.country || '',
            address_line: profile.address_line || '',
            city: profile.city || '',
            state: profile.state || '',
            postal_code: profile.postal_code || '',
            tax_residency: profile.tax_residency || '',
            source_of_funds: profile.source_of_funds || '',
            source_of_income: profile.source_of_income || ''
          });
          setStatus(profile.kyc_status || 'NOT_STARTED');
        } else {
          setForm({ ...empty, user_id: user?.id || '' });
          setStatus('NOT_STARTED');
        }
        const docs = await fetchKycDocumentList(user?.id);
        if (active) setDocuments(docs || []);
      } catch (error) {
        notifyError('KYC Load Failed', error?.message || 'Could not load your KYC details.');
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, [user?.id, fetchKycProfile]);

  const onChange = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleDocumentSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      notifyWarning('Invalid document', 'Upload an image or PDF file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      notifyWarning('Document too large', 'KYC documents must be smaller than 5MB.');
      return;
    }
    setDocFile(file);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setDocPreview(String(reader.result || ''));
      reader.readAsDataURL(file);
    } else {
      setDocPreview('');
    }
  };

  const handleDocumentUpload = async () => {
    if (!user?.id || !docFile) {
      notifyWarning('Document required', 'Choose a document before uploading.');
      return;
    }
    setDocSaving(true);
    try {
      const reader = new FileReader();
      const encoded = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(String(reader.result || ''));
        reader.onerror = reject;
        reader.readAsDataURL(docFile);
      });
      const saved = await saveKycDocument({ user_id: user.id, kyc_profile_id: user.id, doc_type: docType, storage_path: encoded });
      setDocuments((current) => [saved, ...current.filter((doc) => doc.id !== saved.id)]);
      setDocFile(null);
      setDocPreview('');
      notifySuccess('Document Uploaded', 'Your verification document was added to the KYC application.');
    } catch (error) {
      notifyError('Upload Failed', error?.message || 'Could not upload the KYC document.');
    } finally {
      setDocSaving(false);
    }
  };


  const onSubmit = async (event) => {
    event.preventDefault();
    if (!user?.id) {
      notifyWarning('Missing user', 'No user profile is available.');
      return;
    }
    if (!form.legal_name?.trim()) {
      notifyWarning('Legal name required', 'Please provide your full legal name.');
      return;
    }

    setSaving(true);
    try {
      const payload = { ...form, user_id: user.id };
      await saveKycProfile?.(payload);
      setStatus('SUBMITTED');
      notifySuccess('KYC Submitted', 'Your KYC information has been saved and submitted for review.');
    } catch (error) {
      notifyError('KYC Save Failed', error?.message || 'Could not save your KYC profile.');
    } finally {
      setSaving(false);
    }
  };

  const chipClass = status === 'APPROVED'
    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/40'
    : status === 'REJECTED'
      ? 'bg-rose-500/10 text-rose-300 border border-rose-500/40'
      : status === 'SUBMITTED' || status === 'UNDER_REVIEW'
        ? 'bg-amber-500/10 text-amber-300 border border-amber-500/40'
        : 'bg-slate-700/40 text-slate-300 border border-slate-600';

  return (
    <div className="space-y-6">
      <div className="bg-[#051330] border border-[#173870] rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-[0.16em]">Identity Verification</span>
            <h2 className="mt-2 text-2xl font-black text-white">KYC & Verification</h2>
          </div>
          <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold ${chipClass}`}>
            {status === 'APPROVED' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {status}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-[#051330] border border-[#173870] rounded-2xl p-12 flex items-center justify-center text-amber-300">
          <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading KYC profile...
        </div>
      ) : (
        <form onSubmit={onSubmit} className="bg-[#051330] border border-[#173870] rounded-3xl p-6 shadow-xl space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Legal Full Name" value={form.legal_name} onChange={(v) => onChange('legal_name', v)} />
            <Field label="Date of Birth" type="date" value={form.date_of_birth} onChange={(v) => onChange('date_of_birth', v)} />
            <Field label="Nationality" value={form.nationality} onChange={(v) => onChange('nationality', v)} />
            <Field label="Country of Residence" value={form.country} onChange={(v) => onChange('country', v)} />
            <Field label="Tax Residency" value={form.tax_residency} onChange={(v) => onChange('tax_residency', v)} className="md:col-span-2" />
            <Field label="Address Line" value={form.address_line} onChange={(v) => onChange('address_line', v)} className="md:col-span-2" />
          <div className="rounded-2xl border border-[#173a78] bg-[#030c1f] p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="font-bold text-white text-xs flex items-center gap-1.5"><FileText className="w-4 h-4 text-amber-400" /> Verification Documents</p>
                <p className="text-[10px] text-slate-400 mt-1">Upload a clear ID, passport, selfie, or proof of address.</p>
              </div>
              <span className="text-[10px] text-slate-400">{documents.length} uploaded</span>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <select value={docType} onChange={(e) => setDocType(e.target.value)} className="px-3 py-2.5 rounded-xl bg-[#071738] border border-[#173a78] text-white text-xs">
                <option value="NATIONAL_ID_FRONT">National ID (Front)</option>
                <option value="NATIONAL_ID_BACK">National ID (Back)</option>
                <option value="PASSPORT">Passport</option>
                <option value="DRIVING_LICENSE">Driving License</option>
                <option value="PROOF_OF_ADDRESS">Proof of Address</option>
                <option value="SELFIE">Selfie</option>
                <option value="BANK_STATEMENT">Bank Statement</option>
                <option value="OTHER">Other</option>
              </select>
              <label className="sm:col-span-2 px-3 py-2.5 rounded-xl bg-[#071738] border border-[#173a78] text-slate-300 text-xs cursor-pointer hover:border-amber-400 flex items-center justify-between gap-2">
                <span className="truncate">{docFile ? docFile.name : 'Choose image or PDF (max 5MB)'}</span>
                <Upload className="w-4 h-4 text-amber-400 shrink-0" />
                <input type="file" accept="image/*,.pdf" onChange={handleDocumentSelect} className="hidden" />
              </label>
            </div>
            {docPreview && <img src={docPreview} alt="Document preview" className="w-full max-h-40 object-contain rounded-xl border border-[#173a78] bg-[#071738]" />}
            <button type="button" onClick={handleDocumentUpload} disabled={docSaving || !docFile} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-black text-xs disabled:opacity-50 flex items-center gap-1.5">
              {docSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />} Upload Document
            </button>
            {documents.length > 0 && <div className="grid sm:grid-cols-2 gap-2">
              {documents.slice(0, 6).map((doc) => <div key={doc.id} className="flex items-center justify-between gap-2 rounded-xl border border-[#173a78] bg-[#071738] p-2.5 text-[10px]"><span className="text-slate-300 font-bold">{doc.doc_type?.replace(/_/g, ' ')}</span><span className="text-amber-300">{doc.status || 'PENDING'}</span></div>)}
            </div>}
          </div>


            <Field label="City" value={form.city} onChange={(v) => onChange('city', v)} />
            <Field label="State / Province" value={form.state} onChange={(v) => onChange('state', v)} />
            <Field label="Postal Code" value={form.postal_code} onChange={(v) => onChange('postal_code', v)} />
            <Field label="Source of Funds" value={form.source_of_funds} onChange={(v) => onChange('source_of_funds', v)} />
            <Field label="Source of Income" value={form.source_of_income} onChange={(v) => onChange('source_of_income', v)} className="md:col-span-2" />
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-[11px] text-amber-200">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 mt-0.5" />
              <div>
                <p className="font-bold">Verification requirements</p>
                <p className="mt-1 text-amber-100/80">Your submission will be reviewed by admin. Please ensure all personal and address information is accurate before submitting.</p>
              </div>
            </div>
          </div>

          <button type="submit" disabled={saving} className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-black text-sm shadow-xl hover:brightness-110 transition disabled:opacity-60">
            {saving ? <span className="inline-flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Saving...</span> : <span className="inline-flex items-center gap-2"><Save className="w-4 h-4" /> Submit KYC</span>}
          </button>
        </form>
      )}
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[11px] font-semibold text-slate-300 block mb-1">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl bg-[#030c1f] border border-[#173a78] text-white text-xs outline-none focus:border-amber-400"
      />
    </label>
  );
}
