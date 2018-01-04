const logger = require('./lib/logger')

module.exports = (filename) => {
  const loggerMid = logger(filename)

  return async (ctx, next) => {
    loggerMid(ctx, next)
      .catch((e) => {
        ctx.log.error(e.stack)
      })
  }
}
