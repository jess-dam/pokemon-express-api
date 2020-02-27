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

PokemonSchema.methods.evolve = function() {
    this.hp += 10
    this.weakness -= 1
    this.resistance += 2
}

module.exports = mongoose.model('Pokemon', PokemonSchema)
