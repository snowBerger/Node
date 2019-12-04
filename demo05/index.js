const TestEvent = require('./lib')

const testEvent = new TestEvent()

testEvent.addListener('news', res => {
  console.log(res)
})