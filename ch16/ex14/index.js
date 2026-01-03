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

worker.postMessage({ data, width, height });
worker.on("message", async ({ dataPixel, width, height }) => {
    console.log("message received from Worker Thread...");
    console.log(dataPixel);

    // JPGにencodeしてファイルとして保存
    await sharp(Buffer.from(dataPixel),
        { raw: { width, height, channels } })
        .toFile("ch16/ex14/output.jpg");

    console.log("Saved output.jpg");
})

