const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()
const data = ['大叔', '二叔', '天明', '高月', '石兰', '少羽']
const title = '秦时明月'
server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url,
      data: data,
      title: title
    },
    template: `<div>访问的 URL 是： {{ url }}
    <h2>{{ title }}</h2>
    <p v-for="item in data" v-text="item"></p>
    </div>`
  })
  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})
server.listen(8000)