import threads from "worker_threads";

console.log("Worker started...");

// メインスレッドからメッセージを受け取るイベントハンドラ
threads.parentPort.once("message", ({ inputPixel, width, height }) => {
  // 以下は前回課題からのほぼコピー（変数名だけ変更）**********************
  const gaussianKernel = [
    [1, 4, 6, 4, 1],
    [4, 16, 24, 16, 4],
    [6, 24, 36, 24, 6],
    [4, 16, 24, 16, 4],
    [1, 4, 6, 4, 1],
  ];
  const kernelSize = 5;
  const kernelOffset = Math.floor(kernelSize / 2);
  const kernelSum = 256;

  const outputPixel = new Uint8ClampedArray(inputPixel.length);

  for (let y = kernelOffset; y < height - kernelOffset; y++) {
    for (let x = kernelOffset; x < width - kernelOffset; x++) {
      let rSum = 0;
      let gSum = 0;
      let bSum = 0;

      for (let ky = -kernelOffset; ky <= kernelOffset; ky++) {
        for (let kx = -kernelOffset; kx <= kernelOffset; kx++) {
          const px = x + kx;
          const py = y + ky;

          const weight = gaussianKernel[ky + kernelOffset][kx + kernelOffset];

          const i = (py * width + px) * 4;
          rSum += inputPixel[i] * weight;
          gSum += inputPixel[i + 1] * weight;
          bSum += inputPixel[i + 2] * weight;
        }
      }

      const j = (y * width + x) * 4;
      outputPixel[j] = rSum / kernelSum;
      outputPixel[j + 1] = gSum / kernelSum;
      outputPixel[j + 2] = bSum / kernelSum;
      outputPixel[j + 3] = inputPixel[j + 3];
    }
  }
  // ここまで前回課題からのコピー**********************

  // メインスレッドへメッセージを返す
  threads.parentPort.postMessage({ outputPixel, width, height }, [
    outputPixel.buffer,
  ]);
});
