const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const User = require('../models/user/User.model')
const app = require('../app')

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/user-model-test`
  await mongoose.connect(url, { useNewUrlParser: true })
})


describe('POST /signup', () => {
  let res
  beforeAll(async (done) => {
    res = await supertest(app).post('/users/signup').send({
      username: 'ffdfd',
      email: 'hello@domain.com',
      password: 'fwefwefjew9'
    })
    done()
  })
  it('sends a response with status of 201', () => {
    expect(res.status).toBe(201)
  })
  it('sends back an authorisation token', () => {
    expect(typeof res.body.token).toBe('string')
    console.log(res.body.token)
  })
})

describe('GET /protected route', () => {
  describe('no token provided', () => {
    it('sends back a 401 response', async (done) => {
      const res = await supertest(app).get('/users/protected')
      expect(res.status).toBe(401)
      done()
    })
  })
  describe('valid token provided', () => {
    it('send back a 200 response', async (done) => {
      const user = await User.create({ username: 'sfsfsgsf', email: 'whatever@hello.com', password: 'fewfew999' })
      const token = user.generateAuthToken()
      console.log(token)

      const res = await supertest(app).get('/users/protected')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      done()
    })
  })
})

