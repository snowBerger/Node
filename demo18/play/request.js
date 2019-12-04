const query = require('./index')

app.use(async ctx => {
  const res = await query('{ hello }')
  
  ctx.body = res
})