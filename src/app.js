const http = require('http');
const chalk = require('chalk');
// const path = require('path');
const conf = require('./config/defaultConfig');
// const route = require('./helper/route');
const server = http.createServer((req, res) => {
  // const url = req.url;
  // const filePath = path.join(conf.root, url);
  // route(req, res, filePath, conf);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('holloe  world');
  res.end('fdsa');
});

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`;
  console.info(`u Server started at ${chalk.green(addr)}`);
});
// class Server {

//   constructor(config) {
//     this.conf = Object.assign({}, conf, config);
//   }

//   start() {
//     const server = http.createServer((req, res) => {
//       const url = req.url;
//       const filePath = path.join(this.conf.root, url);
//       route(req, res, filePath, this.conf);
//     });

//     server.listen(this.conf.port, this.conf.hostname, () => {
//       const addr = `http://${conf.hostname}:${this.conf.port}`;
//       console.info(`u Server started at ${chalk.green(addr)}`);
//     });
//   }

// }

// module.exports = Server;