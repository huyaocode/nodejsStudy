const fs = require('fs')
const http = require('http')
const url = require('url')
const path = require('path')
const mime = require('./mime')

http
  .createServer((req, res) => {
    var pathname = url.parse(req.url).pathname
    //首页
    if (pathname === '/') {
      pathname = '../src/index.html'
    }
    fs.readFile(path.normalize('../static/' + pathname), (err, data) => {
      //404页面
      if (err || data == undefined) {
        fs.readFile('../src/404.html', function(err, data) {
          res.writeHead(404, { 'Content-Type': 'text/html;charset=UTF8' })
          res.end(data)
        })
      } else {
        let type = mime(pathname)
        res.writeHead(200, { 'Content-Type': type })
        res.end(data)
      }
    })
  })
  .listen(3000)
