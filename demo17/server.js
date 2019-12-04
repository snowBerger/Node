const net = require('net')

const data = {
  100001: "01 | 政府阿尔i而非后卫服务范围服务额",
  100002: "02 | 按复位法为非法委任为",
  100003: "03 | 未423冯方法服务威风威风",
  100004: "04 | 的肥肉哥哥如果",
  100005: "05 | 相当高的法国网球俄国",
  100006: "06 | 呃呃呃呃呃呃呃呃",
  100007: "07 | 帆帆帆帆帆帆帆帆",
  100008: "08 | 气温高五v我听闻侮辱台湾人",
  100009: "09 | 钱钱钱钱钱钱钱钱钱侵权",
  100010: "10 | 哇哇哇哇哇哇哇哇",
  100011: "11 | 呃呃呃呃呃呃呃呃呃呃呃",
  100012: "12 | 柔柔弱弱柔柔弱弱柔柔弱弱",
  100013: "13 | 涛涛涛涛涛涛涛涛",
  100014: "14 | 有有有有有有有有有由于",
  100015: "15 | 啊啊啊啊啊啊啊啊啊啊啊啊啊",
  100016: "16 | 呱呱呱呱呱呱呱呱呱",
}

const server = net.createServer(socket => {
  socket.on('data', buffer => {
    const seqBuffer = buffer.slice(0, 2)
    const lessonId = buffer.readInt32BE(2)
    setTimeout(() => {
      // console.log(lessonId)
      const buffer = Buffer.concat([seqBuffer, Buffer.from(data[lessonId])])
      socket.write(buffer)
    }, 10 + Math.random() * 1000)
  })
})

server.listen(8000)