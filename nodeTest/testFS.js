const http = require('http')
const fs = require('fs')
http.createServer((req, res) => {
  fs.readFile('./test.js', 'utf-8', (err, data) => {
    res.write(data)
    res.end()
  })
}).listen(8000)

