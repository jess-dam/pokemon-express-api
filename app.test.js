const supertest = require('supertest');
const app = require('./app');
const Pokemon = require('./models/pokemons/Pokemon.model')
const PokemonControl = require('./routes/controllers/pokemon.control')
const mongoose = require('mongoose')


beforeAll(async () => {
    const url = 'mongodb://127.0.0.1/deck'
    await mongoose.connect(url, { useNewUrlParser: true })
})


describe('POST /pokemon', () => {
    describe('creating a lesson with valid data', () => {
        let res, createdId, pokemonBeforePost, pokemonAfterPost
        beforeAll(async done => {
            pokemonBeforePost = await Pokemon.find({})
            res = await supertest(app).post('/collection').send({
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
                pokemon: [
                    {
                        name: "Bulbasaur",
                        hp: 100,
                        weakness: 0,
                        resistance: 0,
                        elementType: "????",
                        __v: 0
                    }
                ]
            })
        })

        test('the created lesson has an id', () => {
            expect(res.body.pokemon[0]).toHaveProperty('_id')
        })

        test('a pokemon with id exists in db', () => {
            // expect(PokemonControl.addPokemon).toBeCalledTimes(1)
            console.log(pokemonAfterPost.length)
            console.log(pokemonBeforePost.length)
            expect(pokemonAfterPost).toHaveLength(pokemonBeforePost.length + 1)
        })

    })

    describe('creating a lesson with invalid data', () => {
        let res, createdId, pokemonBeforePost, pokemonAfterPost
        beforeAll(async done => {
            pokemonBeforePost = Pokemon.find({})
            res = await supertest(app).post('/pokemon').send({
                ultimateName: 'Vileplume',
                favouriteMove: 'Chlorophyll'
            })
            pokemonAfterPost = Pokemon.find({})
            done()
        })

        test('reponse has status of 400', () => {
            expect(res.status).toBe(400)
        })

        test('response has body with failure message', () => {
            expect(res.body).toMatchObject({
                status: 'failed',
                message: 'Pokemon could not be added, invalid infomation for creation'
            })
        })

        test('database should not add a new document', () => {
            expect(pokemonBeforePost.collection.length).toHaveLength(pokemonAfterPost.collection.length)
        })
    })
})

describe.only('GET /pokemon', () => {

    const expectedPokemon = {
        name: 'Bulbasaur',
        hp: 100,
        resistance: 0,
        weakness: 0,
        abilities: [],
        elementType: '????'
    }

    describe('/', () => {
        let res, collectionDb

        beforeAll(async (done) => {
            res = await supertest(app).get('/pokemon')
            collectionDb = await Pokemon.find({})
            done()
        })

        describe('when database is empty', () => {
            test('response has success status 200', () => {
                expect(res.status).toBe(200)
            })

            test('response has body with empty collection of pokemon', () => {
                expect(res.body).toMatchObject({
                    status: 'success',
                    message: 'got ya pokemons fresh',
                    collection: []
                })
            })
        })

        describe('when database has values', () => {
            beforeAll(async done => {
                await supertest(app).get('/pokemon')
                done()
            })

            test('response has success status 200', () => {
                expect(res.status).toBe(200)
            })

            test('response returns object of pokemons in database', () => {
                expect(res.body.collection).toContain({
                    name: 'Bulbasaur',
                    hp: 100,
                    weakness: 0,
                    resistance: 0,
                    abilities: [],
                    elementType: '????'
                })
            })

            test('response returns same amount of pokemons that are in the database', () => {
                expect(res.body.collection).toHaveLength(collectionDb.length)
            })
        })

    })

    describe('/:id', () => {
        describe('when database has pokemon with valid id', () => {
            let res, idToGet

            beforeAll(async () => {
                idToGet = '5e564a86bd13800a180a456c'
                givenPokemonInDb()
                res = await supertest(app).get(`/pokemon/${idToGet}`)
            })
            test('response has success status 200', () => {
                expect(res.status).toBe(200)
            })

            test('response returns object of pokemon within database', () => {
                expect(res.body).toMatchObject({
                    status: 'sucess',
                    message: 'Successfully wrangled a pokemon',
                    pokemon: expectedPokemon
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
                    message: 'Could not find this pokemon :('
                })
            })
        })
    })
})


describe('PATCH /pokemon', () => {
    describe('/:id/evolve', () => {
        test('given a valid id')
    })
})


const givenPokemonInDb = async () => {
    await supertest(app).post('/collection').send({
        name: 'Bulbasaur',
        hp: '100'
    })
}

//  const givenPokemonCollectionIsEmpty = () => {

//  }

