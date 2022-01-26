const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Usamos el unique en username para definir que sea unico
const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  passwordHash: String
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

userSchema.plugin(uniqueValidator)
const User = model('User', userSchema)

module.exports = User
