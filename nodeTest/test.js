const http = require('http')
const url = require('url')
http.createServer((req, res) => {
  console.log(req.url)
  let urlString = url.parse(req.url)
  let path = urlString.pathname
  let query = urlString.query
  console.log(path, query)
  res.write('<div>Hello NodeJs</div>')
  res.end()
}).listen(8000)

