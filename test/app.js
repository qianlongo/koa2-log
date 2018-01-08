const Koa = require('koa')
const KoaRouter = require('koa-router')
const routes = require('./routes')
const log = require('../index')
const app = new Koa()
const PORT = 3000
const env = process.env['NODE_ENV']
const { name } = require('../package.json') // package.json具体路径根据自己目录结构指定
const devEnv = ['dev', 'localhost', 'development']
const logFileName = devEnv.indexOf(env) > -1 ? './logs/access.log' : `/opt/logs/${name}/access.log`

app.use(log(logFileName))
app.use(routes(KoaRouter))
app.listen(PORT, () => {
  console.log(`app start at: ${PORT}`)
})
