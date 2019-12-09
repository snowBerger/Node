const Koa = require('koa')
const static = require('koa-static')
const mount = require('koa-mount')
const getData = require('./fake-data')
const ReactDOMServer = require('react-dom/server')

require('@babel/register')({
  presets: ['@babel/preset-react']
})

const app = new Koa()
const getApp = require('./app.jsx')
const template = require('./template')(__dirname + '/index.html')

app.use(mount('/static', static(`${__dirname}/source/`)))

app.use(mount('/data', async ctx => {
  ctx.body = await getData(+(ctx.query.sort || 0), +(ctx.query.filt || 0));
}));

app.use(async ctx => {
  const sortType = +(ctx.query.sort || 0)
  const filtType = +(ctx.query.filt || 0)

  const data = await getData(sortType, filtType)

  const reactString = ReactDOMServer.renderToString(getApp(data))
  // console.log(reactString)

  ctx.status = 200
  ctx.body = template({
    reactString,
    reactData: data,
    filtType,
    sortType
  })
})

// app.listen(3000)
module.exports = app