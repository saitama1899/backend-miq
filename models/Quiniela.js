const { Schema, model } = require('mongoose')

const quinielaSchema = new Schema({
  fecha_sorteo: Date,
  dia_semana: String,
  id_sorteo: {
    type: String,
    unique: true
  },
  game_id: String,
  anyo: Number,
  premio_bote: Number,
  cdc: Number,
  apuestas: Number,
  recaudacion: Number,
  combinacion: String,
  premios: Number,
  fondo_bote: Number,
  escrutinio: Array,
  partidos: Array,
  temporada: String,
  jornada: String
})

const Quiniela = model('Quiniela', quinielaSchema)

module.exports = Quiniela
