const http = require('http')
const fs = require('fs')

let leak = []
http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' })
  // console.log(window.location.href)
  setTimeout(() => {
    const result = fs.readFileSync(__dirname + '/index.html', 'utf-8')

    leak.push(result)
    res.end(result)
  }, 50)
}).listen(3000, () => {
  console.log('listened 3000')
  while (true) { }
})