import threads from "worker_threads";
// Nodeのが画像処理でよくつかわれるライブラリ
import sharp from "sharp";

// Web Workerオブジェクトを作成
const worker = new threads.Worker("./ch16/ex14/worker.js");

// データ読み取り
const filepath = process.argv[2];
// ファイルをdecodeしてBufferを取得（sharp）
const { data, info } = await sharp(filepath)
    .ensureAlpha().raw()
    .toBuffer({ resolveWithObject: true })
const { width, height, channels } = info;
// バッファをピクセルに変換
const inputPixel = new Uint8ClampedArray(data);

// 第二引数に型付き配列のバッファを含めるとコピーせずに転送できる（テキスト）
worker.postMessage({ inputPixel, width, height }, [inputPixel.buffer]);

// workerからのメッセージを受け取るイベントハンドラ
worker.on("message", async ({ outputPixel, width, height }) => {
    console.log("message received from Worker Thread...");

    // JPGにencodeしてファイルとして保存
    await sharp(Buffer.from(outputPixel),
        { raw: { width, height, channels } })
        .toFile("ch16/ex14/blurred.jpg");
})

