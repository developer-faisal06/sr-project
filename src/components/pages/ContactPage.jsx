import React, { useState } from 'react';
import { ArrowLeft, Mail, Clock, Send, MessageSquare, MapPin } from 'lucide-react';
import { notifySuccess } from '../../lib/notify';
import { submitContactInquiry } from '../../services/api';

export default function ContactPage({ onBackHome }) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    await submitContactInquiry({ name, email, message });
    notifySuccess('Inquiry Submitted!', 'Thank you! Your message has been saved to database.');
    setName('');
    setEmail('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div>
        <button 
          onClick={onBackHome}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#071738] border border-amber-400/40 text-amber-300 hover:text-white text-xs font-bold transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to home</span>
        </button>
      </div>

      <div className="text-center space-y-2">
        <span className="text-xs font-black text-amber-400 uppercase tracking-wider">COMMUNICATION DESK</span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Contact SR Investment</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Inquiries regarding market education, proposed operations, and platform partnerships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Contact Info */}
        <div className="bg-[#071738] border border-[#173b7d] rounded-3xl p-6 sm:p-8 space-y-5">
          <h3 className="text-lg font-black text-white">Trading Desk Information</h3>
          
          <div className="flex items-start space-x-3 text-xs text-slate-300">
            <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="block font-bold text-white">Operating Observation Sessions</span>
              <span>London Session (08:00–16:00 GMT)</span>
              <span className="block">New York Session (13:00–21:00 GMT)</span>
            </div>
          </div>

          <div className="flex items-start space-x-3 text-xs text-slate-300">
            <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="block font-bold text-white">Email Desk</span>
              <span>support@srinvestment-demo.com</span>
            </div>
          </div>

          <div className="flex items-start space-x-3 text-xs text-slate-300">
            <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="block font-bold text-white">Demo Concept Hub</span>
              <span>Pre-launch trading operations prototype</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#071738] border-2 border-amber-400/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <h3 className="text-lg font-black text-white mb-4">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
              <input 
                type="text" required placeholder="Md. Rahman"
                value={name} onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#030a1a] border border-[#173b7d] text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
              <input 
                type="email" required placeholder="name@example.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#030a1a] border border-[#173b7d] text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Message</label>
              <textarea 
                rows="3" required placeholder="Your inquiry or partnership proposal..."
                value={message} onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#030a1a] border border-[#173b7d] text-sm text-white focus:outline-none focus:border-amber-400"
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Message</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
