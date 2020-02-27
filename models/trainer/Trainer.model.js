const mongoose = require('mongoose')

const TrainerSchema = new mongoose.Schema(
    {
        name: { type:String, default: '????' },
        level: { Number, default: 0 },
        pokeDeck: { type: [mongoose.Schema.Types.ObjectId], default: [] }
    }
)

module.exports = mongoose.model('Trainer', TrainerSchema)