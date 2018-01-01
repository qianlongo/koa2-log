const log4js = require('log4js')
// const { NODE_ENV } = process.env
const { appenders, categories } = require('./config')

const initConfig = () => {
  log4js.configure({ appenders, categories })

  let appLogger = log4js.getLogger('app')
  let webLogger = log4js.getLogger('web')

  return { appLogger, webLogger }
}

module.exports = initConfig()
