const fs = require('fs')
const http = require('http')

var dirs = [] //存放所有的文件夹
//读取要访问的文件夹
fs.readdir('./test', function(err, files) {
  for (var i = 0; i < files.length; i++) {
    var theFileName = files[i]
    fs.stat('./test/' + theFileName, function(err, stats) {
      if (stats.isDirectory()) {
        dirs.push(theFileName)
      }
      console.log(dirs)
    })
  }
})

/** 
 * 打印结果如下
 * 原因是fs.stat是异步的，在获取文件信息时发出了请求就再读取下一给文件名，因为是异步的原因theFileName会全变成数组的最后一项
[]
[]
[ 'bbb' ]
[ 'bbb', 'bbb' ]
 */