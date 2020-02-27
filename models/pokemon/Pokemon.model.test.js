const mongoose = require('mongoose')
const PokemonModel = require('./Pokemon.model')
describe('PokemonModel', () => {
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/deck`
    await mongoose.connect(url, { useNewUrlParser: true })
  })

  describe('basic database operations', () => {
    beforeAll(async () => {
      await PokemonModel.deleteMany({})
    })
    test('creates a database entry', async () => {
      await PokemonModel.create({
        name: 'First pokemon',
        description: 'This is your first pokemon'
      })
      const allLessons = await PokemonModel.find({})
      expect(allLessons).toHaveLength(1)
    })
  })

})