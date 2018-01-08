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
