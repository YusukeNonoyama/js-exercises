// Burning Ship というフラクタルを描画するWorker
// マンデルブロ集合と似ていて、初期値がz=0で、二乗計算の前に実部と虚部をそれぞれ絶対値を取る点が異なる
onmessage = function (message) {
  const { tile, x0, y0, perPixel, maxIterations } = message.data;
  const { width, height } = tile;
  // 計算の効率化のために Uint8ClampedArray → Uint32Array のViewにする
  // R,G,B,Aそれぞれの8bit配列の連続 → 0xRRGGBBAA とピクセル単位で表現する
  const imageData = new ImageData(width, height);
  const iterations = new Uint32Array(imageData.data.buffer);

  let index = 0,
    max = 0,
    min = maxIterations;
  for (let row = 0, y = y0; row < height; row++, y += perPixel) {
    for (let column = 0, x = x0; column < width; column++, x += perPixel) {
      let n;

      // Burning Ship の初期値
      // let r = x, i = y;
      let r = 0,
        i = 0;

      for (n = 0; n < maxIterations; n++) {
        // Burning Ship は絶対値を取る
        let ar = Math.abs(r);
        let ai = Math.abs(i);

        let rr = ar * ar,
          ii = ai * ai;
        if (rr + ii > 4) {
          break;
        }
        i = 2 * ar * ai + y;
        r = rr - ii + x;
      }
      iterations[index++] = n;
      if (n > max) max = n;
      if (n < min) min = n;
    }
  }
  postMessage({ tile, imageData, min, max }, [imageData.data.buffer]);
};
