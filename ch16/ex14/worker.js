import threads from "worker_threads";

console.log("Worker started...");

threads.parentPort.once("message", ({ data, width, height }) => {
    console.log(data);

    // 以下は前回課題からのコピー**********************
    const gaussianKernel = [
        [1, 4, 6, 4, 1],
        [4, 16, 24, 16, 4],
        [6, 24, 36, 24, 6],
        [4, 16, 24, 16, 4],
        [1, 4, 6, 4, 1]
    ];
    const kernelSize = 5;
    const kernelOffset = Math.floor(kernelSize / 2);
    const kernelSum = 256;

    const dataPixel = new Uint8ClampedArray(data);

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
                    rSum += data[i] * weight;
                    gSum += data[i + 1] * weight;
                    bSum += data[i + 2] * weight;
                }
            }

            const j = (y * width + x) * 4;
            dataPixel[j] = rSum / kernelSum;
            dataPixel[j + 1] = gSum / kernelSum;
            dataPixel[j + 2] = bSum / kernelSum;
            dataPixel[j + 3] = data[j + 3];
        }
    }
    // ここまで前回課題からのコピー**********************

    // メインスレッドへresponseを返す
    threads.parentPort.postMessage({ dataPixel, width, height })
})
