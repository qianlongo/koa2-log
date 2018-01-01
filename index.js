const { webLogger } = require('./lib/index')

module.exports = (options) => {
  return async (ctx, next) => {
    // test
    await next()

    let { path, query, body } = ctx

    webLogger.warn(JSON.stringify(
      {
        path,
        query,
        res: body
      }
    ))
  }
}
