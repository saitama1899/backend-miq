const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  // Configurar la cabecera authorization para pasar el jwt
  const authorization = req.get('authorization')
  let token = null

  if (authorization && authorization.toLocaleLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const { id: userId } = decodedToken
  req.userId = userId

  next()
}
