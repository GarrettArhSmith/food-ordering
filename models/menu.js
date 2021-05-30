const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("Menu", menuSchema)