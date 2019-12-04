'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('index.html', {
      id: '-100',
      name: 'test context',
    });
  }
}

module.exports = HomeController;
