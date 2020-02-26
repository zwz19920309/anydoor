var http = require('http');
http.createServer(function (req, res) {//回调函数
  console.info(req.httpVersion);
  console.info(req.headers);
  console.info(req.method);
  console.info(req.url);
  console.info(req.trailers);
  console.info(req.complete);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('holloe  world');
  res.end('fdsa');
}).listen(8000);