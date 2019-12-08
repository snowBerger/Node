const express = require('express')
const app = express()
app.use(express.static('public'))
app.use(express.static('files'))
// app.use('./static', express.static(public))
app.get('/', (req, res) => {
  res.send('Hello NodeJs.')
})
app.get('/user', (req, res) => {
  res.send('get user api.')
})
app.listen(8000, () => {
  console.log('app is listening ar port 8000.')
})

