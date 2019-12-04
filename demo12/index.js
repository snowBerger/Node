const http = require('http')
const fs = require('fs')
const url = require('url')
const queryString = require('querystring')

const game = require('./game')
let playerWinCount = 0
let lastPlayerAction = null
let PlayerSameCount = 0

http
  .createServer((req, res) => {
    const parseUrl = url.parse(req.url)

    if (parseUrl.pathname === '/favicon.ico') {
      res.statusCode = 200
      return res.end()
    }

    if (parseUrl.pathname === '/game') {
      const query = queryString.decode(parseUrl.query)
      const playerAction = query.action
      const result = game(playerAction)

      if (playerAction === lastPlayerAction) {
        PlayerSameCount++
      } else {
        lastPlayerAction = playerAction
        PlayerSameCount = 0
      }

      if (PlayerSameCount >= 3) {
        res.statusCode = 400
        PlayerSameCount = 9
        return res.end('老出一样的，不想和你玩了')
      }

      if (playerWinCount >= 3 || PlayerSameCount === 9) {
        res.statusCode = 500
        return res.end('我不想玩了')
      }

      res.statusCode = 200
      if (result === 0) {
        res.end('Draw')
      } else if (result === -1) {
        playerWinCount++
        res.end('You Win')
      } else {
        playerWinCount = 0
        res.end('You Lost')
      }
    }

    if (parseUrl.pathname = '/') {
      fs
        .createReadStream(__dirname + '/index.html')
        .pipe(res)
    }
  })
  .listen(3000)