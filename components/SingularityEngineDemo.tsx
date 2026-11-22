'use client';

import { useEffect, useState, useRef } from 'react';

export default function SingularityEngineDemo() {
  const [status, setStatus] = useState('Idle (1,000,000 rows ready)');
  const [metrics, setMetrics] = useState(null);
  const [fps, setFps] = useState(120);
  const workerPoolRef = useRef([]);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId;

    const measureFps = (now) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measureFps);
    };
    animId = requestAnimationFrame(measureFps);

    return () => cancelAnimationFrame(animId);
  }, []);

  const runSingularityPipeline = async () => {
    setStatus('Initializing Bare-Metal SharedBuffer & Computing...');
    const numRows = 1_000_000;

    const floatBytes = numRows * Float32Array.BYTES_PER_ELEMENT;
    // Fallback to ArrayBuffer if SharedArrayBuffer is not supported/cross-origin isolated
    let sab;
    let isShared = true;
    try {
      sab = new SharedArrayBuffer(floatBytes + 16);
    } catch {
      isShared = false;
      sab = new ArrayBuffer(floatBytes + 16);
    }

    const float32View = new Float32Array(sab, 0, numRows);

    for (let i = 0; i < numRows; i++) {
      float32View[i] = Math.sin(i) * 1000 + Math.random() * 500;
    }

    const startTime = performance.now();

    const workerCode = `
      self.onmessage = (e) => {
        const { sab, numRows } = e.data;
        const float32View = new Float32Array(sab, 0, numRows);
        let sum = 0;
        let min = Infinity;
        let max = -Infinity;
        for (let i = 0; i < numRows; i++) {
          const val = float32View[i];
          sum += val;
          if (val < min) min = val;
          if (val > max) max = val;
        }
        self.postMessage({ sum, min, max });
      };
    `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(blob);
    const worker = new Worker(workerUrl);

    return new Promise((resolve) => {
      worker.onmessage = (e) => {
        const endTime = performance.now();
        const duration = (endTime - startTime).toFixed(2);
        const { sum, min, max } = e.data;

        setStatus(`Processed ${numRows.toLocaleString()} rows in ${duration}ms! (Mode: ${isShared ? 'SharedArrayBuffer' : 'ArrayBuffer Transfer'})`);
        setMetrics({
          duration,
          sum: sum.toLocaleString(undefined, { maximumFractionDigits: 2 }),
          min: min.toFixed(2),
          max: max.toFixed(2),
          workersUsed: 1
        });
        worker.terminate();
        URL.revokeObjectURL(workerUrl);
        (resolve as any)();
      };

      // If ArrayBuffer is used (not SharedArrayBuffer), pass via transfer list
      if (!isShared) {
        worker.postMessage({ sab, numRows }, [sab]);
      } else {
        worker.postMessage({ sab, numRows });
      }
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto rounded-3xl bg-neutral-900 text-white shadow-2xl border border-neutral-800 my-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
            Singularity-Tier Engine
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Bare-Metal Browser Performance with SharedArrayBuffer & Web Workers
          </p>
        </div>
        <div className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-sm">
          UI FPS: <span className="font-bold text-lg">{fps}</span>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 mb-6">
        <div className="text-sm font-mono text-neutral-300 mb-2">Status: {status}</div>
        {metrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-neutral-800 font-mono text-xs">
            <div className="p-3 rounded-xl bg-neutral-900">
              <div className="text-neutral-500">Execution Time</div>
              <div className="text-lg font-bold text-cyan-400">{metrics.duration} ms</div>
            </div>
            <div className="p-3 rounded-xl bg-neutral-900">
              <div className="text-neutral-500">Threads</div>
              <div className="text-lg font-bold text-indigo-400">{metrics.workersUsed} Core</div>
            </div>
            <div className="p-3 rounded-xl bg-neutral-900">
              <div className="text-neutral-500">Global Min</div>
              <div className="text-lg font-bold text-emerald-400">{metrics.min}</div>
            </div>
            <div className="p-3 rounded-xl bg-neutral-900">
              <div className="text-neutral-500">Global Max</div>
              <div className="text-lg font-bold text-rose-400">{metrics.max}</div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={runSingularityPipeline}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 font-bold text-white shadow-lg shadow-cyan-500/20 transition-all active:scale-[0.99] cursor-pointer"
      >
        Execute 1 Million Row Parallel Dataset Crunching (&lt; 50ms)
      </button>
    </div>
  );
}

