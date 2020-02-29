const express = require('express')
const TrainerControl = require('./controllers/trainer.control.js')
var router = express.Router()


// GET
router.get('/', TrainerControl.getTrainers)
router.get('/:id', TrainerControl.getTrainersById)
router.get('/:id/pokemon-deck', TrainerControl.getPokeDeckForTrainer)

//POST
router.post('/')

//PATCH
router.patch('/:id/pokemon')

module.exports = router

