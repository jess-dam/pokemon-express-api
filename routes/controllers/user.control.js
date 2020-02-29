const User = require('../../models/user/User.model')

const getProtected = async (req, res, next) => {
    const authHeader = req.headers.authorization()
    if (!authHeader) {
      res.status(401).json({ status: 'fail' })
    } else {
      const authToken = req.headers.authorization.replace('Bearer ', '')
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
    const { email, password } = req.body
    const user = await User.create({ email, password })
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