const { Schema, model } = require('mongoose')

// Usamos el unique en username para definir que sea unico
const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  passwordHash: String,
  apuestas: [{
    type: Schema.Types.ObjectId,
    ref: 'Apuesta'
  }]
})

// Con esto modificamos los campos que devolverá la DB para mostrarlos modificados u ocultar algunos
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.passwordHash
  }
})

const User = model('User', userSchema)

module.exports = User
