const Trainer = require('../../models/trainer/Trainer.model')
const Pokemon = require('../../models/pokemon/Pokemon.model')

const getTrainerCollection = async (req, res, next) => {
    const collectionResults = await Trainer.find({})

    res.status(200).json({
        status: 'success',
        message: 'Successfully fetched trainers',
        trainers: collectionResults
    })
}

const getTrainersById = async (req, res) => {
    let trainerFound
    try {
        trainerFound = await Trainer.findById(req.params.id)
    } catch {
        res.status(404).json({
            status: 'failed',
            message: `Trainer ${req.params.id} could not be found`
        })
    }

    res.status(200).json({
        status: 'success',
        message: 'Successfully got trainer',
        trainer: trainerFound
    })
}

const getPokeDeckForTrainer = (req, res) => {}


const createTrainer = async (req, res, next) => {
    try{
        if(!req.body){
            res.status(400).json({
                status: 'failed',
                message: 'Pokemon to add has not been specified'
            })
        }

        const { name, level, pokeDeck } = req.body

        const newTrainer = await Trainer.create({
            name,
            level,
            pokeDeck
        })
        res.status(201).json({
            status: 'success',
            message: 'Trainer has been created',
            trainer: [newTrainer]
        })


    } catch { err => {
        console.log(err)
        res.status(400).json({
            status: 'failed',
            message: err
        })
        }
    }
}

const addPokemonToTrainerPokeDeck = async (req, res) => {
    let trainer
    try {
        try {
            trainer = await Trainer.findById(req.params.id)
        } catch {
            res.status(404).json({
                status: 'failed',
                message: `Could not find the trainer with id ${req.params.id}`
            })
        }
        const pokemonToCatch = await Pokemon.findById(req.params.pokemonId)
        const pokemonId = pokemonToCatch._id

        trainer.catchPokemon(pokemonId)

        res.status(202).json({
            status: 'success',
            message: `Pokemon ${pokemonToCatch.name} has been caught by trainer ${trainer.name}`
        })

    } catch {
        res.status({
            status: 'failed',
            message: `The pokemon got away, or never existed (${req.params.pokemonId})`
        })
    }

}

module.exports = {
    getTrainerCollection,
    getTrainersById,
    getPokeDeckForTrainer,
    createTrainer,
    addPokemonToTrainerPokeDeck
}