module.exports = (ctx, info = {}) => {
  let { request, url, query } = ctx
  let ua = request.headers['user-agent']
  let { proName } = info

  return JSON.stringify({
    ua,
    url,
    proName,
    query
  })
}
