const mapObj = (keys, cb) => {
  return (keys.reduce((result, key) => {
    result[key] = cb(key)
    return result
  }, {}))
}

module.exports = {
  mapObj
}
