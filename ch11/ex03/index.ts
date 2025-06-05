export function little2Big(uint32: any) {
    // リトルエンディアンのバイト列として引数を読込み
    let littleEndian = new Int8Array(uint32.buffer);
    let view = new DataView(littleEndian.buffer,
        littleEndian.byteOffset,
        littleEndian.byteLength,
    )
    // ビッグエンディアンへ変換したのち、符号なし 32 ビット整数の配列にして返す
    return new Uint32Array([view.getUint32(0, false)]);
}

export function big2Little(uint32: any) {
    // ビッグエンディアンのバイト列として引数を読込み
    let bigEndian = new Int8Array(uint32.buffer).reverse();
    let view = new DataView(bigEndian.buffer,
        bigEndian.byteOffset,
        bigEndian.byteLength,
    )
    // ビッグエンディアンへ変換したのち、符号なし 32 ビット整数の配列にして返す
    return new Uint32Array([view.getUint32(0, true)]);
}

// export function little2Little(uint32: any) {
//     // リトルエンディアンのバイト列として引数を読込み
//     let littleEndian = new Int8Array(uint32.buffer);
//     let view = new DataView(littleEndian.buffer,
//         littleEndian.byteOffset,
//         littleEndian.byteLength,
//     )
//     // リトルエンディアンで出力したのち、符号なし 32 ビット整数の配列にして返す
//     return new Uint32Array([view.getUint32(0, true)]);
// }

// console.log("=== <little to big> ========================");
// console.log(little2Big(new Uint32Array([1])));
// console.log("=== <big to little> ========================");
// console.log(big2Little(new Uint32Array([1])));
// console.log("=== <little to little> ========================");
// console.log(little2Little(new Uint32Array([1])));

// console.log(0x01000000);
