const uploader = require('./uploader')

uploader(
  'play',
  __dirname + '/src/page.data.js',
  __dirname + '/src/template.html',
)