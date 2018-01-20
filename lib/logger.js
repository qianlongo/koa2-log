const init = require('./init')
const client = require('./client')
const server = require('./server')
const merge = (clientMessage, serverMessage, other) => {
  return JSON.stringify(Object.assign({},
    clientMessage,
    serverMessage,
    other
  ))
}

module.exports = (filename) => {
  const { webLogger, ctxLogger } = init(filename)

  return async (ctx, next) => {
    const startTime = new Date().getTime()
    const clientMessage = client(ctx) // request 信息
    ctx.log = ctxLogger
    await next()
    const endTime = new Date().getTime()
    const serverMessage = server(ctx) // response 信息
    webLogger.info(merge(
      clientMessage,
      serverMessage,
      {
        resTime: (endTime - startTime) / 1000 + 's'
      }
    ))
  }
}
