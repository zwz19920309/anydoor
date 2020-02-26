const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
// const config = require('../config/defaultConfig');
const compress = require('./compress');
const mime = require('./mime');
const range = require('./range');
const isFresh = require('./cache');

const tplPath = path.join(__dirname, '../template/dir.tpl');
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());
module.exports = async function (req, res, filePath, config) {
  try {
    let contentType = mime(filePath);
    const stats = await stat(filePath);
    if (isFresh(stats, req, res)) {
      res.statusCode = 304;
      res.end();
      return;
    }
    if (stats.isFile()) {
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      let rs;
      const { code, start, end } = range(stats.size, req, res);
      if (code === 200) {
        res.statusCode = 200;
        rs = fs.createReadStream(filePath);
      } else {
        res.statusCode = 206;
        rs = fs.createReadStream(filePath, { start: start, end: end });
      }
      if (filePath.match(config.compress)) {
        rs = compress(rs, req, res);
      }
      rs.pipe(res);
      // let rs = fs.createReadStream(filePath);
      // if (filePath.match(config.compress)) {
      //   rs = compress(rs, req, res);
      // }
      // rs.pipe(res);
      // fs.createReadStream(filePath).pipe(res);
    } else if (stats.isDirectory()) {
      let files = await readdir(filePath);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      const dir = path.relative(config.root, filePath);
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
        files: files.map(file => {
          return {
            file,
            icon: mime(file)
          };
        })
      };
      res.end(template(data));
    }
  } catch (error) {
    console.error(error);
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`${filePath} is not a directory or file`);
    return;
  }
};