// const getQuiniela = require('../middleware/quinielaApuestas')
// const Quiniela = require('../models/Quiniela')
// const axios = require('axios')

// const { LOCAL_URL, PROD_URL, NODE_ENV, PORT } = process.env

// const reqUrl = NODE_ENV === 'development'
//   ? LOCAL_URL + `:${PORT}`
//   : PROD_URL

// const quinielaUpdate = async () => {
//   try {
//     const quiniela = await getQuiniela(new Date())
//     const buscarQuiniela = await Quiniela.findOne({ id_sorteo: quiniela.id_sorteo })
//     if (buscarQuiniela) {
//       await axios.put(`${reqUrl}/api/quinielas/${buscarQuiniela._id}`, { p: process.env.SECRET, quiniela })
//     } else {
//       await axios.post(`${reqUrl}/api/quinielas`, { p: process.env.SECRET, quiniela })
//     }
//   } catch (e) { console.error(e.response.data.error) }
// }

// setInterval(() => {
// quinielaUpdate()
// }, 10000)
