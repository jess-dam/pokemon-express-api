const express = require('express');
// const myCollection = require('myCollection')
var router = express.Router();
var myCollection = require('../db/database');


const createPokemon = (data) => {
    return {
        id: myCollection.length,
        name: data.name || '???',
        hp: data.hp || '?',
        weakness: data.weakness || '?',
        resistance: data.resistance || '?',
        abilities: data.abilities || []
    }
}

router.get('/', (req, res, next) => {
    res.status(200).json({
        status: 'success',
        collection: myCollection
    });
});


router.post('/add-pokemon', (req, res, next) => {
    if (!req.body) {
        res.status(400).json({
            status: 'failed',
            message: 'No pokemon was specified to add'
        })
    }

    myCollection.push(createPokemon(req.body));
    res.status(201).json({
        status:'success',
        message: 'You added a pokemon :)'
    })
})

router.patch('/pokemon/rename', (req, res, next) => {
    if (!req.query.id) {
        res.status(400).json({
            status: 'failed',
            message: 'You have not specified a pokemon'
        })
    }

    if (!req.query.name) {
        res.status(400).json({
            status: 'failed',
            message: 'Have not specified a name in your request'
        });
    }

    if(!myCollection[req.query.id]) {
        res.status(404).json({
            status: 'failed',
            message: 'This pokemon could not be found'
        });
    }

    myCollection[req.query.id].name = req.query.name;
    res.status(202).json({
        status: 'success',
        id: req.query.id,
        message: 'Pokemon name updated'
    })
})

router.put('/pokemon/evolve-pokemon/:id', (req, res, next) => {
    if (!req.query.id) {
        res.status(400).json({
            status: 'failed',
            message: 'You have not specified a pokemon'
        })
    }

    if (!req.query.name) {
        res.status(400).json({
            status: 'failed',
            message: 'Have not specified a name in your request'
        });
    }

    if(!myCollection[req.query.id]) {
        res.status(404).json({
            status: 'failed',
            message: 'This pokemon could not be found'
        });
    }
})

module.exports = router;