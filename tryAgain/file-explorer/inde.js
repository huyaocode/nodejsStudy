const fs = require('fs')

//第一步，读取当前文件夹路径
fs.readdir(process.cwd(), function(err, files) {
  //如果当前目录下没有任何东西，直接打印 no file 并结束程序
  if (files.length === 0) {
    console.log('\033[31m No files \033[39m \n')
    return
  }
  file()
  const stats = [] //保存当前文件夹下所有的文件信息，因为会在多个函数中用到
  //读取当前文件夹内的信息
  function file() {
    //遍历当前文件夹下所有文件
    for (let i in files) {
      //读取这个文件的信息
      fs.stat(process.cwd() + '/' + files[i], function(err, stat) {
        stats[i] = stat
        if (stat.isDirectory()) {
          console.log('    ' + i + '  \033[36m /' + files[i] + '  \033[90m')
        } else {
          console.log('    ' + i + '  \033[36m ' + files[i] + '  \033[90m')
        }
        //【因为fs.stat是异步的，所以要把遍历完后的操作放在这里】
        if (i == files.length - 1) {
          read()
        }
      })
    }
  }
  //等待用户读入信息
  function read() {
    console.log('')
    process.stdout.write('    Enter your choice:  ')
    //等待用户输入
    process.stdin.resume()
    process.stdin.setEncoding('utf-8')
    //绑定事件
    process.stdin.on('data', option)
  }
  /**
   * 处理用户输入
   * @param {*} data 用户输入的字符串
   */
  function option(data) {
    const filename = files[Number(data)]
    if (!filename) {
      process.stdout.write('    \033[31m Enter your choice:  \033[39m')
    } else {
      process.stdin.pause() //停止等待用户输入
      //如果选中的是一个文件夹
      if (stats[Number(data)].isDirectory()) {
        fs.readdir(__dirname + '/' + filename, function(err, files) {
          console.log('(' + files.length + ' files)')
          files.forEach(function(file) {
            console.log('    -    ' + file)
          })
        })
      } else {
        fs.readFile(process.cwd() + '/' + filename, 'utf-8', function(err, data) {
          console.log('')
          console.log('\033[90m' + data.replace(/(.*)/g, '    $1') + '\033[39m')
        })
      }
    }
  }
})
