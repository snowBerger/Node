const fs = require('fs')
const Koa = require('koa')
const mount = require('koa-mount')

const game = require('./game')
let playerWinCount = 0
let lastPlayerAction = null
let playerSameCount = 0

const app = new Koa()

app.use(mount('/favicon.ico', (ctx) => ctx.status = 200))

const gameKoa = new Koa()
gameKoa.use(async (ctx, next) => {
  if (playerWinCount >= 3) {
    ctx.status = 500
    return ctx.body = '你太厉害了，我不想玩了'
  }

  await next()

  if (ctx.playerWon) {
    playerWinCount++
  }
})

gameKoa.use(async (ctx, next) => {
  const query = ctx.query
  const playerAction = query.action

  if (!playerAction) {
    ctx.status =400
    ctx.body = ''
    return
  }

  if (playerSameCount === 9) {
    ctx.status = 500
    return ctx.body = '你太厉害了，我不想玩了'
  }

  if (playerAction === lastPlayerAction) {
    playerSameCount++
    if (playerSameCount >= 3) {
      playerSameCount = 9
      ctx.status = 400
      ctx.body = '老出一样的，不和你玩了'
      return
    }
  } else {
    playerSameCount = 0
  }
  lastPlayerAction = playerAction

  ctx.playerAction = playerAction
  await next()
})

gameKoa.use(async (ctx, next) => {
  const result = game(ctx.playerAction)

  await new Promise(resolve => {
    setTimeout(() => {
      ctx.status = 200
      if (result === 0) {
        ctx.body = 'Draw'
      } else if (result === -1) {
        ctx.playerWon = true
        ctx.body = 'You Win'
      } else {
        playerWinCount = 0
        ctx.body = 'You Lost'
      }
      resolve()
    }, 500)
  })
})
app.use(mount('/game', gameKoa))

app.use(mount('/', (ctx) => ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8')))

app.listen(3000, () => console.log('server is running at port: 3000'))