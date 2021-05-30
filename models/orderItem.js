const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderItemSchema = new Schema({
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: "Item",
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model("OrderItem", orderItemSchema)