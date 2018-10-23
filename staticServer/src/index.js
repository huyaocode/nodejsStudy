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
      console.log('data   ',data)
      //404页面
      if (err || data == undefined) {
        console.log('com')
        fs.readFile('../src/404.html', function(err, data) {
          res.writeHead(404, { 'Content-Type': 'text/html;charset=UTF8' })
          res.end(data)
        })
      } else {
        let type = mime(pathname)
        console.log(pathname)
        res.writeHead(200, { 'Content-Type': type })
        res.end(data)
      }
    })
  })
  .listen(3000)
