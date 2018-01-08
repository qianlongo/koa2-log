## koa2-log

> koa2 node日志中间件

## 说明

### 日志分类

> 目前koa2-log为日志分了两个类

1. web (主要针对用户的访问请求，中间件中自动打的就是该类型)
2. app (业务方在自己的代码中主动打的日志)

### 日志目录

> 日志存放的地点, 默认存放在当前目录的logs下面,用户可以传入。


## 用法

``` javascript

// 1. 添加中间件

const Koa = require('koa')
const app = new Koa()
const env = process.env['NODE_ENV']
const { name } = require('./package.json') // package.json具体路径根据自己目录结构指定
const devEnv = ['dev', 'localhost', 'development']
const logFileName = devEnv.indexOf(env) > -1 ? './logs/access.log' : `/opt/logs/${name}/access.log`

app.use(log(logFileName))
app.listen(PORT, () => {
  console.log(`app start at: ${PORT}`)
})

// 在应用程序中打点

let count = 0

module.exports = {
  async index (ctx, next) {
    ctx.log.info('我是index的controller')
    ctx.body = `index ${count++}`
  },
  async list (ctx, next) {
    ctx.body = `list ${count++}`
  }
}


```

