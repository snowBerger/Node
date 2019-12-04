// (function () {
//   const promise = interview(1)
//   promise
//     .then(res => interview(2))
//     .then(res => interview(3))
//     .then(res => console.log('ha ha ha'))
//     .catch(err => console.log('wu wu wu in round ' + err.round))

//   function interview(round) {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         if (Math.random() < 0.7) {
//           resolve('success')
//         } else {
//           let error = new Error('fail')
//           error.round = round
//           reject(error)
//         }
//       }, 500)
//     })
//   }
// })()

(function () {
  Promise
    .all([
      interview('icarbonx'),
      interview('tencent'),
    ])
    .then(res => console.log('ha ha ha'))
    .catch(err => console.log('wu wu wu for ' + err.name))

  function interview(name) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.7) {
          resolve('success')
        } else {
          let error = new Error('fail')
          error.name = name
          reject(error)
        }
      }, 500)
    })
  }
})()

// (function () {
//   const promise = interview()
//   const promise2 = promise
//     .then(res => {
//       return 'accept'
//     })

//   setTimeout(() => {
//     console.log(promise)
//     console.log(promise2)
//   }, 800)

//   function interview() {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         if (Math.random() < 0.7) {
//           resolve('success')
//         } else {
//           reject(new Error('fail'))
//         }
//       }, 500)
//     })
//   }
// })()