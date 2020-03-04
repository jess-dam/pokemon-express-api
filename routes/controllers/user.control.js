const User = require('../../models/user/User.model')
const jwt = require('jsonwebtoken')

const getProtected = async (req, res, next) => {
  console.log('getting protected route')
  console.log(req.headers.authorization)
    const authHeader = req.headers.authorization
    console.log(authHeader)
    if (!authHeader) {
      res.status(401).json({ status: 'failed' })
    } else {
      const authToken = req.headers.authorization.replace('Bearer ', '')
      console.log(authToken)
      const decodedId = jwt.verify(authToken, process.env.JWT_SECRET)
      const user = await User.findById(decodedId)

      res.status(200).json({
        status: 'success',
        data: {
          user: user
        }
      })
    }
}

const signUp = async (req, res, next) => {
    const { username, email, password } = req.body
    const user = await User.create({ username, email, password })
    const token = user.generateAuthToken()
    res.status(201).json({
      status: 'success',
      token
    })
}


module.exports = {
    getProtected,
    signUp
}