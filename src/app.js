const http = require('http');
// const chalk = require('chalk');
const path = require('path');
const conf = require('./config/defaultConfig');
const route = require('./helper/route');
class Server {

  constructor(config) {
    this.conf = Object.assign({}, conf, config);
  }

  start() {
    http.createServer((req, res) => {
      const url = req.url;
      const filePath = path.join(conf.root, url);
      route(req, res, filePath, conf);
    }).listen(conf.port);
    // const server = http.createServer((req, res) => {
    //   const url = req.url;
    //   const filePath = path.join(this.conf.root, url);
    //   route(req, res, filePath, this.conf);
    // });

    // server.listen(this.conf.port, this.conf.hostname, () => {
    //   const addr = `http://${conf.hostname}:${this.conf.port}`;
    //   console.info(`u Server started at ${chalk.green(addr)}`);
    // });
  }
}

module.exports = Server;