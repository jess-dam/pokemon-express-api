const mongoose = require('mongoose')
const TrainerModel = require('./Trainer.model')

describe.only('TrainerModel', () => {
  beforeAll(async (done) => {
    const url = `mongodb://127.0.0.1/pokedex-test-models`
    await mongoose.connect(url, { useNewUrlParser: true })
    done()
  })

  describe('basic database operations', () => {
    beforeAll(async (done) => {
      await TrainerModel.deleteMany({})
      await sleep(4000)
      done()
    })
    test('creates a database entry', async (done) => {
      console.log(TrainerModel)
      await TrainerModel.create({
        name: 'Ash',
        description: 'This is your first trainer'
      })
      done()

      const allTrainers = await TrainerModel.find({})
      expect(allTrainers).toHaveLength(1)
    })
  })

})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}