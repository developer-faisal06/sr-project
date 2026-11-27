import React, { useEffect, useMemo, useState } from 'react';
import { ShieldCheck, Search, CheckCircle2, XCircle, FileText, X, Eye } from 'lucide-react';
import { fetchKycProfilesForAdmin, reviewKycProfile, fetchKycDocumentList, dispatchApprovalEmail } from '../../services/api';
import { notifyError, notifySuccess, notifyWarning } from '../../lib/notify';
import { supabase } from '../../lib/supabaseClient';

const statusMap = {
  NOT_STARTED: 'Not Started',
  DRAFT: 'Draft',
  SUBMITTED: 'Submitted',
  UNDER_REVIEW: 'Under Review',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  RESUBMISSION_REQUIRED: 'Resubmission Required',
  EXPIRED: 'Expired'
};

export default function KycManagement() {
  const [records, setRecords] = useState([]);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [userDocs, setUserDocs] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [reviewNote, setReviewNote] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const next = await fetchKycProfilesForAdmin();
      setRecords(next || []);
    } catch (error) {
      notifyError('KYC load failed', error?.message || 'Could not load KYC records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openInspection = async (record) => {
    setSelectedRecord(record);
    setReviewNote(record.review_note || record.rejection_reason || '');
    setLoadingDocs(true);
    try {
      const docs = await fetchKycDocumentList(record.user_id);
      setUserDocs(docs || []);
    } catch {
      setUserDocs([]);
    } finally {
      setLoadingDocs(false);
    }
  };

  const filtered = useMemo(() => {
    let list = records;
    if (statusFilter !== 'ALL') {
      list = list.filter((r) => r.kyc_status === statusFilter);
    }
    const value = query.trim().toLowerCase();
    if (!value) return list;
    return list.filter((record) => {
      const owner = record.user_id || '';
      const name = record.legal_name || '';
      const country = record.country || '';
      return owner.toLowerCase().includes(value) || name.toLowerCase().includes(value) || country.toLowerCase().includes(value);
    });
  }, [records, query, statusFilter]);

  const approve = async (record) => {
    const note = reviewNote.trim() || 'Approved by admin review';
    try {
      await reviewKycProfile({ userId: record.user_id, status: 'APPROVED', note, reviewerId: 'admin' });
      notifySuccess('KYC Approved', 'The user KYC profile was approved.');
      if (selectedRecord?.user_id === record.user_id) setSelectedRecord(null);
      load();

      // Dispatch KYC Approved email via SMTP
      try {
        const { data: profile } = await supabase.from('profiles').select('email, name').eq('id', record.user_id).maybeSingle();
        if (profile?.email) {
          dispatchApprovalEmail('KYC_APPROVED', {
            to: profile.email,
            name: profile.name || record.legal_name || 'Investor'
          }).catch(() => {});
        }
      } catch (mailErr) {}
    } catch (error) {
      notifyError('Approval failed', error?.message || 'Could not approve KYC');
    }
  };

  const reject = async (record) => {
    const note = reviewNote.trim() || window.prompt('Reject reason:', 'Document incomplete or not clear');
    if (!note || note.trim().length < 3) {
      notifyWarning('Reason required', 'A rejection reason of at least 3 characters is required.');
      return;
    }
    try {
      await reviewKycProfile({ userId: record.user_id, status: 'REJECTED', note, reviewerId: 'admin' });
      notifySuccess('KYC Rejected', 'The KYC profile was rejected with a reason.');
      if (selectedRecord?.user_id === record.user_id) setSelectedRecord(null);
      load();
    } catch (error) {
      notifyError('Rejection failed', error?.message || 'Could not reject KYC');
    }
  };

  return (
    <div className="bg-[#071738] border border-[#173b7d] rounded-2xl p-5 shadow-xl space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-white flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-amber-400" /> KYC Review</h3>
          <p className="text-slate-400">Review legal identity, status, and document progress.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input value={(query ?? '')} onChange={(e) => setQuery(e.target.value)} className="w-full pl-9 py-2 rounded-lg bg-[#030a1a] border border-[#173b7d] text-white" placeholder="Search user or name" />
        </div>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-[#173b7d]/60 pb-3">
        {['ALL', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap text-xs ${
              statusFilter === st
                ? 'bg-amber-400 text-slate-950 font-black shadow'
                : 'bg-[#030a1a] text-slate-400 hover:text-white border border-[#173b7d]'
            }`}
          >
            {st === 'ALL' ? 'All Records' : (statusMap[st] || st)}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="p-8 text-center text-amber-300">Loading KYC records...</p>
      ) : (
        <div className="sr-table-wrap">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#173b7d] text-slate-400 uppercase">
                <th className="p-3">User</th>
                <th className="p-3">Name</th>
                <th className="p-3">Status</th>
                <th className="p-3">Submitted</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#173b7d]/50">
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">No KYC profiles found.</td></tr>
              ) : filtered.map((record) => (
                <tr key={record.user_id} className="align-top hover:bg-[#0c265e]/30 transition">
                  <td className="p-3 font-mono text-white">{record.user_id}</td>
                  <td className="p-3 text-slate-200 font-bold">{record.legal_name || '—'}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${record.kyc_status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-300' : record.kyc_status === 'REJECTED' ? 'bg-rose-500/10 text-rose-300' : 'bg-amber-500/10 text-amber-300'}`}>
                      {statusMap[record.kyc_status] || record.kyc_status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300">{record.submitted_at ? new Date(record.submitted_at).toLocaleDateString() : '—'}</td>
                  <td className="p-3 text-right">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => approve(record)} className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold flex items-center gap-1 hover:bg-emerald-500/30 transition"><CheckCircle2 className="w-3.5 h-3.5" />Approve</button>
                      <button onClick={() => reject(record)} className="px-2 py-1 rounded bg-rose-500/20 text-rose-300 font-bold flex items-center gap-1 hover:bg-rose-500/30 transition"><XCircle className="w-3.5 h-3.5" />Reject</button>
                      <button onClick={() => openInspection(record)} className="px-2 py-1 rounded bg-blue-500/20 text-blue-300 font-bold flex items-center gap-1 hover:bg-blue-500/30 transition"><Eye className="w-3.5 h-3.5" />View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="sr-modal-shell bg-gradient-to-br from-[#071738] via-[#05112b] to-[#030919] border-2 border-amber-400/50 rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl space-y-5 text-slate-100">
            <div className="flex items-center justify-between border-b border-[#1b3f8a] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">{selectedRecord.legal_name || 'KYC Profile'}</h3>
                  <p className="text-[11px] font-mono text-amber-300">User ID: {selectedRecord.user_id}</p>
                </div>
              </div>
              <button onClick={() => setSelectedRecord(null)} className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-[#040d24] p-3 rounded-xl border border-[#1b3f8a]">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Status</span>
                <span className="font-black text-amber-300 text-xs mt-0.5 block">{selectedRecord.kyc_status}</span>
              </div>
              <div className="bg-[#040d24] p-3 rounded-xl border border-[#1b3f8a]">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Date of Birth</span>
                <span className="font-bold text-white text-xs mt-0.5 block">{selectedRecord.date_of_birth || '—'}</span>
              </div>
              <div className="bg-[#040d24] p-3 rounded-xl border border-[#1b3f8a]">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Nationality</span>
                <span className="font-bold text-white text-xs mt-0.5 block">{selectedRecord.nationality || '—'}</span>
              </div>
              <div className="bg-[#040d24] p-3 rounded-xl border border-[#1b3f8a]">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Country</span>
                <span className="font-bold text-white text-xs mt-0.5 block">{selectedRecord.country || '—'}</span>
              </div>
              <div className="bg-[#040d24] p-3 rounded-xl border border-[#1b3f8a]">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">City / State</span>
                <span className="font-bold text-white text-xs mt-0.5 block">{selectedRecord.city || ''} {selectedRecord.state ? `, ${selectedRecord.state}` : '—'}</span>
              </div>
              <div className="bg-[#040d24] p-3 rounded-xl border border-[#1b3f8a]">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Postal Code</span>
                <span className="font-bold text-white text-xs mt-0.5 block">{selectedRecord.postal_code || '—'}</span>
              </div>
              <div className="bg-[#040d24] p-3 rounded-xl border border-[#1b3f8a] sm:col-span-3">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Full Address</span>
                <span className="font-semibold text-white text-xs mt-0.5 block">{selectedRecord.address_line || 'No address provided'}</span>
              </div>
            </div>

            <div className="bg-[#040d24] p-4 rounded-2xl border border-[#1b3f8a] space-y-3">
              <h4 className="font-black text-amber-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> Attached Verification Documents ({userDocs.length})
              </h4>
              {loadingDocs ? (
                <p className="text-slate-400 py-3 text-center">Loading attached documents...</p>
              ) : userDocs.length === 0 ? (
                <p className="text-slate-500 py-3 text-center text-xs">No documents uploaded yet for this application.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {userDocs.map((doc) => (
                    <div key={doc.id} className="p-3 rounded-xl bg-[#071738] border border-[#173b7d] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-white text-[11px]">{doc.doc_type?.replace(/_/g, ' ')}</span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-400/20 text-amber-300">{doc.status}</span>
                      </div>
                      {doc.storage_path?.startsWith('data:image') || doc.storage_path?.startsWith('http') ? (
                        <div className="h-32 rounded-lg overflow-hidden border border-[#173b7d] bg-[#030a1a]">
                          <img src={doc.storage_path} alt={doc.doc_type} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="p-3 rounded-lg bg-[#030a1a] font-mono text-[10px] text-slate-300 break-all">
                          {doc.storage_path}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Decision Note / Rejection Reason</label>
              <textarea
                rows={2}
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                placeholder="Optional review note or reason if rejecting..."
                className="w-full px-3.5 py-2 rounded-xl bg-[#040d24] border border-[#1b3f8a] text-white text-xs outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#1b3f8a]">
              <button
                type="button"
                onClick={() => reject(selectedRecord)}
                className="px-4 py-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold hover:bg-rose-500/30 transition flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4" /> Reject KYC
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRecord(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => approve(selectedRecord)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-black shadow-lg hover:brightness-110 transition flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" /> Approve KYC
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
