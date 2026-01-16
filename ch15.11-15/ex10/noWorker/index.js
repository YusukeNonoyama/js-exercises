document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    const width = img.width;
    const height = img.height;

    // 5x5 ガウシアンカーネル
    const gaussianKernel = [
      [1, 4, 6, 4, 1],
      [4, 16, 24, 16, 4],
      [6, 24, 36, 24, 6],
      [4, 16, 24, 16, 4],
      [1, 4, 6, 4, 1],
    ];
    const kernelSize = 5;
    const kernelOffset = Math.floor(kernelSize / 2); // 開始点のオフセット
    const kernelSum = 256; // カーネル要素の合計

    // (r, g, b, α) × 画素分の型付き配列
    const outputData = new Uint8ClampedArray(imageData.data.length);

    // 開始点のオフセット分の除いたすべての画素をループ
    for (let y = kernelOffset; y < height - kernelOffset; y++) {
      for (let x = kernelOffset; x < width - kernelOffset; x++) {
        let rSum = 0;
        let gSum = 0;
        let bSum = 0;

        // 計算対象の画素からカーネルのサイズ分をループしてr, g, b をそれぞれ計算
        for (let ky = -kernelOffset; ky <= kernelOffset; ky++) {
          for (let kx = -kernelOffset; kx <= kernelOffset; kx++) {
            // (x, y)：計算対象の画素座標
            //（kx, ky）：カーネルの座標（カーネル中心が（0, 0））
            //（px, py）：このループの変数
            const px = x + kx;
            const py = y + ky;
            // カーネルのウエイトを参照
            const weight = gaussianKernel[ky + kernelOffset][kx + kernelOffset];
            // カーネル内の１要素をweightをかけて加算
            const i = (py * width + px) * 4;
            rSum += data[i] * weight;
            gSum += data[i + 1] * weight;
            bSum += data[i + 2] * weight;
          }
        }

        // 計算した値を画素の値を代入
        const j = (y * width + x) * 4;
        outputData[j] = rSum / kernelSum;
        outputData[j + 1] = gSum / kernelSum;
        outputData[j + 2] = bSum / kernelSum;
        outputData[j + 3] = data[j + 3]; // Alpha はそのまま
      }
    }

    // TODO: ここで imageData.data を参照して outputData に結果を格納
    const outputImageData = new ImageData(outputData, img.width, img.height);
    filteredCtx.putImageData(outputImageData, 0, 0);
  });

  reader.readAsDataURL(file);
});
