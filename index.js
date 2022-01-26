// Para poder leer las variables de entorno del .env
require('dotenv').config()

// Conexion a DB
require('./mongo')

const cors = require('cors')
const express = require('express')

// Middlewares
const logger = require('./middleware/logger')
const handleErrors = require('./middleware/handleErrors')
const notFound = require('./middleware/notFound')

// Controladores
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()
// CORS por defecto permitirá que tu api funcione para cualquier origen
app.use(cors())

// Parsear las request que vengan en formato json
app.use(express.json())

app.use(logger)

app.get('/', (req, res) => {
  res.send('<h1>Hola mundo!</h1>')
})
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// Aqui solo llegará si no entra en ninguna de las de arriba
app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Exports para los tests
module.exports = { app, server }
