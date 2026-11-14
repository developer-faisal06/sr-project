import React from 'react';
import { portfolioAssets } from '../data/mockData';
import { PieChart, ArrowUpRight, Shield, Wallet, DollarSign, Activity } from 'lucide-react';

export default function Dashboard() {
  return (
    <section id="dashboard" className="py-20 bg-slate-900/50 border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-indigo-400 font-semibold text-sm tracking-wider uppercase">Portfolio Overview</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Smart Asset Distribution</h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md mt-4 md:mt-0">
            Our algorithmic rebalancing ensures your portfolio stays optimized across global markets for maximum risk-adjusted returns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Portfolio Stat Card */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center text-indigo-400">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold">Consolidated Wealth</h4>
                  <p className="text-xs text-slate-400">All connected accounts</p>
                </div>
              </div>
              <span className="flex items-center text-emerald-400 text-sm font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <ArrowUpRight className="w-4 h-4 mr-1" /> +14.2% YoY
              </span>
            </div>

            <div className="py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400">Net Portfolio Value</span>
                <p className="text-2xl font-bold text-white mt-1">$106,842.50</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400">Total Profit Earned</span>
                <p className="text-2xl font-bold text-emerald-400 mt-1">+$18,420.10</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400">Risk Score</span>
                <p className="text-2xl font-bold text-indigo-400 mt-1">Balanced (4.2)</p>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
              <span>Last Rebalanced: Today, 09:30 AM</span>
              <span className="text-indigo-400 font-semibold cursor-pointer hover:underline">View Detailed Statement &rarr;</span>
            </div>
          </div>

          {/* Asset Breakdown List */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-white font-bold flex items-center">
                  <PieChart className="w-5 h-5 text-indigo-400 mr-2" /> Asset Classes
                </h4>
                <span className="text-xs text-slate-400 font-medium">4 Assets</span>
              </div>

              <div className="space-y-4">
                {portfolioAssets.map((asset, index) => (
                  <div key={index} className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={`w-3 h-3 rounded-full ${asset.color}`}></span>
                        <span className="text-sm font-semibold text-white">{asset.category}</span>
                      </div>
                      <span className="text-sm font-bold text-slate-200">{asset.amount}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Share: {asset.percentage}%</span>
                      <span className="text-emerald-400 font-medium">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
