module.exports = (ctx) => {
  let { body, status } = ctx

  return ({
    status,
    resBody: body
  })
}
