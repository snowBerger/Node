const buffer1 = Buffer.from('hello world')
const buffer2 = Buffer.from([1, 2, 3, 4])
const buffer3 = Buffer.alloc(20)

console.log(buffer1)
console.log(buffer2)
console.log(buffer3)

buffer2.writeInt8(12, 1)
console.log(buffer2)

buffer2.writeInt16BE(512, 2)
console.log(buffer2)

const protocolBf = require('protocol-buffers')
const fs = require('fs')
const schema = protocolBf(fs.readFileSync(__dirname + '/test.proto', 'utf-8'))
console.log(schema)
const buf = schema.Test.encode({
  id: 1,
  name: 'Node',
  price: 100.1
})
console.log(buf)
console.log(schema.Test.decode(buf))