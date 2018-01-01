const Koa = require('koa')
const app = new Koa()
const log = require('../index')
const PORT = 3000

app.use(log())
app.use(async (ctx, next) => {
  ctx.body = 'hello world'
})

app.listen(PORT, () => {
  console.log(`app start at: ${PORT}`)
})
