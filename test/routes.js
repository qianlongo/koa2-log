const koaCompose = require('koa-compose')
const {
  index,
  list
} = require('./controller')

module.exports = (Router) => {
  const router = new Router()

  router.get('/', index)
  router.get('/list', list)

  return koaCompose([router.routes(), router.allowedMethods()])
}
