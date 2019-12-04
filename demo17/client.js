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

function encode(id, seq) {
  console.log(seq, id)
  buffer = Buffer.alloc(6)
  buffer.writeInt16BE(seq)
  buffer.writeInt32BE(id, 2)
  return buffer
}

socket.on('data', buffer => {
  const seqBuffer = buffer.slice(0, 2)
  const lessonBuffer = buffer.slice(2)
  console.log(seqBuffer.readInt16BE(), lessonBuffer.toString())
})

// 请求序号
let seq = 0
setInterval(() => {
  const lessonId = lessonIds[Math.floor(Math.random() * lessonIds.length)]
  socket.write(encode(lessonId, seq++))
}, 50)
