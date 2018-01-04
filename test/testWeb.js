const Koa = require('koa')
const app = new Koa()
const log = require('../index')
const PORT = 3000

app.use(log('../logs/access.log'))
app.use(async (ctx, next) => {
  ctx.body = {
    code: 200,
    message: 'ok',
    data: {
      name: 'qianlongo',
      sex: 'boy'
    }
  }
})

app.listen(PORT, () => {
  console.log(`app start at: ${PORT}`)
})
