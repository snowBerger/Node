(async function () {
  try {
    // await interview(1)
    // await interview(2)
    // await interview(3)

    await Promise.all([interview(1), interview(2), interview(3)])
  } catch (err) {
    return console.log('wu wu wu in round ' + err.round)
  }
  console.log('ha ha ha')
})()

function interview(round) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.7) {
        resolve('success')
      } else {
        let error = new Error('fail')
        error.round = round
        reject(error)
      }
    }, 500)
  })
}