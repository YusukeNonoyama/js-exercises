import http from "http";
import url from "url";
import path from "path";
import * as fs from "fs";
function serve(rootDirectory, port) {
    let server = new http.Server();
    server.listen(port);
    console.log("Listening on port", port);
    server.on("request", (request, response) => {
        let endpoint = url.parse(request.url).pathname;
        // 接続確認用のエンドポイント
        if (endpoint === "/test/mirror") {
            response.setHeader("Content-Type", "text/plain;charset=UTF-8");
            response.writeHead(200);
            response.write(`${request.method} ${request.url} HTTP/${request.httpVersion}\r\n`);
            let headers = request.rawHeaders;
            for (let i = 0; i < headers.length; i += 2) {
                response.write(`${headers[i]}:${headers[i + 1]}\r\n`);
            }
            response.write("\r\n");
            request.pipe(response);
        }
        else {
            // リクエストURLから操作ファイルへのパスを抽出
            let filename = endpoint.substring(1);
            filename = filename.replace(/\.\.\//g, "");
            filename = path.resolve(rootDirectory, filename);
            // ファイルタイプを特定
            let type;
            switch (path.extname(filename)) {
                case ".html":
                case ".htm": type = "text/html"; break;
                case ".js": type = "text/javascript"; break;
                case ".css": type = "text/css"; break;
                case ".png": type = "image/png"; break;
                case ".txt": type = "text/plain"; break;
                default: type = "application/octet-stream";
                    break;
            }
            // GETリクエストの場合はファイルを読み込む
            if (request.method === "GET") {
                // リクエストURLで指定したパスでReadableストリームを作成
                let streamRead = fs.createReadStream(filename);
                // ファイルが存在して読み込み可能なとき実行される
                streamRead.once("readable", () => {
                    response.setHeader("Content-Type", type);
                    response.writeHead(200);
                    streamRead.pipe(response);
                });
                streamRead.on("error", (err) => {
                    response.setHeader("Content-Type", "text/plain; charset=UTF-8");
                    response.writeHead(404);
                    response.end(err.message);
                });
            } else if (request.method === "PUT") {
                // リクエストURLで指定したパスでWritableストリームを作成
                let streamWrite = fs.createWriteStream(filename);
                // リクエストbodyのReadableストリームをリクエストURLから生成したWritableストリームに接続し書き込み開始
                request.pipe(streamWrite);
                // 書き込みが終了したらレスポンスを返す
                streamWrite.on("finish", () => {
                    response.setHeader("Content-Type", "text/plain; charset=UTF-8");
                    response.writeHead(200);
                    response.end(`successfully uploaded to "${filename}"`)
                });
                streamWrite.on("error", (err) => {
                    response.setHeader("Content-Type", "text/plain; charset=UTF-8");
                    response.writeHead(404);
                    response.end(err.message);
                });
            } else if (request.method === "POST") { // 非ストリームコピー（ストリームと非ストリームのメモリ使用量検証用）
                fs.copyFile("ch16/ex10/file.txt", "ch16/ex10/file_copy_non_stream.txt", () => { })
                response.setHeader("Content-Type", "text/plain; charset=UTF-8");
                response.writeHead(200);
                response.end(`successfully uploaded to "ch16/ex10/file_copy_non_stream.txt"`)
            }
        }
    });
}
serve(process.argv[2] || "ch16/ex10/", parseInt(process.argv[3]) || 8000);