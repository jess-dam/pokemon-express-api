const mongoose = require('mongoose')

mongoose
    .connect('mongodb://127.0.0.1:27017/pokemon-collection', {useNewUrlParser: true})
    .then(console.log('Now connected to mongodb database'))
    .catch(err => console.error('Could not connect to database ', err.message))

const db = mongoose.connection

module.exports = db

