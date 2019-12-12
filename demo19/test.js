// const requestFactory = require('./server/request-factory')

// requestFactory.registerProtocol('geek-rpc', require('./server/requestors/geek-rpc'))
// requestFactory.registerProtocol('http', require('./server/requestors/http'))

// const business = require('./business/page.data')
// const requestDetail = requestFactory(business.detail)
// const requestArticles = requestFactory(business.articles)

// requestDetail({ columnid: 1 }).then(res => { console.log('detail success') })
// requestArticles().then(res => { console.log('articles success') })

const server = require('./server/run')

server(require('./business/app'))