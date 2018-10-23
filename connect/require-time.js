/**
 * 请求时间中间件
 *
 * @param {Object} opts 长响应时间
 */

module.exports = function(opts) {
  const time = opts.time || 100
  return function(req, res, next) {
    var timer = setTimeout(function() {
      console.log(' is taking too long!', req.mothod, req.url)
    }, time)

    var end = res.end
    res.end = function(chunk, encoding) {
      res.end = end
      res.end(chunk, encoding)
      clearTimeout(timer)
    }
    next();
  }
}
