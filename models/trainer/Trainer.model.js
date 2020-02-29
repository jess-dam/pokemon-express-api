const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TrainerSchema = new Schema(
    {
        name: { type:String, default: '????' },
        level: { Number, default: 0 },
        pokeDeck: { type: [mongoose.Schema.Types.ObjectId], default: [] }
    }
)

const model = mongoose.model('Trainer', TrainerSchema)

module.exports = model