const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user/User.model')

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/user-model-test`
  await mongoose.connect(url, { useNewUrlParser: true })
})
describe('Password storage', () => {
  let user
  beforeAll(async (done) => {
    user = await User.create({ username: 'bob948', password: 'je0few8' });
    console.log(user)
    done()
  })
  it('does not store the plain text password', () => {
    expect(user.password).not.toBeUndefined()
    expect(user.password).not.toBe('je0few8')
  })
  it('specifically stores an encrypted version of the plaintext password', async () => {
    const isMatch = await bcrypt.compare('je0few8', user.password)
    expect(isMatch).toBeTruthy()
  })

})

