const logger = (req, res, next) => {
  console.log(req.method)
  console.log(req.path)
  console.log(req.body)
  console.log('------')
  // Hasta que no le indiques next no continua
  next()
}

module.exports = logger
