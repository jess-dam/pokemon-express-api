const app = require('../app')
const supertest = require('supertest');
const TrainerModel = require('../models/trainer/Trainer.model')
const mongoose = require('mongoose')


beforeAll(async () => {
    const url = 'mongodb://127.0.0.1/pokedex-test'
    await mongoose.connect(url, { useNewUrlParser: true })
})

describe('GET /trainer', () => {
    describe('/', () => {
        let res
        describe('when there are no trainers', () => {
            beforeAll(async (done) => {
                await givenCollectionIsEmpty()
                console.log('getting trainers')
                res = await supertest(app).get('/trainers')
                done()
            })

            test('returns success status 204', () => {
                expect(res.status).toBe(204)
            })

            test('returns message and empty array of trainers', () => {
                expect(res.body).toMatchObject({
                    status: 'success',
                    message: 'Successfully fetched trainers',
                    trainers: []
                })
            })
        })

        describe('when there are trainers in the collection', () => {
            const expectedTrainer = {
                name: 'Ash',
                level: 0,
                pokeDeck: []
            }

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
                    trainers: [expectedTrainer]
                })
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
        test('should return success status 201', () => {

        })

        test('should return success message and id', () => {

        })
    })

    describe('when body parsed has invalid keys', () => {
        test('should return fail message 400', () => {

        })

        test('should return reason of failure', () => {

        })
    })
})

describe('PATCH /trainer', () => {
    describe('/:id/pokemon', () => {
        test('should return success status 202', () => {

        })

        test('should return success message and id', () => {

        })
    })
})

const givenATrainerInCollection = async () => {
    const createdTrainer = await TrainerModel.create({
        name: 'Ash'
    })
}

const givenCollectionIsEmpty = async () => {
    const deleteTrainers = await TrainerModel.deleteMany({})
}