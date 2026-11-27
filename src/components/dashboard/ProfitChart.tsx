import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function ProfitChart({ user, fmt }) {
  const [chartRange, setChartRange] = useState('6M');

  const chartPoints = {
    '7D': [{ m: 'Mon', v: 240 }, { m: 'Tue', v: 260 }, { m: 'Wed', v: 255 }, { m: 'Thu', v: 280 }, { m: 'Fri', v: 300 }, { m: 'Sat', v: 310 }, { m: 'Sun', v: 315 }],
    '30D': [{ m: 'W1', v: 220 }, { m: 'W2', v: 250 }, { m: 'W3', v: 285 }, { m: 'W4', v: 315 }],
    '3M': [{ m: 'Aug', v: 280 }, { m: 'Sep', v: 260 }, { m: 'Oct', v: 315 }],
    '6M': [{ m: 'May', v: 100 }, { m: 'Jun', v: 250 }, { m: 'Jul', v: 230 }, { m: 'Aug', v: 280 }, { m: 'Sep', v: 260 }, { m: 'Oct', v: 315 }],
    '1Y': [{ m: 'Nov', v: 80 }, { m: 'Jan', v: 140 }, { m: 'Mar', v: 190 }, { m: 'May', v: 220 }, { m: 'Jul', v: 260 }, { m: 'Oct', v: 315 }],
    'All': [{ m: '2023', v: 50 }, { m: '2024 Q1', v: 140 }, { m: '2024 Q2', v: 220 }, { m: '2024 Q3', v: 270 }, { m: '2024 Q4', v: 315 }]
  };

  const hasProfit = Number(user?.total_profit || user?.profit || user?.monthly_profit || 0) > 0;
  const rawPoints = chartPoints[chartRange] || chartPoints['6M'];
  const activePoints = rawPoints.map(pt => ({
    ...pt,
    v: hasProfit ? pt.v : 0
  }));
  const svgW = 440;
  const svgH = 150;
  const maxV = 400;

  const points = activePoints.map((pt, i) => {
    const x = 32 + (i * (svgW - 55)) / (activePoints.length - 1);
    const y = svgH - 22 - (pt.v / maxV) * (svgH - 42);
    return { x, y, m: pt.m };
  });

  const pathD = points.reduce((acc, pt, i, arr) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[i - 1];
    const cpX = (prev.x + pt.x) / 2;
    return `${acc} C ${cpX} ${prev.y}, ${cpX} ${pt.y}, ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgH - 22} L ${points[0].x} ${svgH - 22} Z`;

  return (
    <div className="lg:col-span-5 bg-[#051330] border border-[#173870] rounded-2xl p-4 flex flex-col justify-between shadow-xl">
      <div>
        <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#143063] gap-2">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>Monthly Profit Overview</span>
          </div>

          <div className="flex items-center space-x-1 text-[10px] font-bold bg-[#030c1f] p-0.5 rounded-lg border border-[#143269]">
            {['7D', '30D', '3M', '6M', '1Y', 'All'].map(range => (
              <button
                key={range}
                onClick={() => setChartRange(range)}
                className={`px-2 py-0.5 rounded-md transition ${chartRange === range ? 'bg-amber-400 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'}`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mt-3 items-center">
          <div className="sm:col-span-7 relative">
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-36">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {[0, 100, 200, 300, 400].map(gridVal => {
                const yPos = svgH - 22 - (gridVal / maxV) * (svgH - 42);
                return (
                  <g key={gridVal}>
                    <text x="2" y={yPos + 3} fill="#64748b" fontSize="8" fontWeight="bold">{gridVal}</text>
                    <line x1="22" y1={yPos} x2={svgW - 5} y2={yPos} stroke="#132b57" strokeDasharray="2 2" />
                  </g>
                );
              })}

              <path d={areaD} fill="url(#chartGrad)" />
              <path d={pathD} fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />

              {points.map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="3.5" fill="#38bdf8" stroke="#051330" strokeWidth="2" />
                  <text x={pt.x} y={svgH - 6} fill="#94a3b8" fontSize="8.5" textAnchor="middle" fontWeight="bold">
                    {pt.m}
                  </text>
                </g>
              ))}
            </svg>

            <div className="flex items-center space-x-3 text-[10px] text-slate-400 mt-1 pl-4">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>Monthly Profit</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                <span>Previous Month</span>
              </span>
            </div>
          </div>

          <div className="sm:col-span-5 bg-[#030c1f] border border-[#143269] rounded-xl p-3 text-center space-y-2">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Current Month Profit
              </span>
              <span className="text-xl font-black text-emerald-400 block mt-0.5">
                {fmt(user.current_month_profit)}
              </span>
              <span className="text-[11px] font-bold text-emerald-400">
                ↑ +{user.current_month_growth}%
              </span>
            </div>

            <div className="pt-2 border-t border-[#122b59]">
              <span className="text-[10px] font-semibold text-slate-400 block">
                Previous Month
              </span>
              <span className="text-sm font-bold text-slate-200 mt-0.5 block">
                {fmt(user.previous_month_profit)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
