const http = require("http");
const os = require("os");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello Kubernetes v2!");  
});

server.listen(3000, () => {
  console.log("Server running");
});