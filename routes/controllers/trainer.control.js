const Trainer = require('../../models/trainer/trainer.model')

const getTrainers = async (req, res) => {
    const allTrainers = await Trainer.find({})

    if(allTrainers.length == 0) {
        res.status(204).json({
            status: 'success',
            message: 'No existing trainers',
            trainers: allTrainers
        })
    }

    res.status(200).json({
        status: 'success',
        message: 'Fetched trainers',
        trainers: allTrainers
    })
}

const getTrainersById = (req, res) => {}

const getPokeDeckForTrainer = (req, res) => {}

const addPokemonToTrainerPokeDeck = (req, res) => {}

module.exports = {
    getTrainers,
    getTrainersById,
    getPokeDeckForTrainer,
    addPokemonToTrainerPokeDeck
}