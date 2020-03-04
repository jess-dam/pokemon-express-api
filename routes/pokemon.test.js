const supertest = require('supertest');
const app = require('../app');
const Pokemon = require('../models/pokemon/Pokemon.model')
const mongoose = require('mongoose')

const DEFAULT_POKEMON = {
    name: 'Bulbasaur',
    hp: 100,
    resistance: 0,
    weakness: 0,
    abilities: [],
    elementType: '????',
    level: 0
}


beforeAll(async (done) => {
    const url = 'mongodb://127.0.0.1/pokedex-test'
    await mongoose.connect(url, { useNewUrlParser: true })
    done()
})


describe('POST /pokemon', () => {
    describe('creating a pokemon with valid data', () => {
        let res, createdId, pokemonBeforePost, pokemonAfterPost
        beforeAll(async done => {
            pokemonBeforePost = await Pokemon.find({})
            res = await supertest(app).post('/pokemon').send({
                name: 'Bulbasaur',
                hp: '100'
            })
            pokemonAfterPost = await Pokemon.find({})
            done()
        })


        test('response is 201', () => {
            expect(res.status).toBe(201)
        })

        test('response body sends back created pokemon', () => {

            expect(res.body).toMatchObject({
                status: 'success',
                message: 'Pokemon created :)',
                pokemon: [DEFAULT_POKEMON]
            })
        })

        test('the created pokemon has an id', () => {
            expect(res.body.pokemon[0]).toHaveProperty('_id')
        })

        test('a pokemon with id exists in db', () => {
            expect(pokemonAfterPost).toHaveLength(pokemonBeforePost.length + 1)
        })

    })

    // describe('creating a pokemon with invalid data', () => {
    //     let res, createdId, pokemonBeforePost, pokemonAfterPost
    //     beforeAll(async done => {
    //         pokemonBeforePost = Pokemon.find({})
    //         res = await supertest(app).post('/pokemon').send({
    //             ultimateName: 'Vileplume',
    //             favouriteMove: 'Chlorophyll'
    //         })
    //         pokemonAfterPost = Pokemon.find({})
    //         done()
    //     })

    //     test('reponse has status of 400', () => {
    //         expect(res.status).toBe(400)
    //     })

    //     test('response has body with failure message', () => {
    //         expect(res.body).toMatchObject({
    //             status: 'failed',
    //             message: 'Pokemon could not be added, invalid infomation for creation'
    //         })
    //     })

    //     test('database should not add a new document', () => {
    //         expect(pokemonBeforePost.collection).toHaveLength(pokemonAfterPost.collection.length)
    //     })
    // })
})

describe('GET /pokemon', () => {
    beforeAll( async (done) => {
        await givenDbIsEmpty()
        done()
    })

    describe('/', () => {
        describe('when database is empty', () => {
            let checkDbIsEmpty, res
            beforeAll( async (done) => {
                checkDbIsEmpty = await Pokemon.find({})
                expect(checkDbIsEmpty).toHaveLength(0)
                res = await supertest(app).get('/pokemon')
                done()
            })

            test('response has success status 200', () => {
                expect(res.status).toBe(200)
            })

            test('response has body with empty collection of pokemon', () => {
                expect(res.body).toMatchObject({
                    status: 'success',
                    message: 'Got ya pokemons fresh',
                    collection: []
                })
            })
        })

        describe('when database has values', () => {
            let res, allPokemons
            beforeAll(async done => {
                await Pokemon.create(DEFAULT_POKEMON)
                res = await supertest(app).get('/pokemon')
                allPokemons = await Pokemon.find({})
                expect(allPokemons).toHaveLength(1)
                done()
            })

            test('response has success status 200', () => {
                expect(res.status).toBe(200)
            })

            test('response returns object of pokemons in database', () => {

                expect(res.body.collection[0]).toMatchObject({ ...DEFAULT_POKEMON})
            })

            test('response returns same amount of pokemons that are in the database', () => {
                expect(res.body.collection).toHaveLength(allPokemons.length)
            })
        })

    })

    describe('/:id', () => {
        describe('when database has pokemon with valid id', () => {
            let res, idToGet, pokemonCreated

            beforeAll(async (done) => {
                await Pokemon.deleteMany({})
                await Pokemon.create(DEFAULT_POKEMON)
                pokemonCreated = await Pokemon.find({})
                expect(pokemonCreated).toHaveLength(1)
                idToGet = pokemonCreated[0]._id
                res = await supertest(app).get(`/pokemon/${idToGet}`)
                done()
            })

            test('response has success status 200', () => {
                expect(res.status).toBe(200)
            })

            test('response returns object of pokemon within database', () => {
                expect(res.body).toMatchObject({
                    status: 'success',
                    message: 'Successfully wrangled a pokemon',
                    pokemon: [DEFAULT_POKEMON]
                })
            })

        })

        describe('when database does not have pokemon with valid id', () => {
            let res, idToGet

            beforeAll(async done => {
                idToGet = '242fde23'
                res = await supertest(app).get(`/pokemon/${idToGet}`)
                done()
            })

            test('response has failure status 404', () => {
                expect(res.status).toBe(404)
            })

            test('response returns message with not found', () => {
                expect(res.body).toMatchObject({
                    status: 'failed',
                    message: `Could not find pokemon with an id of ${idToGet}`
                })
            })
        })
    })
})


describe('PATCH /pokemon', () => {
    describe('/:id/evolve', () => {
        describe('given a valid id', () => {
            let res, idToEvolve
            beforeAll(async () => {
                const findId = await Pokemon.findOne({})
                idToEvolve = findId._id
                res = await supertest(app).patch(`/pokemon/${idToEvolve}/evolve`)
            })

            test('return a success message of 202', () => {
                expect(res.status).toBe(202)
            })

            test('return appropriate message and id of changed pokemon', () => {
                expect(res.body).toMatchObject({
                    status: 'success',
                    message: `Pokemon with id ${idToEvolve} has been evolved`
                })
            })

            test('evolved pokemon should have appropriate increased stats', async () => {
                const evolvedPokemon = await Pokemon.findById(idToEvolve)
                expect(evolvedPokemon).toMatchObject({
                    hp : DEFAULT_POKEMON.hp + 10,
                    resistance: DEFAULT_POKEMON.resistance + 2,
                    weakness: DEFAULT_POKEMON.weakness - 1,
                    level: DEFAULT_POKEMON.level + 1
                })
            })
        })

        describe('given an invalid id', () => {
            let res, idToEvolve
            beforeAll(async () => {
                idToEvolve = '5e57aaac73'
                res = await supertest(app).patch(`/pokemon/${idToEvolve}/evolve`)
            })

            test('return a failure message of 400', () => {
                expect(res.status).toBe(404)
            })

            test('return appropriate failure message', () => {
                expect(res.body).toMatchObject({
                    status: 'failed',
                    message: `Could not find a pokemon with id ${idToEvolve} to evolve, are you sure it exists?`
                })
            })
        })
    })
})


const givenDbIsEmpty = async () => {
    await Pokemon.deleteMany({})
}

//  const givenPokemonCollectionIsEmpty = () => {

//  }

