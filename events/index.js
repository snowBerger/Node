const cluster = require('cluster')
const os = require('os')

if (cluster.isMaster) {
  for (let i = 0; i < 1; i++) {
    const worker = cluster.fork()

    let missendPing = 0
    let interval = setInterval(() => {
      console.log('ping')
      worker.send('ping')
      missendPing++

      if (missendPing >= 3) {
        clearInterval(interval)
        process.kill(worker.process.pid)
      }
    }, 300)

    worker.on('message', msg => {
      console.log('pong')
      if (msg === 'pong') {
        missendPing--
      }
    })
  }

  cluster.on('exit', () => {
    setTimeout(() => {
      cluster.fork()
    }, 5000)
  })
} else {
  require('./app')

  process.on('message', msg => {
    if (msg === 'ping') {
      // console.log('pong')
      process.send('pong')
    }
  })

  process.on('uncaughtException', (err) => {
    console.log(err)

    process.exit(1)
  })

  setInterval(() => {
    console.log(process.memoryUsage().rss)
    if (process.memoryUsage().rss > 734003200) {
      console.log('oom')
      process.exit(1)
    }
  }, 5000)
}