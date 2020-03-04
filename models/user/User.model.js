const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String},
    password: {type: String, required:true}
})

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
})

UserSchema.methods.generateAuthToken = function () {
    return jwt.sign(this.id, process.env.JWT_SECRET)
}

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel