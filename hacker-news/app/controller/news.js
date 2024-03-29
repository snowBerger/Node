// news.js

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    const dataList = {
      list: [
        { id: 1, title: 'this is news 1', url: '/news/1' },
        { id: 2, title: 'this is news 2', url: '/news/2' },
        { id: 3, title: 'this is news 3', url: '/news/3' },
      ]
    };
    
    await this.ctx.render('news/list.tpl', dataList);

    // const ctx = this.ctx;
    // const page = ctx.query.page || 1;
    // console.log(111111, page)
    // const newsList = await ctx.service.news.list(page);
    
    // await this.ctx.render('news/list.tpl', { list: newsList });
  }
}

module.exports = NewsController;
