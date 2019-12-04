const Controller = require('egg').Controller;

class ProductController extends Controller {
	async index() {
		const { ctx } = this;
		ctx.body = 'Product';
	}

	async detail() {
		const { ctx } = this;
		ctx.body = `id = ${ctx.query.id}`
	}

	async detail2() {
		const { ctx } = this;
		ctx.body = `id = ${ctx.params.id}`;
	}

	async create() {
		const { ctx } = this;
		ctx.body = {
			id: '123'
		};
	}
}

module.exports = ProductController;
