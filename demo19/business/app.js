const fs = require('fs')

module.exports = {
  // '/detail': async () => {
  //   return 'detail page'
  // },
  '/play': {
    data: require('./page.data'),
    template: fs.readFileSync(__dirname + '/template.html')
  },
  // '/list': async () => {
  //   return 'list page'
  // }
}