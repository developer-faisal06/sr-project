import React from 'react';
import { testimonials } from '../data/mockData';
import { Quote, Star } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-slate-900/50 border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-indigo-400 font-semibold text-sm tracking-wider uppercase">Client Success</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Trusted by Thousands of Investors</h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Hear what our community members have to say about their wealth growth journey with SR Investment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between shadow-xl relative">
              <div className="absolute top-6 right-6 text-indigo-500/20">
                <Quote className="w-10 h-10" />
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex space-x-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">"{item.quote}"</p>
              </div>

              <div className="flex items-center space-x-4 pt-4 border-t border-slate-800">
                <img src={item.avatar} alt={item.author} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/30" />
                <div>
                  <h4 className="text-white font-bold text-sm">{item.author}</h4>
                  <p className="text-xs text-slate-400">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
