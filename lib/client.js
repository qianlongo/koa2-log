module.exports = (ctx) => {
  let { method, host, path, headers, query, url, href } = ctx
  let userAgent = headers['user-agent']
  let referer = headers.headers
  let reqBody = ctx.request.body

  return ({
    method,
    host,
    href,
    path,
    query,
    referer,
    url,
    userAgent,
    reqBody
  })
}
