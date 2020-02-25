const supertest = require('supertest');
const app = require('../app');
var myCollection = require('../db/database')

describe('can insert values into a mongodb', () => {

})


describe('GET Requests', () => {
    let res;

    beforeAll(async done => {
        res = await supertest(app).get('/collection');
        done();
    })

    it('can send a response with a status code of 200', ()  => {
        expect(res.status).toBe(200)
    });

    it('can send a response with pokemon collection', () => {
        expect(res.body).toMatchObject({
            status: 'success',
            collection: []
        })
    })
})


describe('POST Requests', () => {
    let res;
    const pokemon = {
                "name" : "mew two",
                "hp" : "200",
                "weakness" : "2",
                "resitance" : "40"
            }
    beforeAll(async done => {
        res = await supertest(app).post('/collection/add-pokemon', pokemon);
        done();
    })

    it('can send a response with a status code of 201', ()  => {
        expect(res.status).toBe(201);
    });

    it('can send a response with a successful message', () => {
        expect(res.body).toMatchObject({
            status: 'success',
            message: 'You added a pokemon :)'
        })
    })
})

describe.only('PATCH Requests', () => {
    let res;
    const newName = 'Pikachu'
    const unavailableId = 1000
    const newPokemon = {
        id: 0,
        name: 'Flameon',
        hp: '1000',
        resistance: '400',
        weakness: '20'
    }

    describe('can change the name of a pokemon', () => {
        beforeAll( async done => {
                console.log(myCollection)
                const idToRename = 0
                myCollection = [];
                myCollection.push(newPokemon)
                expect(myCollection[0]).toMatchObject(newPokemon)
                expect(myCollection).toHaveLength(1);
                res = await supertest(app).patch(`/collection/pokemon/rename?id=${idToRename}&name=${newName}`);
                done();
            })

        it('respond with a 202 success when there is a valid entry for id', () => {
            expect(res.status).toBe(202)
            expect(res.body).toMatchObject({
                id: '0',
                status: 'success',
                message: 'Pokemon name updated'
            })
        })

        it('makes sure the pokemon has been renamed', async() => {
            expect(myCollection[0]).toMatchObject({
                id: 0,
                name: 'Pikachu',
                hp: '1000',
                resistance: '400',
                weakness: '20'
            })
        })
    })


    it('can return reponse of 404 when pokemon does not exist', async () => {
        console.log(myCollection)
        const invalidRes = await supertest(app).patch(`/collection/pokemon/rename?id=${unavailableId}&name=${newName}`)
        expect(invalidRes.status).toBe(404);
        expect(invalidRes.body).toMatchObject({
            "status": "failed",
            "message": "This pokemon could not be found"
        })
    })

})