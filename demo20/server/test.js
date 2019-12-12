const server = require('./run');
const fs = require('fs');

(async () => {
  const data = await new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/../business/play/data.js', 'utf-8', (err, data) => {
      resolve(data)
    })
  })

  const template = await new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/../business/play/template.tpl', 'utf-8', (err, data) => {
      resolve(data)
    })
  })

  server({
    '/play': {
      data,
      template,
    }
  })
})();