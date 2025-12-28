import net from "net";

const PORT = 8000;

const server = net.createServer((socket) => {
    socket.on("data", (data) => {
        // バイナリから文字列に変換
        const request = data.toString();
        // 文字列の最初の行にあるメソッドとパスを抽出
        const lines = request.split("\r\n");
        const [method, path] = lines[0].split(" ");

        // "/"が GET されたとき以下の HTML を返却する
        if (method === "GET" && path === "/") {
            const body = `<!doctype html>
<html lang="ja">
  <head><meta charset="UTF-8" /><title>Greeting Form</title></head>
  <body>
    <form action="/greeting" method="POST">
      <label for="name">Name:</label><input type="text" id="name" name="name" />
      <label for="greeting">Greeting:</label><input type="text" id="greeting" name="greeting" />
      <button type="submit">Submit</button>
    </form>
  </body>
</html>`;
            sendResponse(socket, 200, "OK", body);

            // POST /greeting の場合
        } else if (method === "POST" && path === "/greeting") {
            // ボディ部を取得（ヘッダーとボディは \r\n\r\n で区切られている）
            const bodyContent = request.split("\r\n\r\n")[1];
            const params = new URLSearchParams(bodyContent);
            const name = params.get("name") || "unknown";
            const greeting = params.get("greeting") || "none";

            const responseBody = `<html><body><h1>Received!</h1><p>Name: ${name}</p><p>Greeting: ${greeting}</p></body></html>`;
            sendResponse(socket, 200, "OK", responseBody);

            // 3. 非対応のメソッド/パス
        } else if (path === "/" || path === "/greeting") {
            sendResponse(socket, 405, "Method Not Allowed", "Method Not Allowed");
        } else {
            sendResponse(socket, 404, "Not Found", "Page Not Found");
        }
    });

    socket.on("error", (err) => {
        console.error(err);
    });
});

// レスポンスを構築して送信するヘルパー関数
function sendResponse(socket, statusCode, statusMessage, body) {
    const response = [
        `HTTP/1.1 ${statusCode} ${statusMessage}`,
        "Content-Type: text/html; charset=utf-8",
        `Content-Length: ${Buffer.byteLength(body)}`,
        "Connection: close",
        "",
        body
    ].join("\r\n");

    socket.write(response);
    socket.end(); // 送信後に接続を閉じる
}

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

// 同時接続数の検証用
let i = 1;
server.on("connection", (socket) => {
    socket.on('error', (err) => {
        console.log("err:", err);
    })
    console.log(`connected: ${i}`);
    i++;
    // socket.end();
})
