// try {
interview(function (res) {
  if (res instanceof Error) {
    return console.error('wu wu wu!')
  }
  console.log('ha ha ha: ' + res)
})
// } catch (e) {
//   console.error('wu wu wu: ' + e)
// }

function interview(callback) {
  setTimeout(() => {
    if (Math.random() < 0.7) {
      callback('success')
    } else {
      callback(new Error('fail'))
      // throw new Error('fail')
    }
  }, 500)
}