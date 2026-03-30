const http = require("http");

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello Kubernetes!");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});