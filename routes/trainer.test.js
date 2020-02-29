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
            res = await supertest(app).get('/trainer')
            done()
        })

        test('returns success status 200', () => {
            expect(res.status).toBe(200)
        })

        test('returns message and current available trainers', () => {
            expect(res.body).toMatchObject({
                status: 'success',
                message: 'Successfully fetched trainers',
                trainers: []
            })
        })
    })

    describe('/:id', () => {
        describe('when id is valid', () => {
            let validIdToGet, res
            beforeAll(async (done) => {
                const aValidTrainer = await givenATrainerInCollection()
                validIdToGet = aValidTrainer._id
                res = await supertest(app).get(`/trainer/${validIdToGet}`)
                done()
            })
            test('returns success message of 200', () => {
                expect(res.status).toBe(200)
            })

            test('returns success message with trainer object', () => {
                expect(res.body).toMatchObject({
                    status: 'success',
                    message: 'Successfully got trainer',
                    trainer: DEFAULT_TRAINER
                })
            })
        })

        describe('when id is invalid', () => {
            test('returns fail message of 404', () => {

            })

            test('return reason of failure', () => {

            })
        })
    })

    //EXTRA FEATURE -- to be added
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

describe('PATCH /trainer', () => {
    let trainer, pokemon
    beforeAll( async done => {
        await givenCollectionIsEmpty()
        trainer = await givenATrainerInCollection()
        pokemon = await PokemonModel.create({
            name: 'Flameon',
            hp: 200
        })
        done()
    })

    describe('/:id/pokemon', () => {
        let res
        beforeAll( async (done) => {
            console.log(pokemon._id)
            res = await supertest(app).patch(`/trainer/${trainer._id}/pokemon-deck/${pokemon._id}`)
            done()
        })
        test('should return success status 202', () => {
            expect(res.status).toBe(202)
        })

        test('should return success message and id', () => {
            expect(res.body).toMatchObject({
                status: 'success',
                message: `Pokemon ${pokemon.name} has been caught by trainer ${trainer.name}`
            })
        })
    })
})

const givenATrainerInCollection = async () => {
    return await TrainerModel.create(DEFAULT_TRAINER)
}

const givenCollectionIsEmpty = async () => {
    await TrainerModel.deleteMany({})
}