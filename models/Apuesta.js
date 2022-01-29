const { Schema, model } = require('mongoose')

const apuestaSchema = new Schema({
  content: String,
  date: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  quiniela: {
    type: Schema.Types.ObjectId,
    ref: 'Quiniela'
  }
})

apuestaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// crear  Modelo
const Apuesta = model('Apuesta', apuestaSchema)

module.exports = Apuesta
