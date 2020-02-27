const mongoose = require('mongoose')
const PokemonModel = require('./Pokemon.model')
describe('PokemonModel', () => {
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/pokedex-test-models`
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
      const allPokemon = await PokemonModel.find({})
      expect(allPokemon).toHaveLength(1)
    })
  })

})