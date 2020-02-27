const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

UserSchema.pre('save', function() {
    const salt = bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
})


const UserModel = mongoose.model('User', UserSchema)

module.exports = User