const fs = require('fs')
const http = require('http')

var dirs = [] //存放所有的文件夹
//读取要访问的文件夹
fs.readdir('./test', function(err, files) {
  ;(function file(i) {
    if (i == files.length) {
      return
    }
    fs.stat('./test/' + files[i], function(err, stats) {
      if (stats.isDirectory()) {
        dirs.push(files[i])
      }
      console.log(dirs)
      file(i + 1)
    })
  })(0)
})
/**
 * 正确的输出
[]
[]
[ 'aaa' ]
[ 'aaa', 'bbb' ]
 */
