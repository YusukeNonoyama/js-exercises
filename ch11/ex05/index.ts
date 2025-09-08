export function detectFileType(buffer: ArrayBuffer) {
  let view = new DataView(buffer, 0, buffer.byteLength);
  // テストケースの中であれば始めのバイトだけで拡張子を判別可能
  if (view.getUint8(0) === 0x25) {
    return "PDF";
  } else if (view.getUint8(0) === 0x50) {
    return "ZIP";
  } else if (view.getUint8(0) === 0x47) {
    return "GIF";
  } else if (view.getUint8(0) === 0x89) {
    return "PNG";
  } else {
    return "UNKNOWN";
  }
}

// メモ
// ArrayBufferはメモリを参照する型
// ArrayBufferで型付き配列を定義すると読み書きできるようになる
// bufferプロパティで型付き配列からbuffurを呼べて、それによりDataViewを定義できる。
