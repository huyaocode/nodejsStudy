var fs = require('fs') //加载fs模块

fs.readdir(process.cwd(), function(err, files) {
  console.log('')

  if (!files.length) {
    return console.log('\033[31m No files \033[39m \n')
  }
  console.log('      select which file or directory you want to see.\n')
  var stats = []
  function file(i) {
    //打印文件名和文件夹名
    var filename = files[i]
    fs.stat(__dirname + '/' + filename, function(err, stat) {
      stats[i] = stat
      if (stat.isDirectory()) {
        console.log('    ' + i + '  \033[36m ' + filename + '/  \033[36m')
      } else {
        console.log('    ' + i + '  \033[90m ' + filename + '  \033[90m')
      }
      i++
      if (i == files.length) {
        read()
      } else {
        file(i)
      }
    })
  }

  function read() {
    console.log('')
    process.stdout.write('    Enter your choice: ')
    process.stdin.resume()
    process.stdin.setEncoding('utf-8')
    process.stdin.on('data', option)
  }

  function option(data) {
    var filename = files[Number(data)]
    if (!files[Number(data)]) {
      process.stdout.write('    \033[31m Enter your choice: \033[39m')
    } else {
      process.stdin.pause()
      if (stats[Number(data)].isDirectory()) {
        fs.readdir(__dirname + '/' + filename, function(err, files) {
          console.log('')
          console.log('(' + files.length + ' files)')
          files.forEach(function(file) {
            console.log('    -    ' + file)
          })
          console.log('')
        })
      } else {
        fs.readFile(__dirname + '/' + filename, 'utf8', function(err, data) {
          console.log('')
          console.log('\033[90m' + data.replace(/(.*)/g, '    $1') + '\033[39m')
        })
      }
    }
  }

  file(0)
})
