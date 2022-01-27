const axios = require('axios')

const urlApiOficial = 'https://www.loteriasyapuestas.es/servicios/fechav3'
const end = new Date('02/20/2022')

const sendGetRequest = async (date) => {
  const params = {
    game_id: 'LAQU',
    fecha_sorteo: date
  }
  try {
    const res = await axios.get(urlApiOficial, { params })
    return res.data
  } catch (err) { console.error(err) }
}

const getDateString = (date) => {
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const year = date.getFullYear()
  const day = ('0' + (date.getDate())).slice(-2)
  return year + month + day
}

const getQuiniela = async (date) => {
  while (date <= end) {
    const dataString = getDateString(date)
    const res = await sendGetRequest(dataString)
    if (res[0].fecha_sorteo) {
      return res[0]
    }
    const newDate = date.setDate(date.getDate() + 1)
    date = new Date(newDate)
  }
}

module.exports = getQuiniela
