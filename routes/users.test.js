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
    console.log('test test')
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
  })
})
describe('protected route', () => {
  describe('no token provided', () => {
    it('sends back a 401 response', async (done) => {
      const res = await supertest(app).get('/users/protected')
      expect(res.status).toBe(401)
      done()
    })
  })
  describe('valid token provided', () => {
    it('send back a 200 response', async (done) => {
      const user = await User.create({ user: 'sfsfsgsf', email: 'whatever@hello.com', password: 'fewfew999' })
      const token = user.generateAuthToken()
      const res = await supertest(app).get('/protected')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      done()
    })
  })
})

