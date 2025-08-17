export function little2Big(uint32: any) {
    // バッファに対するViewを作る
    let view = new DataView(uint32.buffer,
        uint32.byteOffset,
        uint32.byteLength,
    )
    // リトルエンディアンのバイト列として引数のデータを読み込み（第二引数がtrue）
    const littleEndian = view.getUint32(0, true);
    // ビッグエンディアンのバイト列に変換してbufferに書き込み（第二引数がfalse）
    view.setUint32(0, littleEndian, false)
    // 符号なし 32 ビット整数の配列にして返す
    return new Uint32Array(view.buffer);
}

export function big2Little(uint32: any) {
    // バッファに対するViewを作る
    let view = new DataView(uint32.buffer,
        uint32.byteOffset,
        uint32.byteLength,
    )
    // ビッグエンディアンのバイト列として引数のデータを読み込み（第二引数がfalse）
    const bigEndian = view.getUint32(0, false);
    // リトルエンディアンのバイト列に変換してbufferに書き込み（第二引数がtrue）
    view.setUint32(0, bigEndian, true)
    // 符号なし 32 ビット整数の配列にして返す
    return new Uint32Array(view.buffer);
}
