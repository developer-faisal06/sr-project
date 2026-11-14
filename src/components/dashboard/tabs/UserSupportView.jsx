import React, { useEffect, useState } from "react";
import { Headphones, MessageSquare, Mail, Phone, Clock, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { notifyWarning } from "../../../lib/notify";
import { createSupportTicket, fetchKnowledgeDocuments, fetchMySupportTickets, fetchSupportTicketMessages, markTicketSeen, sendSupportTicketUserReply, updateSupportTicket } from "../../../services/api";

const faqs = [
  { q: "How long does a deposit take?", a: "Deposits are credited within 10-30 minutes after blockchain/gateway confirmation." },
  { q: "What is the minimum withdrawal?", a: "Minimum withdrawal is $20. Processed within 24-48 hours after admin approval." },
  { q: "How does referral commission work?", a: "Level 1 (15%), Level 2 (10%), Level 3 (5%), Level 4 (1%) of referral investment." },
  { q: "Can I withdraw principal early?", a: "Principal locked for 30 days. Only profits and referral commissions available early." },
  { q: "How is monthly profit calculated?", a: "Active investment x plan ROI (7-12%). Credited at end of each cycle automatically." },
  { q: "Is my capital safe?", a: "Secured via algorithmic trading with strict risk management protocols." }
];

export default function UserSupportView({ user, onLogin, settings = {} }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [knowledgeFaqs, setKnowledgeFaqs] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("General Inquiry");
  const [priority, setPriority] = useState("NORMAL");
  const [ticketStatus, setTicketStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [activeTicket, setActiveTicket] = useState(null);
  const [ticketMessages, setTicketMessages] = useState([]);
  const [ticketReply, setTicketReply] = useState('');
  const [ticketLoading, setTicketLoading] = useState(false);
  const [ticketFilter, setTicketFilter] = useState('OPEN');
  const [supportTab, setSupportTab] = useState('new-ticket');
  useEffect(() => {
    const load = () => { fetchKnowledgeDocuments().then((rows) => setKnowledgeFaqs((rows || []).filter((row) => row.status === 'PUBLISHED' && row.is_public !== false))).catch(() => {}); if (user?.id) fetchMySupportTickets(user.id).then(setTickets).catch(() => {}); };
    load();
    const timer = setInterval(load, 10000);
    return () => clearInterval(timer);
  }, [user?.id]);
  useEffect(() => { const target = supportTab === 'my-tickets' ? 'support-ticket-history' : 'support-ticket-form'; const timer = setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60); return () => clearTimeout(timer); }, [supportTab]);

  const openTicket = async (ticket) => {
    setActiveTicket({ ...ticket, unread_for_user: 0 });
    setTickets((rows) => rows.map((row) => row.id === ticket.id ? { ...row, unread_for_user: 0 } : row));
    markTicketSeen(ticket.id, 'USER').catch(() => {});
    setTicketLoading(true);
    try { setTicketMessages(await fetchSupportTicketMessages(ticket.id)); }
    finally { setTicketLoading(false); }
  };
  const sendTicketReply = async (e) => { e.preventDefault(); if (!ticketReply.trim() || !activeTicket || activeTicket.status === 'CLOSED') return; try { await sendSupportTicketUserReply({ ticketId: activeTicket.id, content: ticketReply.trim(), userId: user?.id }); setTicketReply(''); setTicketMessages(await fetchSupportTicketMessages(activeTicket.id)); } catch (error) { notifyWarning('Reply Failed', error.message); } };

  const changeTicketStatus = async (status) => { if (!activeTicket || status === 'CLOSED') return; try { const updated = await updateSupportTicket(activeTicket.id, { status }); setActiveTicket(updated); setTickets((rows) => rows.map((row) => row.id === updated.id ? updated : row)); } catch (error) { notifyWarning('Ticket Update Failed', error.message); } };

  const handleTicket = async (e) => {
    e.preventDefault();
    if (!subject.trim()) { notifyWarning("Subject Required", "Please enter a subject."); return; }
    if (message.trim().length < 20) { notifyWarning("Too Short", "Describe your issue in at least 20 characters."); return; }
    setSubmitting(true);
    try {
      const ticket = await createSupportTicket({ user_id: user?.id || null, user_name: user?.name || null, user_email: user?.email || null, user_avatar_url: user?.avatar_url || null, subject: subject.trim(), category, priority }, message.trim());
      setTicketStatus(ticket);
      setSubject(""); setMessage("");
    } catch (error) { notifyWarning("Ticket Failed", error.message || "Could not submit your support ticket."); }
    finally { setSubmitting(false); }
  };

  if (!user?.id) return (
    <div className="space-y-6"><div className="bg-gradient-to-r from-[#091f4d] via-[#09245c] to-[#0e3b91] border border-amber-400/40 rounded-3xl p-6 shadow-xl"><span className="text-xs font-bold text-amber-300 uppercase tracking-wider">24/7 Assistance</span><h2 className="text-2xl font-black text-white mt-1">Support &amp; Help Center</h2><p className="text-slate-300 text-xs mt-2">Guests can use Live Support and Contact Support. Login is required to open and track support tickets.</p><div className="flex flex-wrap gap-2 mt-4"><button type="button" onClick={onLogin} className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-black">Login to Open Tickets</button></div></div><div className="bg-[#051330] border border-[#173870] rounded-2xl p-6 shadow-xl"><h3 className="text-sm font-black text-white">Available without login</h3><div className="grid sm:grid-cols-2 gap-3 mt-4"><div className="p-4 rounded-xl bg-[#030c1f] border border-emerald-400/30 text-xs text-slate-300"><strong className="text-emerald-300 block">Live Support</strong>Chat with support as a guest. Your conversation will be saved.</div><div className="p-4 rounded-xl bg-[#030c1f] border border-blue-400/30 text-xs text-slate-300"><strong className="text-blue-300 block">Contact Form</strong>Send an inquiry by name and email through the website contact page.</div></div></div></div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#091f4d] via-[#09245c] to-[#0e3b91] border border-amber-400/40 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">{settings.support_center_badge || '24/7 Assistance'}</span>
          <h2 className="text-2xl font-black text-white mt-1">Support &amp; Help Center</h2>
          <p className="text-slate-300 text-xs mt-0.5">Submit a ticket or browse FAQ for instant answers.</p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-xs font-bold text-emerald-300">Support Online</span>
        </div>
      </div>

      <div className="w-full overflow-x-auto"><div className="inline-flex gap-1 p-1 rounded-2xl bg-[#030c1f] border border-[#173b7d] min-w-max"><button type="button" onClick={() => setSupportTab('overview')} className={`px-4 py-2 rounded-xl text-xs font-black ${supportTab === 'overview' ? 'bg-amber-400 text-slate-950' : 'text-slate-300'}`}>Overview</button><button type="button" onClick={() => setSupportTab('new-ticket')} className={`px-4 py-2 rounded-xl text-xs font-black ${supportTab === 'new-ticket' ? 'bg-amber-400 text-slate-950' : 'text-slate-300'}`}>Open Ticket</button><button type="button" onClick={() => setSupportTab('my-tickets')} className={`px-4 py-2 rounded-xl text-xs font-black ${supportTab === 'my-tickets' ? 'bg-amber-400 text-slate-950' : 'text-slate-300'}`}>My Tickets {tickets.filter((ticket) => Number(ticket.unread_for_user || 0) > 0).length > 0 && <span className="ml-1 px-1.5 py-0.5 rounded-full bg-rose-600 text-white text-[9px]">{tickets.filter((ticket) => Number(ticket.unread_for_user || 0) > 0).length}</span>}</button><button type="button" onClick={() => setSupportTab('faq')} className={`px-4 py-2 rounded-xl text-xs font-black ${supportTab === 'faq' ? 'bg-amber-400 text-slate-950' : 'text-slate-300'}`}>FAQ</button><button type="button" onClick={() => { window.dispatchEvent(new Event('sr:open-live-support')); }} className="px-4 py-2 rounded-xl text-xs font-black text-emerald-300">Live Support</button></div></div>

      {supportTab === 'overview' && <div className="grid grid-cols-2 lg:grid-cols-4 gap-3"><div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/30"><p className="text-[10px] uppercase text-emerald-300">Open</p><p className="text-2xl font-black text-white">{tickets.filter((t) => !['CLOSED','RESOLVED'].includes(t.status)).length}</p></div><div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30"><p className="text-[10px] uppercase text-amber-300">Unread</p><p className="text-2xl font-black text-white">{tickets.reduce((sum,t)=>sum+Number(t.unread_for_user||0),0)}</p></div><div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-400/30"><p className="text-[10px] uppercase text-cyan-300">Resolved</p><p className="text-2xl font-black text-white">{tickets.filter((t)=>t.status==='RESOLVED').length}</p></div><div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-400/30"><p className="text-[10px] uppercase text-blue-300">Support</p><p className="text-sm font-black text-white mt-2">Online</p></div></div>}

      {supportTab === 'my-tickets' && user?.id && <div id="support-ticket-history" className="bg-[#051330] border border-[#173870] rounded-2xl p-5 shadow-xl"><div className="flex flex-wrap items-center justify-between gap-3 mb-4"><div><h3 className="text-base font-black text-white">My Support Tickets</h3><p className="text-[10px] text-slate-400 mt-1">View your ticket history and continue open conversations.</p></div><select value={ticketFilter} onChange={(e) => setTicketFilter(e.target.value)} className="bg-[#030c1f] border border-[#173b7d] rounded-lg px-2 py-1.5 text-[10px] text-white"><option value="OPEN">Open tickets</option><option value="CLOSED">Closed tickets</option><option value="ALL">All tickets</option></select></div><div className="grid lg:grid-cols-2 gap-4"><div className="space-y-2 max-h-[420px] overflow-y-auto">{tickets.filter((ticket) => ticketFilter === 'ALL' || (ticketFilter === 'CLOSED' ? ticket.status === 'CLOSED' : ticket.status !== 'CLOSED')).map((ticket) => <button type="button" key={ticket.id} onClick={() => openTicket(ticket)} className={`w-full text-left rounded-xl border p-3 ${activeTicket?.id === ticket.id ? 'border-amber-400 bg-[#0c265e]' : Number(ticket.unread_for_user || 0) ? 'border-amber-400/60 bg-amber-400/10' : 'border-[#173b7d] bg-[#030c1f]'}`}><div className="flex justify-between gap-2"><strong className="text-xs text-white truncate">{ticket.subject}</strong><span className="text-[9px] text-amber-300">{ticket.status}</span></div><p className="text-[10px] text-slate-400 mt-1">#{ticket.id} · {ticket.priority} {Number(ticket.unread_for_user || 0) ? `· ${ticket.unread_for_user} new` : ''}</p></button>)}{!tickets.length && <p className="text-xs text-slate-500 py-8 text-center">No support tickets yet.</p>}</div><div className="rounded-xl border border-[#173b7d] bg-[#030c1f] p-4 min-h-[360px]">{!activeTicket ? <div className="h-full flex items-center justify-center text-xs text-slate-500 text-center">Select a ticket to view its full message history.</div> : <><div className="flex items-center justify-between border-b border-[#173b7d] pb-3 mb-3"><div><h4 className="text-sm font-black text-white">{activeTicket.subject}</h4><p className="text-[10px] text-amber-300">#{activeTicket.id} · {activeTicket.status}</p></div></div><div className="space-y-2 max-h-56 overflow-y-auto">{ticketLoading ? <p className="text-xs text-slate-500">Loading history...</p> : ticketMessages.map((item) => <div key={item.id} className={`rounded-xl p-3 text-xs ${item.sender_type === 'USER' ? 'ml-5 bg-amber-400 text-slate-950' : 'mr-5 bg-[#0c265e] text-slate-200'}`}>{item.content}<p className="mt-1 text-[9px] opacity-60">{item.sender_type} · {item.message_status || 'SENT'}</p></div>)}</div>{activeTicket.status === 'CLOSED' ? <div className="mt-3 rounded-lg border border-slate-600 bg-slate-800/60 p-3 text-[10px] text-slate-300">🔒 This ticket is closed and read-only.</div> : <form onSubmit={sendTicketReply} className="mt-3 flex gap-2"><textarea rows="2" value={ticketReply} onChange={(e) => setTicketReply(e.target.value)} placeholder="Reply to support..." className="flex-1 resize-none rounded-xl border border-[#173a78] bg-[#071738] px-3 py-2 text-xs text-white outline-none focus:border-amber-400"/><button className="self-end rounded-xl bg-amber-400 px-4 py-2 text-xs font-black text-slate-950">Send</button></form>}</>}</div></div></div>}

      {supportTab === 'overview' && <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Mail, label: "Email Support", value: "support@srinvestment-demo.com", sub: "Response within 2 hours", color: "from-blue-500/20 to-indigo-500/10 border-blue-400/40 text-blue-300" },
          { icon: Phone, label: "Phone / WhatsApp", value: "+880 1700 000000", sub: "Available 9AM-9PM (BST)", color: "from-emerald-500/20 to-teal-500/10 border-emerald-400/40 text-emerald-300" },
          { icon: Clock, label: "Live Chat", value: "Available Now", sub: "Avg. response: 5 minutes", color: "from-amber-400/20 to-yellow-500/10 border-amber-400/40 text-amber-300" }
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className={"bg-gradient-to-br " + item.color + " border rounded-2xl p-4 shadow-lg"}>
              <div className="flex items-center space-x-2 mb-2"><Icon className="w-4 h-4" /><span className="text-xs font-bold uppercase">{item.label}</span></div>
              <p className="text-white font-black text-sm">{item.value}</p>
              <p className="text-slate-400 text-[10px] mt-1">{item.sub}</p>
            </div>
          );
        })}
      </div>}



      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {supportTab === 'new-ticket' && <div id="support-ticket-form" className="lg:col-span-7 bg-[#051330] border border-[#173870] rounded-2xl p-6 shadow-xl">
          <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-amber-400" /><span>Submit a Support Ticket</span>
          </h3>
          <form onSubmit={handleTicket} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Your Name &amp; ID</label>
              <input type="text" readOnly value={user.name + " (" + user.id + ")"} className="w-full px-4 py-2.5 bg-[#030c1f] border border-[#173a78] rounded-xl text-slate-400 text-xs font-mono cursor-not-allowed" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2.5 bg-[#030c1f] border border-[#173a78] rounded-xl text-white text-xs focus:outline-none focus:border-amber-400">
                {["General Inquiry","Deposit Issue","Withdrawal Issue","Referral Commission","Account Security","Technical Problem","Other"].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full px-4 py-2.5 bg-[#030c1f] border border-[#173a78] rounded-xl text-white text-xs focus:outline-none focus:border-amber-400">
                <option value="LOW">Low</option><option value="NORMAL">Normal</option><option value="HIGH">High</option><option value="URGENT">Urgent</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Subject</label>
              <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Brief description of your issue..." className="w-full px-4 py-2.5 bg-[#030c1f] border border-[#173a78] rounded-xl text-white text-xs focus:outline-none focus:border-amber-400" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Message</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Describe your issue in detail (min. 20 characters)..." rows={5} className="w-full px-4 py-2.5 bg-[#030c1f] border border-[#173a78] rounded-xl text-white text-xs focus:outline-none focus:border-amber-400 resize-none" />
            </div>
            {ticketStatus && <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-3 text-xs text-emerald-200"><strong>Ticket submitted.</strong> ID: {ticketStatus.id} · Status: {ticketStatus.status}</div>}
            <button type="submit" disabled={submitting} className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-sm shadow-xl hover:brightness-110 transition flex items-center justify-center space-x-2 disabled:opacity-60">
              <Headphones className="w-4 h-4" /><span>{submitting ? 'Submitting...' : 'Submit Support Ticket'}</span>
            </button>
          </form>
        </div>}
        {supportTab === 'faq' && <div className="lg:col-span-12 bg-[#051330] border border-[#173870] rounded-2xl p-6 shadow-xl">
          <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-400" /><span>Frequently Asked Questions</span>
          </h3>
          <div className="space-y-2">
            {(knowledgeFaqs.length ? knowledgeFaqs.map((faq) => ({ q: faq.title, a: faq.content, id: faq.id })) : faqs.map((faq, i) => ({ ...faq, id: i }))).map((faq, i) => (
              <div key={faq.id} className="bg-[#030c1f] border border-[#143269] rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-4 py-3 text-left">
                  <span className="text-xs font-semibold text-white pr-2">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-3 text-[11px] text-slate-300 border-t border-[#143269]">
                    <p className="pt-2">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>}
      </div>
    </div>
  );
}

