const { app } = require('../../index.js')

const supertest = require('supertest')
const User = require('../../models/User.js')

const api = supertest(app)

const getAllUsers = async () => {
  const response = await User.find({})
  return response.map(user => user.toJSON())
}

module.exports = {
  api,
  getAllUsers
}
