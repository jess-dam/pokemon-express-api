const mongoose = require('mongoose')

const pokemonSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        hp: {type: Number},
        weakness: Number,
        resistance: Number,
        elementType: { type: ['FIRE', 'WATER', 'ELECTRIC', 'ROCK', 'GHOST']}
    }
)