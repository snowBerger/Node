const net = require('net')

const socket = new net.Socket({})

socket.connect({
  host: '127.0.0.1',
  port: 8000
})

const lessonIds = [
  '100001',
  '100002',
  '100003',
  '100004',
  '100005',
  '100006',
  '100007',
  '100008',
  '100009',
  '100010',
  '100011',
  '100012',
  '100013',
  '100014',
  '100015',
  '100016',
]

let buffer = Buffer.alloc(4)
let lessonId = lessonIds[Math.floor(Math.random() * lessonIds.length)]
buffer.writeInt32BE(lessonId)
socket.write(buffer)

socket.on('data', buffer => {
  console.log(lessonId, buffer.toString())

  buffer = Buffer.alloc(4)
  lessonId = lessonIds[Math.floor(Math.random() * lessonIds.length)]
  buffer.writeInt32BE(lessonId)
  socket.write(buffer)
})