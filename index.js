const logger = require('./logger')

module.exports = (filename) => {
  const loggerMid = logger(filename)

  return async (ctx, next) => {
    return (
      loggerMid(ctx, next)
        .catch((e) => {
          ctx.log.error(e.stack)
        })
    )
  }
}
