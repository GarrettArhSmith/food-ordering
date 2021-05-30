const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    menu: {
        type: Schema.Types.ObjectId,
        ref: "Menu",
        required: true
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Menu",
        required: true
    }
})

module.exports = mongoose.model("Item", itemSchema)