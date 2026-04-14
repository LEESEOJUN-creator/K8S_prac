const http = require("http");
const client = require("prom-client");

// 기본 메트릭 수집 
client.collectDefaultMetrics();

// 요청 횟수 카운터
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "path", "status"],
});

const server = http.createServer(async (req, res) => {
  if (req.url === "/metrics") {
    res.writeHead(200, { "Content-Type": client.register.contentType });
    res.end(await client.register.metrics());
    return;
  }

  httpRequestCounter.inc({ method: req.method, path: req.url, status: 200 });
  console.log(`${new Date().toISOString()} ${req.method} ${req.url} 200`);

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello Kubernetes!");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
