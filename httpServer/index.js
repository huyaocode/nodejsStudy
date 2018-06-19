const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    var queryStart = req.url.indexOf('?');
    if (queryStart != -1) {
        var queryArrkey = req.url.slice(queryStart + 1).split('&');
        var query = {};
        queryArrkey.forEach(function (ele, index) {
            let tempKV = ele.split('=');
            query[tempKV[0]] = tempKV[1];
        })
        var queryJson = JSON.stringify(query);
        console.log(queryJson)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(queryJson);
    }
})

server.listen(port, hostname, () => {
    console.log(`Server runing at http://${hostname}:${port}/`);
})