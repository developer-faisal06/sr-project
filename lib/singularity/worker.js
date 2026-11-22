// Singularity-Tier Web Worker script for parallel dataset processing using SharedArrayBuffer & Atomics
self.onmessage = async (e) => {
  const { sab, workerId, totalWorkers, numRows } = e.data;
  const float32View = new Float32Array(sab);
  
  // Partition work across threads
  const chunkSize = Math.ceil(numRows / totalWorkers);
  const start = workerId * chunkSize;
  const end = Math.min(start + chunkSize, numRows);

  let localSum = 0;
  let localMin = Infinity;
  let localMax = -Infinity;

  // High-performance vectorised compute pass (simulating Wasm SIMD execution)
  for (let i = start; i < end; i++) {
    const val = float32View[i];
    localSum += val;
    if (val < localMin) localMin = val;
    if (val > localMax) localMax = val;
  }

  // Use Atomics for atomic synchronization back into shared memory reduction slots
  // Indices numRows + 0 (sum), + 1 (min), + 2 (max), + 3 (completed workers counter)
  const int32View = new Int32Array(sab, numRows * Float32Array.BYTES_PER_ELEMENT);
  
  // Atomic add for sum (stored as fixed-point integers * 1000 for precision or direct float atomic CAS loops)
  // For extreme speed, we write worker partial results into dedicated atomic result slots
  Atomics.store(int32View, workerId * 3 + 0, Math.round(localSum));
  Atomics.store(int32View, workerId * 3 + 1, Math.round(localMin * 1000));
  Atomics.store(int32View, workerId * 3 + 2, Math.round(localMax * 1000));

  // Signal completion
  const finishedCount = Atomics.add(int32View, numRows * 3, 1) + 1;
  
  self.postMessage({ workerId, finished: finishedCount === totalWorkers });
};
