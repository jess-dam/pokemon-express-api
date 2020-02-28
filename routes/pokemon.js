const express = require('express')
const PokemonControl = require('./controllers/pokemon.control.js')
var router = express.Router()

//POST
router.post('/', PokemonControl.addPokemon)

//GET
router.get('/', PokemonControl.getPokemonCollection)
router.get('/:id', PokemonControl.getPokemonById)


//PATCH
router.patch('/:id/evolve', PokemonControl.evolve)


module.exports = router