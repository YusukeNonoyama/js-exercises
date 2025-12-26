import express from "express";
import path from "path";
import fs from "fs";

export const app = express();

const rootDirectory = "ch16/ex09/";

// パスに一致するGETメソッドのみに対応
app.get("/test/mirror", (req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=UTF-8");
    res.writeHead(200);

    res.write(`${req.method} ${req.originalUrl} HTTP/${req.httpVersion}\r\n`);

    const headers = req.rawHeaders;
    for (let i = 0; i < headers.length; i += 2) {
        res.write(`${headers[i]}:${headers[i + 1]}\r\n`);
    }

    res.write("\r\n");
    req.pipe(res);
});

// ホストへの全てのメソッドで全てのパスを受け取る
app.use((req, res) => {
    let filename = req.path.substring(1);

    filename = filename.replace(/\.\.\//g, "");
    const absolutePath = path.resolve(rootDirectory, filename);

    let type;
    switch (path.extname(absolutePath)) {
        case ".html":
        case ".htm":
            type = "text/html";
            break;
        case ".js":
            type = "text/javascript";
            break;
        case ".css":
            type = "text/css";
            break;
        case ".png":
            type = "image/png";
            break;
        case ".txt":
            type = "text/plain";
            break;
        default:
            type = "application/octet-stream";
    }

    const stream = fs.createReadStream(absolutePath);

    stream.once("readable", () => {
        res.setHeader("Content-Type", type);
        res.status(200);
        stream.pipe(res);
    });

    stream.on("error", (err) => {
        res.setHeader("Content-Type", "text/plain; charset=UTF-8");
        res.status(404).end(err.message);
    });
});

