const mongoose = require('mongoose')
const elementTypes = require('./pokemonElementTypes');

const PokemonSchema = new mongoose.Schema(
    {
        name: {type: String, default:'????' ,required: true},
        hp: {type: Number, default: 0},
        weakness: {type: Number, default: 0},
        resistance: {type: Number, default: 0},
        abilities: {type: [String], default: []},
        elementType: { type: String, enum: elementTypes, default: '????' }
    }
)

module.exports = mongoose.model('Pokemon', PokemonSchema)
