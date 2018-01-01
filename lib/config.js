const genAppenderConfig = (
  {
    type = 'dateFile',
    filename = '../logs/logstash.log', // 默认log存储路径
    pattern = '-yyyy-MM-dd',
    category = 'web',
    alwaysIncludePattern = true
  } = {}
) => {
  return { type, filename, pattern, category, alwaysIncludePattern }
}

const genCategoryConfig = (
  {
    appenders = ['web'],
    level = 'info'
  } = {}
) => {
  return { appenders, level }
}
const { mapObj } = require('./utils')
const categoryKeys = ['web', 'app']
const appenders = mapObj(categoryKeys, (key) => {
  return genAppenderConfig({ category: key })
})
const categories = mapObj(categoryKeys, (key) => {
  return genCategoryConfig({ appenders: [key] })
})

categories.default = genCategoryConfig()

module.exports = {
  appenders,
  categories,
  categoryKeys
}
