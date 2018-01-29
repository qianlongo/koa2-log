module.exports = (ctx) => {
  let { status, body } = ctx

  return ({
    status,
    resBody: body
  })
}
