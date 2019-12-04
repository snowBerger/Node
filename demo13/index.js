const fs = require('fs')

const express = require('express');

const game = require('./game')
let playerWinCount = 0
let lastPlayerAction = null
let playerSameCount = 0

const app = express()

app.get('/favicon.ico', (req, res) => res.status(200))

app.get('/game', (req, res, next) => {
  if (playerWinCount >= 3 || playerSameCount === 9) {
    res.status(500)
    return res.send('你太厉害了，我不想玩了')
  }

  next()

  if (res.playerWon) {
    playerWinCount++
  }
}, (req, res, next) => {
  const query = req.query
  const playerAction = query.action

  if (!playerAction) {
    res.status(400)
    res.send('')
    return
  }

  if (playerAction === lastPlayerAction) {
    playerSameCount++
    if (playerSameCount >= 3) {
      res.status(400)
      res.send('老出一样的，不和你玩了')
      playerSameCount = 9
      return
    }
  } else {
    playerSameCount = 0
  }
  lastPlayerAction = playerAction

  res.playerAction = playerAction
  next()
}, (req, res) => {
  const result = game(res.playerAction)

  res.status(200)
  if (result === 0) {
    res.send('Draw')
  } else if (result === -1) {
    res.playerWon = true
    res.send('You Win')
  } else {
    playerWinCount = 0
    res.send('You Lost')
  }
})

app.get('/', (req, res) => {
  res.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'))
})

app.listen(3000, 'localhost', () => console.log('server is running at port: 3000'))