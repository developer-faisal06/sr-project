import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Check, X, Gem } from 'lucide-react';

export default function PlanManager({ plans, onSavePlan, onDeletePlan }) {
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({ id: '', name: '', amount: '', roi: '', badgeColor: 'bg-blue-600', popular: false });

  const handleStartEdit = (p) => {
    setEditingId(p.id);
    setIsAdding(false);
    setForm({ id: p.id, name: p.name, amount: p.amount, roi: p.roi, badgeColor: p.badgeColor || 'bg-blue-600', popular: !!p.popular });
  };

  const handleStartAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setForm({ id: 'plan_' + Date.now(), name: 'Custom Plan', amount: '$300', roi: '~ 9%', badgeColor: 'bg-emerald-600', popular: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSavePlan(form);
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div className="bg-[#071738] border border-[#173b7d] rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex justify-between items-center pb-3 border-b border-[#173b7d]">
        <div className="flex items-center space-x-2">
          <Gem className="w-5 h-5 text-amber-400" />
          <h3 className="font-black text-white text-base">Investment Plans Manager (Home Sync)</h3>
        </div>
        {!isAdding && !editingId && (
          <button onClick={handleStartAdd} className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 text-xs font-black">
            <Plus className="w-4 h-4" />
            <span>Add Plan</span>
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <form onSubmit={handleSubmit} className="bg-[#030a1a] border border-amber-400/50 rounded-xl p-3 space-y-3 text-xs">
          <div className="flex justify-between font-bold text-amber-300">
            <span>{isAdding ? 'New Plan' : 'Edit Plan'}</span>
            <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }}><X className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <input type="text" placeholder="Name" required value={(form.name ?? '')} onChange={(e) => setForm({ ...form, name: e.target.value })} className="p-2 rounded bg-[#071738] border border-[#173b7d] text-white" />
            <input type="text" placeholder="Amount (e.g. $200)" required value={(form.amount ?? '')} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="p-2 rounded bg-[#071738] border border-[#173b7d] text-white" />
            <input type="text" placeholder="ROI (e.g. ~ 8%)" required value={(form.roi ?? '')} onChange={(e) => setForm({ ...form, roi: e.target.value })} className="p-2 rounded bg-[#071738] border border-[#173b7d] text-white" />
            <select value={form.badgeColor} onChange={(e) => setForm({ ...form, badgeColor: e.target.value })} className="p-2 rounded bg-[#071738] border border-[#173b7d] text-white">
              <option value="bg-blue-600">Blue (Starter)</option>
              <option value="bg-emerald-600">Green (Popular)</option>
              <option value="bg-purple-700">Purple (Premium)</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="popBox" checked={form.popular} onChange={(e) => setForm({ ...form, popular: e.target.checked })} />
            <label htmlFor="popBox" className="cursor-pointer font-bold text-slate-300">Show "Popular" Ribbon</label>
          </div>
          <div className="flex space-x-2">
            <button type="submit" className="px-4 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-black flex items-center space-x-1">
              <Check className="w-3.5 h-3.5" />
              <span>Save &amp; Update Home Page</span>
            </button>
            <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }} className="px-3 py-1.5 rounded-lg bg-[#071738] text-slate-300">Cancel</button>
          </div>
        </form>
      )}

      <div className="sr-table-wrap text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#173b7d] text-slate-400 uppercase">
              <th className="p-2.5">Plan Name</th>
              <th className="p-2.5">Amount</th>
              <th className="p-2.5">Monthly ROI</th>
              <th className="p-2.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#173b7d]/50">
            {plans.map((p) => (
              <tr key={p.id}>
                <td className="p-2.5 font-bold text-white flex items-center space-x-1.5">
                  <span>{p.name}</span>
                  {p.popular && <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px]">Popular</span>}
                </td>
                <td className="p-2.5 font-black text-amber-400">{p.amount}</td>
                <td className="p-2.5 font-bold text-emerald-400">{p.roi}</td>
                <td className="p-2.5 text-right space-x-1.5">
                  <button onClick={() => handleStartEdit(p)} className="p-1 rounded bg-[#030a1a] text-amber-300 border border-[#173b7d]"><Edit3 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => onDeletePlan(p.id)} className="p-1 rounded bg-rose-500/20 text-rose-300"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
