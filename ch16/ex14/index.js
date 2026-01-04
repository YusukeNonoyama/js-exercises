import threads from "worker_threads";
import sharp from "sharp";

// Web Workerオブジェクトを作成
const worker = new threads.Worker("./ch16/ex14/worker.js");

const filepath = process.argv[2];

// ファイルをdecodeしてBufferを取得
const { data, info } = await sharp(filepath)
    .ensureAlpha().raw()
    .toBuffer({ resolveWithObject: true })
const { width, height, channels } = info;

const inputPixel = new Uint8ClampedArray(data);

// 第二引数に型付き配列のバッファを含めるとコピーせずに転送できる
worker.postMessage({ inputPixel, width, height }, [inputPixel.buffer]);
worker.on("message", async ({ outputPixel, width, height }) => {
    console.log("message received from Worker Thread...");

    // JPGにencodeしてファイルとして保存
    await sharp(Buffer.from(outputPixel),
        { raw: { width, height, channels } })
        .toFile("ch16/ex14/blurred.jpg");

    console.log("Saved blurred.jpg");
})

