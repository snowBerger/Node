const glob = require('glob')

// let res = null
// console.time('glob')
// res = glob.sync(__dirname + '/**/*')
// console.timeEnd('glob')
// console.log(res)

console.time('glob2')
glob(__dirname + '/**/*', (err, res) => {
  console.log(res)
})
console.timeEnd('glob2')