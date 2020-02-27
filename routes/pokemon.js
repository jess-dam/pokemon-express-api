const express = require('express')
const PokemonControl = require('./controllers/pokemon.control.js')
var router = express.Router()

//POST
router.post('/', PokemonControl.addPokemon)

//GET
router.get('/', PokemonControl.getPokemonCollection)
router.get('/:id', PokemonControl.getPokemonById)

// router.post('/add-pokemon', (req, res, next) => {
//     if (!req.body) {
//         res.status(400).json({
//             status: 'failed',
//             message: 'No pokemon was specified to add'
//         })
//     }

//     myCollection.push(createPokemon(req.body));
//     res.status(201).json({
//         status:'success',
//         message: 'You added a pokemon :)'
//     })
// })

// router.patch('/pokemon/rename', (req, res, next) => {
//     if (!req.query.id) {
//         res.status(400).json({
//             status: 'failed',
//             message: 'You have not specified a pokemon'
//         })
//     }

//     if (!req.query.name) {
//         res.status(400).json({
//             status: 'failed',
//             message: 'Have not specified a name in your request'
//         });
//     }

//     if(!myCollection[req.query.id]) {
//         res.status(404).json({
//             status: 'failed',
//             message: 'This pokemon could not be found'
//         });
//     }

//     myCollection[req.query.id].name = req.query.name;
//     res.status(202).json({
//         status: 'success',
//         id: req.query.id,
//         message: 'Pokemon name updated'
//     })
// })

// router.put('/pokemon/evolve-pokemon/:id', (req, res, next) => {
//     if (!req.query.id) {
//         res.status(400).json({
//             status: 'failed',
//             message: 'You have not specified a pokemon'
//         })
//     }

//     if (!req.query.name) {
//         res.status(400).json({
//             status: 'failed',
//             message: 'Have not specified a name in your request'
//         });
//     }

//     if(!myCollection[req.query.id]) {
//         res.status(404).json({
//             status: 'failed',
//             message: 'This pokemon could not be found'
//         });
//     }
// })

module.exports = router