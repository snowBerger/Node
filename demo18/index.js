const Koa = require('koa')
const mount = require('koa-mount')

const app = new Koa()

app.use(mount('/download', require('./download/index')))
app.use(mount('/detail', require('./detail/index')))
app.use(mount('/play', require('./play/index')))
app.use(mount('/list', require('./list/node/index')))

app.use(mount('/', require('./list/node/index')))

app.listen(3000, () => {
  console.log('listened 3000')
})