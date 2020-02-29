const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Pokemon = require('../../models/pokemon/Pokemon.model')

const TrainerSchema = new Schema(
    {
        name: { type: String, default: '????' },
        level: { type: Number, default: 0 },
        pokeDeck: { type: [mongoose.Schema.Types.ObjectId], default: [] }
    }
)

TrainerSchema.methods.catchPokemon = function(pokemonId) {
    this.pokeDeck.push(pokemonId)
    this.save()
}

mongoose.models = {}
const model = mongoose.model('Trainer', TrainerSchema)

module.exports = model