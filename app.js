const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(`
    APP_NAME: ${process.env.APP_NAME}
    PORT: ${process.env.PORT}
  `);
});

server.listen(3000, () => {
  console.log("Server running");
});