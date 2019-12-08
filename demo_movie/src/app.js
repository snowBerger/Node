const express = require('express')
const session = require('express-session')
const mongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./routes')

const app = express()
const port = process.env.PORT || 3000
const dbUrl = 'mongodb://127.0.0.1:27017/movie'

// 链接mongodb
mongoose.connect(dbUrl)

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded())  // 表单数据格式化
app.use(express.static('assets'))
app.use(session({
  secret: 'movie',
  resave: false,  // 是否在每次请求时重新设置cookie
  saveUninitialized: true,
  store: new mongoStore({
    url: dbUrl,
    collections: 'sessions'
  })
}))
app.locals.moment = require('moment')
routes(app)

app.listen(port)
console.log('server on port: ' + port)
