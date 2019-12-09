const Koa = require('koa')
const mount = require('koa-mount')
const static = require('koa-static')
const fs = require('fs')

const app = new Koa()
app.use(static(__dirname + '/source'))

const buffer = fs.readFileSync(__dirname + '/source/index.html')

app.use(mount('/', async ctx => {
  ctx.status = 200
  ctx.type = 'html'
  ctx.body = buffer
  // ctx.body = fs.readFileSync(__dirname + '/source/index.html')
}))

// app.listen(3000)
module.exports = app