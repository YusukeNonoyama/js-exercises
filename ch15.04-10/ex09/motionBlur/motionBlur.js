function smear(c, n, x, y, w, h) {
  let pixels = c.getImageData(x, y, w, h);
  let width = pixels.width,
    height = pixels.height;
  let data = pixels.data;
  let m = n - 1;
  for (let row = 0; row < height; row++) {
    let i = row * width * 4 + 4;
    for (let col = 1; col < width; col++, i += 4) {
      data[i] = (data[i] + data[i - 4] * m) / n;
      data[i + 1] = (data[i + 1] + data[i - 3] * m) / n;
      data[i + 2] = (data[i + 2] + data[i - 2] * m) / n;
      data[i + 3] = (data[i + 3] + data[i - 1] * m) / n;
      component;
    }
  }
  c.putImageData(pixels, x, y);
}

let canvas = document.querySelector("#square"); // Get first canvas element
let c = canvas.getContext("2d"); // Get 2D drawing context

smear(c, 5, 5, 5, 10, 10);
