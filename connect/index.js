
var connect = require('connect');
var app = connect()
    .use(connect.logger())
    .use(function (req, res) {
        res.end('hello world\n');
    })
    .listen(3000);