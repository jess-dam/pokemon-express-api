const app = require('../app')
const supertest = require('supertest');
const TrainerModel = require('../models/trainer/Trainer.model')
const PokemonModel = require('../models/pokemon/Pokemon.model')
const mongoose = require('mongoose')

const DEFAULT_TRAINER = {
            name: 'Ash',
            level: 0,
            pokeDeck: []
        }

beforeAll(async () => {
    const url = 'mongodb://127.0.0.1/pokedex-test-trainer'
    await mongoose.connect(url, { useNewUrlParser: true })
})

describe('GET /trainer', () => {
    describe('/', () => {
        let res

        beforeAll(async (done) => {
            await givenCollectionIsEmpty()
            done()
        })

        test('returns success status 200', () => {
            expect(res.status).toBe(200)
        })

        test('returns message and current available trainers', () => {
            expect(res.body).toMatchObject({
                status: 'success',
                message: 'Successfully fetched trainers',
                trainers: [DEFAULT_TRAINER]
            })
        })
    })

    describe('/:id', () => {
        let validIdToGet
        beforeAll(async (done) => {
            await givenATrainerInCollection()
            const aValidTrainer = await TrainerModel.findOne({})
            validIdToGet = aValidTrainer.__id
            done()
        })
        describe('when id is valid', () => {
            test('returns success message of 200', () => {

            })

            test('returns success message with trainer object', () => {

            })
        })

        describe('when id is invalid', () => {
            test('returns fail message of 404', () => {

            })

            test('return reason of failure', () => {

            })
        })
    })

    describe('/:id/pokemon-deck', () => {
        describe('when id is valid', () => {
            test('return success status 200', () => {

            })

            test('returns pokemons belonging to given trainer', () => {

            })
        })

        describe('when id is invalid', () => {
            test('return success status 404', () => {

            })
            test('returns reason of failiure', () => {

            })
        })
    })
})

describe('POST /trainer', () => {
    describe('when body parsed has valid keys', () => {
        let res
        beforeAll( async done => {
            givenCollectionIsEmpty()
            res = await supertest(app).post('/trainer').send(DEFAULT_TRAINER)
            done()
            // console.log(res)
        })
        test('should return success status 201', () => {
            expect(res.status).toBe(201)
        })

        test('should return success message and id', () => {
            expect(res.body).toMatchObject({
                status: 'success',
                message: 'Trainer has been created'
            })
        })
    })

    // describe('when body parsed has invalid keys', () => {
    //     test('should return fail message 400', () => {
    //         expect(res.status).toBe(400)
    //     })

    //     test('should return reason of failure', () => {
    //         expect(res.body).toMatchObject({
    //             status: 'failed',
    //             message: ''
    //         })

    //     })
    // })
})

describe.only('PATCH /trainer', () => {
    beforeAll( async done => {
        givenCollectionIsEmpty()
        await Trainer.create(DEFAULT_TRAINER)
        await Pokemon.create({
            name: 'Flameon',
            hp: 200
        })
        done()
    })

    describe('/:id/pokemon', () => {
        let res
        beforeAll( async (done) => {
            const pokemonToCatch = await PokemonModel.findOne({})
            const pokemonId = pokemonToCatch._id
            res = await supertest(app).patch('/')
            done()
        })
        test('should return success status 202', () => {
            expect(res.status).toBe(202)
        })

        test('should return success message and id', () => {
            expect(res.body).toBe({
                status: 'success',
                message: `Successfully caught the pokemon! (${pokemonId})`
            })
        })
    })
})

const givenATrainerInCollection = async () => {
    const createdTrainer = await TrainerModel.create(DEFAULT_TRAINER)
}

const givenCollectionIsEmpty = async () => {
    const deleteTrainers = await TrainerModel.deleteMany({})
}