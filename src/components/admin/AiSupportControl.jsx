import React, { useEffect, useState } from 'react';
import { Bot, BookOpen, Phone, Save, Trash2, Pencil, X, Check } from 'lucide-react';
import { notifyError, notifySuccess } from '../../lib/notify';
import { fetchAiProviders, saveAiProvider, fetchKnowledgeDocuments, saveKnowledgeDocument, updateKnowledgeDocument, deleteKnowledgeDocument, saveWhatsappSettings, discoverGeminiModels } from '../../services/api';

export default function AiSupportControl({ settings, onSaveSettings }) {
  const [providers, setProviders] = useState([]); const [docs, setDocs] = useState([]); const [provider, setProvider] = useState('gemini');
  const [enabled, setEnabled] = useState(settings?.ai_chatbot_enabled || false); const [prompt, setPrompt] = useState(settings?.ai_system_prompt || 'You are SR Investment support. Never ask for passwords or OTPs. Never guarantee profits.');
  const [title, setTitle] = useState(''); const [content, setContent] = useState(''); const [category, setCategory] = useState('General FAQ');
  const [editDoc, setEditDoc] = useState(null);
  const [wa, setWa] = useState({ enabled: false, provider: 'meta', phone_number: '', secret_name: '' });
  const [models, setModels] = useState([]); const [checking, setChecking] = useState(false);
  useEffect(() => { Promise.all([fetchAiProviders(), fetchKnowledgeDocuments()]).then(([p, d]) => { setProviders(p); setDocs(d); }).catch((e) => notifyError('AI Load Failed', e.message)); }, []);
  const current = providers.find((p) => p.provider === provider) || providers[0];
  const update = (key, value) => setProviders((rows) => rows.map((p) => p.id === current?.id ? { ...p, [key]: value } : p));
  const checkModels = async () => { setChecking(true); try { const discovered = await discoverGeminiModels(); setModels(discovered); notifySuccess('Connection Checked', `${discovered.length} Gemini models available.`); } catch (e) { notifyError('Connection Failed', e.message); } finally { setChecking(false); } };
  const saveAI = async () => { try { const saved = await saveAiProvider({ ...current, available_models: models }); await onSaveSettings({ ai_chatbot_enabled: enabled, ai_provider: saved.provider, ai_model: saved.model, ai_secret_name: saved.secret_name, ai_system_prompt: prompt }); notifySuccess('Live Support Saved', 'Configuration saved.'); } catch (e) { notifyError('Save Failed', e.message); } };
  const saveDoc = async (e) => { e.preventDefault(); try { const saved = await saveKnowledgeDocument({ title, content, category, status: 'PUBLISHED', is_public: true }); setDocs([saved, ...docs]); setTitle(''); setContent(''); notifySuccess('Knowledge Published', 'Knowledge saved.'); } catch (e) { notifyError('Knowledge Failed', e.message); } };
  const saveEdit = async () => {
    try {
      const saved = await updateKnowledgeDocument(editDoc.id, { title: editDoc.title, content: editDoc.content, category: editDoc.category, status: editDoc.status, is_public: editDoc.is_public });
      setDocs(docs.map((d) => d.id === saved.id ? saved : d));
      setEditDoc(null);
      notifySuccess('Knowledge Updated', 'Changes saved and live for the AI.');
    } catch (e) { notifyError('Update Failed', e.message); }
  };
  const removeDoc = async (doc) => {
    if (!window.confirm(`Delete "${doc.title}"? This cannot be undone.`)) return;
    try { await deleteKnowledgeDocument(doc.id); setDocs(docs.filter((d) => d.id !== doc.id)); notifySuccess('Knowledge Deleted', 'Document removed.'); } catch (e) { notifyError('Delete Failed', e.message); }
  };
  const saveWA = async () => { try { await saveWhatsappSettings(wa); await onSaveSettings({ whatsapp_enabled: wa.enabled, whatsapp_provider: wa.provider, whatsapp_phone_number: wa.phone_number, whatsapp_secret_name: wa.secret_name }); notifySuccess('WhatsApp Saved', 'Server secret name saved.'); } catch (e) { notifyError('WhatsApp Failed', e.message); } };
  return <div className="space-y-5">
    <section className="panel"><div className="title"><Bot/><h3>Live Support Control</h3></div><p className="hint">API keys stay in server secrets; only secret names are stored.</p><div className="grid md:grid-cols-3 gap-3"><button onClick={() => setEnabled(!enabled)} className={enabled ? 'toggle on' : 'toggle off'}>AI: {enabled ? 'ON' : 'OFF'}</button><select value={provider} onChange={(e) => setProvider(e.target.value)} className="field"><option value="gemini">Gemini</option><option value="openrouter">OpenRouter</option><option value="claude">Claude</option></select><select value={current?.model || ''} onChange={(e) => update('model', e.target.value)} className="field"><option value="">Select model</option>{models.map((model) => <option key={model.name} value={model.name}>{model.displayName || model.name}</option>)}</select><button type="button" onClick={checkModels} disabled={checking} className="save">{checking ? 'Checking...' : 'Check Connection & Models'}</button></div><input value={current?.secret_name || ''} onChange={(e) => update('secret_name', e.target.value)} placeholder="Server secret name" className="field wide"/><textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows="4" className="field wide" placeholder="System message"/><button onClick={saveAI} className="save"><Save/>Save Live Support Configuration</button></section>
    <section className="panel"><div className="title"><BookOpen/><h3>AI Knowledge Base</h3></div><form onSubmit={saveDoc} className="space-y-3"><div className="grid md:grid-cols-2 gap-3"><input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="FAQ/document title" className="field"/><select value={category} onChange={(e) => setCategory(e.target.value)} className="field">{['General FAQ','Deposit','Withdrawal','Referral','Account','Investment','Technical','Other'].map((c) => <option key={c} value={c}>{c}</option>)}</select></div><textarea required value={content} onChange={(e) => setContent(e.target.value)} rows="4" className="field wide" placeholder="Knowledge content"/><button className="save"><Save/>Publish Knowledge</button></form>
      <p className="hint">{docs.length} document(s) — AI uses these to answer user questions.</p>
      <div className="space-y-2 mt-3">
        {docs.length === 0 && <p className="hint">No documents yet. Add FAQs above so the AI can answer questions.</p>}
        {docs.map((doc) => (
          editDoc?.id === doc.id ? (
            <div key={doc.id} className="edit-card">
              <div className="grid md:grid-cols-2 gap-2">
                <input value={editDoc.title} onChange={(e) => setEditDoc({ ...editDoc, title: e.target.value })} className="field" placeholder="Title" />
                <select value={editDoc.category} onChange={(e) => setEditDoc({ ...editDoc, category: e.target.value })} className="field">{['General FAQ','Deposit','Withdrawal','Referral','Account','Investment','Technical','Other'].map((c) => <option key={c} value={c}>{c}</option>)}</select>
              </div>
              <textarea value={editDoc.content} onChange={(e) => setEditDoc({ ...editDoc, content: e.target.value })} rows="4" className="field wide" placeholder="Knowledge content" />
              <div className="flex flex-wrap items-center gap-2">
                <select value={editDoc.status} onChange={(e) => setEditDoc({ ...editDoc, status: e.target.value })} className="field">
                  <option value="PUBLISHED">PUBLISHED (AI uses this)</option>
                  <option value="DRAFT">DRAFT (AI ignores)</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
                <label className="flex items-center gap-1.5 text-[11px] text-slate-300"><input type="checkbox" checked={!!editDoc.is_public} onChange={(e) => setEditDoc({ ...editDoc, is_public: e.target.checked })} />Public</label>
                <button onClick={saveEdit} className="save"><Check/>Save Changes</button>
                <button onClick={() => setEditDoc(null)} className="cancel"><X/>Cancel</button>
              </div>
            </div>
          ) : (
            <div key={doc.id} className="doc-card">
              <div className="flex-1 min-w-0">
                <p className="doc-title">{doc.title}</p>
                <p className="doc-meta"><span className={`doc-badge ${doc.status === 'PUBLISHED' ? 'pub' : 'draft'}`}>{doc.status}</span> {doc.category} {doc.is_public ? '· Public' : '· Private'}</p>
                <p className="doc-preview">{String(doc.content || '').slice(0, 140)}{String(doc.content || '').length > 140 ? '...' : ''}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button onClick={() => setEditDoc({ ...doc })} className="icon-btn" title="Edit"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => removeDoc(doc)} className="icon-btn danger" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          )
        ))}
      </div>
    </section>
    <section className="panel"><div className="title"><Phone/><h3>Human Support & WhatsApp</h3></div><div className="grid md:grid-cols-3 gap-3"><button onClick={() => setWa({ ...wa, enabled: !wa.enabled })} className={wa.enabled ? 'toggle on' : 'toggle off'}>WhatsApp: {wa.enabled ? 'ON' : 'OFF'}</button><select value={wa.provider} onChange={(e) => setWa({ ...wa, provider: e.target.value })} className="field"><option value="meta">Meta Cloud API</option><option value="twilio">Twilio</option></select><input value={wa.phone_number} onChange={(e) => setWa({ ...wa, phone_number: e.target.value })} placeholder="Support phone" className="field"/></div><input value={wa.secret_name} onChange={(e) => setWa({ ...wa, secret_name: e.target.value })} placeholder="Server secret name" className="field wide"/><button onClick={saveWA} className="save"><Save/>Save WhatsApp Settings</button></section>
    <style>{`.panel{background:#071738;border:1px solid #173b7d;border-radius:1rem;padding:1.25rem;box-shadow:0 10px 30px #0005}.title{display:flex;align-items:center;gap:.5rem;color:#fbbf24;font-weight:900;border-bottom:1px solid #173b7d;padding-bottom:.75rem;margin-bottom:.75rem}.title svg{width:1.25rem}.hint{color:#94a3b8;font-size:.7rem;margin:.5rem 0}.field{padding:.65rem;border-radius:.65rem;background:#030c1f;border:1px solid #173a78;color:white;outline:none;font-size:.75rem}.wide{width:100%}.toggle{padding:.7rem;border-radius:.65rem;font-weight:900;font-size:.75rem;border:1px solid}.on{background:#064e3b;color:#6ee7b7;border-color:#34d399}.off{background:#4c0519;color:#fda4af;border-color:#fb7185}.save{display:flex;align-items:center;gap:.4rem;padding:.65rem .9rem;border-radius:.65rem;background:#fbbf24;color:#020617;font-size:.75rem;font-weight:900}.cancel{display:flex;align-items:center;gap:.4rem;padding:.65rem .9rem;border-radius:.65rem;background:#1e293b;color:#cbd5e1;font-size:.75rem;font-weight:900;border:1px solid #334155}.edit-card{background:#030c1f;border:1px solid #b45309;border-radius:.85rem;padding:.85rem;display:flex;flex-direction:column;gap:.5rem}.doc-card{background:#030c1f;border:1px solid #173b7d;border-radius:.85rem;padding:.75rem .85rem;display:flex;align-items:flex-start;justify-content:space-between;gap:.75rem}.doc-title{color:#fff;font-size:.75rem;font-weight:800}.doc-meta{color:#94a3b8;font-size:.62rem;margin-top:.15rem;display:flex;align-items:center;gap:.4rem;flex-wrap:wrap}.doc-badge{font-size:.55rem;font-weight:900;padding:.1rem .4rem;border-radius:.3rem}.doc-badge.pub{background:#064e3b;color:#6ee7b7}.doc-badge.draft{background:#422006;color:#fcd34d}.doc-preview{color:#64748b;font-size:.65rem;margin-top:.3rem;line-height:1.4}.icon-btn{padding:.4rem;border-radius:.5rem;background:#0c265e;color:#93c5fd;border:1px solid #1d4ed8;display:flex;align-items:center}.icon-btn.danger{background:#4c0519;color:#fda4af;border-color:#9f1239}`}</style>
  </div>;
}

