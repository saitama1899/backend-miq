const User = require('../models/User')
const bcrypt = require('bcrypt')
const { api, getAllUsers } = require('./helpers/helpers')
const mongoose = require('mongoose')
const { server } = require ('../index.js')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('Test password', 10)
  const user = new User({username: 'Test user', passwordHash})
  
  await user.save()
})

describe('creating a new user', () => {
  test('works as expecting creating a fresh username', async () => {
    const users = await getAllUsers()
    
    const newUser = {
      username: 'testuser',
      name: 'Eric',
      password: 'Tw1tch'
    }

    await api 
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const usersAfter = await getAllUsers()
    expect(usersAfter).toHaveLength(users.length + 1)

    const usernames = usersAfter.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username is already taken', async () => {
    const users = await getAllUsers()
    const newUser = {
      username: 'Test user',
      name: 'Manuel',
      password: 'fdfdfff'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.errors.username.message).toContain('`username` to be unique')
    const usersAfter = await getAllUsers()
    expect(usersAfter).toHaveLength(users.length)
  })
})

describe('user login', () => {
  test('succeeds with correct credentials recieving a token', async () => {
    const user = {
      username: 'Test user',
      password: 'Test password'
    }
    const result = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body.token ? true : false).toBe(true)
  })

  test('fails with wrong password', async () => {
    const user = {
      username: 'Test user',
      password: 'jhgj'
    }
     await api
      .post('/api/login')
      .send(user)
      .expect(401)
  })
})

// Hay que cerrar el servidor una vez ejecutados los tests
afterAll((done) => {
  mongoose.connection.close(() => done())
  server.close()
})