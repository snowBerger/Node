const EventEmitter = require('events').EventEmitter

class TestEvent extends EventEmitter {
  constructor() {
    super()
    setInterval(() => {
      this.emit('news', {desc: `This is the ${Math.random()} number`})
    }, 3000)
  }
}

module.exports = TestEvent