import * as fs from "fs";

const option = process.argv[2];

if (option === "stream") {  // ストリーム形式でリクエストを送信
    // NOTE: file.txt の内容をアップロード
    const res = await fetch("http://localhost:8000/file_copy_stream.txt", {
        method: "PUT",
        body: fs.createReadStream("ch16/ex10/file.txt"),
        // request bodyにストリームを入れる場合に必要なフラグ
        duplex: "half",
    });
    const text = await res.text();
    console.log(text);
} else if (option === "non-stream") {  // 非ストリームでファイルコピー
    const res = await fetch("http://localhost:8000", {
        method: "POST",
        body: {},
    });
    const text = await res.text();
    console.log(text);
} else {
    console.log("usage: 'stream' or 'non-stream'")
}