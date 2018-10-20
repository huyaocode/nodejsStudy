const http = require('http');
const qs = require('querystring')

http.createServer(function(req, res) {
  if('/' === req.url){
    res.writeHead(200, {
      'Content-type': 'text/html'
    })
    res.end(
      `
      <form method="POST" action="/url">
        <p>What's your name ?</p>
        <input name="name">
        <div><button>Submit</button></div>
      </form>
      `
    )
  } else if('/url' === req.url && 'POST' === req.method) {
    var content = '';
    req.on('data', function(chunk){
      content += chunk;
    })
    req.on('end', function(){
      res.writeHead(200,{
        'Content-Type': 'text/html'
      })
      res.end(`<p>Name: ${qs.parse(content).name}</p>`)
    })
  } else {
    res.writeHead(404);
    res.end('404 Not Found!')
  }
}).listen(3000)