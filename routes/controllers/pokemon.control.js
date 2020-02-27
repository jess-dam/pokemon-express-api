const express = require('express');
const Pokemon = require('../../models/pokemon/Pokemon.model')
const db = require('../../db/index')


const addPokemon = async (req, res, next ) => {
    const validPokemonValues = ['name', 'hp', 'weakness', 'resistance', 'elementType']
    try{
        if(!req.body){
            res.status(400).json({
                status: 'failed',
                message: 'Pokemon to add has not been specified'
            })
        }

        // const containsInvalidDataType = () => {

        // console.log(req.body.keys().array.every(key => validPokemonValues.contains(key)));
        // }

        // console.log('Has invalid data type? ', containsInvalidDataType())

        // if(containsInvalidDataType()) {
        //     res.status(400).json({
        //         status: 'failed',
        //         message: 'Pokemon could not be added, invalid infomation for creation'
        //     })
        // }

        const { name, hp, weakness, resistance, abilities, elementType } = req.body
        const newPokemon = await Pokemon.create({
            name,
            hp,
            weakness,
            resistance,
            abilities,
            elementType
        })
        res.status(201).json({
            status: 'success',
            message: 'Pokemon created :)',
            pokemon: [newPokemon]
        })

    } catch { err => {
        console.log(err)
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }
}}

const getPokemonCollection = async (req, res, next) => {
    const collectionResults = await Pokemon.find({})
    res.status(200).json({
        status: 'success',
        message: 'Got ya pokemons fresh',
        collection: collectionResults
    })
}

const getPokemonById = async (req, res, next) => {
    if(!req.params.id){
        res.status(400).json({
            status: 'failed',
            message: 'You have not specified an id'
        })
    }

    try{
        const foundPokemon = await Pokemon.findById(req.params.id)
        res.status(200).json({
            status: 'success',
            message: 'Here ya pokemon',
            pokemon: [foundPokemon]
        })
    } catch {
        res.status(404).json({
            status: 'failed',
            message: `Could not find pokemon with an id of ${req.params.id}`
        })
    }
}

module.exports = {
    addPokemon,
    getPokemonCollection,
    getPokemonById
}
