const superagent = require('superagent')
const cheerio = require('cheerio')
const spiderUrl = 'https://t10.nuomi.com/pc/t10/index'
superagent.get(spiderUrl).end((err, res) => {
  if (err) {
    return console.error(err)
  }
  let foodUrls = []
  let $ = cheerio.load(res.text)
  $('.j-item a').each((idx, element) => {
    let $element = $(element)
    foodUrls.push(idx + '---' + $element.attr('href'))
  })
  console.log(foodUrls)
})

