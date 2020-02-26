const express = require('express');
const Pokemon = require('../../models/pokemons/Pokemon.model')
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

module.exports = {
    addPokemon
}
