const express = require('express')
const TrainerControl = require('./controllers/trainer.control.js')
var router = express.Router()


// GET
router.get('/',TrainerControl.getTrainerCollection)
router.get('/:id', TrainerControl.getTrainersById)
router.get('/:id/pokemon-deck', TrainerControl.getPokeDeckForTrainer)

//POST
router.post('/', TrainerControl.createTrainer)

//PATCH
router.patch('/:id/pokemon-deck/:pokemonId', TrainerControl.addPokemonToTrainerPokeDeck)

module.exports = router

