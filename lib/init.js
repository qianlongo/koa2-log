const log4js = require('log4js')
const methods = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark']
const categoryKeys = ['web', 'app']
const env = process.env['NODE_ENV']
const devEnv = ['dev', 'localhost', 'development']
const isDev = devEnv.indexOf(env) > -1
const path = require('path')

const init = (filename = 'logs/access.log') => {
  const { dir } = path.parse(filename)

  const appenders = categoryKeys.reduce((result, key) => {
    result[key] = {
      type: 'dateFile',
      filename: `${dir}/${key}`,
      pattern: '-yyyy-MM-dd.log',
      category: key,
      alwaysIncludePattern: true
    }
    return result
  }, {})

  if (isDev) {
    appenders.dev = {
      type: 'console'
    }
  }

  const categories = categoryKeys.reduce((result, key) => {
    let appender = [key]

    if (isDev) {
      appender.push('dev')
    }

    result[key] = {
      appenders: appender,
      level: 'info'
    }
    return result
  }, {})

  // 默认配置
  categories.default = { appenders: [isDev ? 'dev' : 'web'], level: 'debug' }
  // 初始化配置, 必须把pm2设置为true，不然不会输出日志
  log4js.configure({ appenders, categories, pm2: true })
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
