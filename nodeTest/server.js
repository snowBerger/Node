const http = require('http')
const url = require('url')
const fs = require('fs')
http.createServer((res, rsp) => {
  let pathName = url.parse(res.url).pathname
  if (pathName === '/') {
    pathName = '/index.html'
  }
  fs.readFile('.' + pathName, 'utf-8', (err, data) => {
    if (err) {
      rsp.write(err)
    } else {
      rsp.write(data)
    }
    rsp.end()
  })
}).listen(8000)
