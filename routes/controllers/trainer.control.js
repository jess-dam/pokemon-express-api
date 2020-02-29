const express = require('express');
const Trainer = require('../../models/trainer/Trainer.model')
const db = require('../../db/index')


const getTrainerCollection = async (req, res, next) => {
    const collectionResults = await Trainer.find({})

    res.status(200).json({
        status: 'success',
        message: 'Here are the trainers',
        collection: collectionResults
    })
}

const getTrainersById = (req, res) => {}

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
    if(!req.body) {
        res.status(400).send({
            status: 'failed',
            message: 'you have not specified a pokemon to add'
        })
    }
    try {
        try {
            trainer = await Trainer.findOne({_id: req.params.id})
        } catch {
            res.status(404).json({
                status: 'failed',
                message: `Could not find the trainer with id ${req.params._id}`
            })
        }
        const pokemonToCatch = await Pokemon.findOne({_id: req.query.pokemonId})
        const pokemonId = pokemonToCatch._id

        trainer.catchPokemon(pokemonId)

        res.status(201).json({
            status: 'success',
            message: `Pokemon ${pokemonToCatch.name} has been caught by trainer ${trainer.name}`
        })

    } catch {
        res.status({
            status: 'failed',
            message: `The pokemon got away, or never existed (${req.query.pokemonId})`
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