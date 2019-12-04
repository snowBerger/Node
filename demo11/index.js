const http = require('http')
const fs = require('fs')

http
  .createServer((req, res) => {
    if (req.url === '/favicon.ico') {
      res.statusCode = 200
      return res.end()
    }

    res.statusCode = 200
    fs
      .createReadStream(__dirname + '/index.html')
      .pipe(res)
  })
  .listen(3000)