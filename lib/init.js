const log4js = require('log4js')
const methods = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark']
const categoryKeys = ['web', 'app']

const init = (filename = 'logs/access.log') => {
  const appenders = categoryKeys.reduce((result, key) => {
    result[key] = {
      type: 'dateFile',
      filename,
      pattern: '-yyyy-MM-dd',
      category: key,
      alwaysIncludePattern: true
    }
    return result
  }, {})
  const categories = categoryKeys.reduce((result, key) => {
    result[key] = {
      appenders: [key],
      level: 'info'
    }
    return result
  }, {})
  // 默认配置
  categories.default = { appenders: ['web'], level: 'info' }
  // 初始化配置
  log4js.configure({ appenders, categories })
  // log实例
  const loggers = categoryKeys.reduce((result, key) => {
    result[`${key}Logger`] = log4js.getLogger(key)

    return result
  }, {})

  const ctxLogger = methods.reduce((result, method) => {
    result[method] = (message) => {
      loggers.appLogger[method](message)
    }
    return result
  }, {})

  loggers.ctxLogger = ctxLogger

  return loggers
}

module.exports = init
