import React from 'react';
import { X, Play } from 'lucide-react';

export default function VideoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#071738] border-2 border-amber-400/50 rounded-3xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-[#173b7d]">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
            <Play className="w-4 h-4 fill-amber-400" />
            <span>SR Investment — Platform Overview &amp; Strategy</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="aspect-video w-full bg-slate-900 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg mb-4 cursor-pointer hover:scale-110 transition-transform">
            <Play className="w-8 h-8 fill-slate-950 ml-1" />
          </div>
          <h4 className="text-xl font-bold text-white mb-2">Automated Forex &amp; Gold Arbitrage Trading</h4>
          <p className="text-sm text-slate-300 max-w-md">
            Discover how SR Investment guarantees steady monthly profit shares through institutional hedge fund strategies.
          </p>
        </div>
      </div>
    </div>
  );
}
