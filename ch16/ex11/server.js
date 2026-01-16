import { server } from "./app.js";

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

// 同時接続数の検証用
let i = 1;
server.on("connection", (socket) => {
  socket.on("error", (err) => {
    console.log("err:", err);
  });
  console.log(`connected: ${i}`);
  i++;
  // socket.end();
});
