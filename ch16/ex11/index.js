import net from "net";
for (let i = 1; i <= 100000; i++) {
  net.createConnection(8000, "localhost");
}
