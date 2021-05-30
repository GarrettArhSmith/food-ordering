const express = require('express')
const orderItemRouter = express.Router()
const OrderItem = require('../models/orderItem')
const Item = require('../models/item')

const checkRestaurantRole = function(req, res, next) {
    if(!req.user.roles.includes("restaurant")) {
        res.status(403)
        return next(new Error("You need to be a restaurant owner to do that!"))
    }
    return next()
}
const checkAdminRole = function(req, res, next) {
    if(!req.user.roles.includes("admin")) {
        res.status(403)
        return next(new Error("You need to be an admin to do that!"))
    }
    return next()
}

//GET ALL ORDER ITEMS BY USER
orderItemRouter.get("/", (req, res, next) => {
    OrderItem.find({ user: req.user._id })
        .populate('item')
        .exec((err, orderItems) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(orderItems)
        })
})

//GET ONE ORDER ITEM BY ITEM ID
orderItemRouter.get("/item/:itemId", (req, res, next) => {
    OrderItem.findOne({ item: req.params.itemId, user: req.user._id })
        .exec((err, orderItem) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(orderItem)
        })
})

//CREATE NEW ORDER ITEM
orderItemRouter.post("/:itemId", (req, res, next) => {
    let currentRestaurant
    OrderItem.findOne({ user: req.user._id })
        .exec((err, orderItem) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            currentRestaurant = orderItem === null ? null : JSON.stringify(orderItem.restaurant)
            Item.findOne({ _id: req.params.itemId })
                .exec((err, item) => {
                    if(err) {
                        res.status(500)
                        return next(err)
                    }
                    OrderItem.findOne({ item: item._id, user: req.user._id })
                        .exec((err, matchedItem) => {
                            if(err) {
                                res.status(500)
                                return next(err)
                            }
                            if(matchedItem) {
                                res.status(403)
                                return next(new Error("You already have this item in your cart!"))
                            }
                            if(JSON.stringify(item.restaurant) === currentRestaurant ||
                                                        currentRestaurant === null) {
                                req.body.restaurant = item.restaurant
                                req.body.item = req.params.itemId
                                req.body.user = req.user._id
                                const newOrderItem = new OrderItem(req.body)
                                newOrderItem.save((err, orderItem) => {
                                    if(err) {
                                        res.status(500)
                                        return next(err)
                                    }
                                    return res.status(201).send(orderItem)
                                })
                            }else {
                                res.status(403)
                                return next(new Error("Cannot add items from different restaurants!"))
                            }
                        })
                })
        })
})

//DELETE ONE ORDER ITEM
orderItemRouter.delete("/:orderItemId", (req, res, next) => {
    OrderItem.findOneAndDelete({ _id: req.params.orderItemId, user: req.user._id })
        .exec((err, deletedOrderItem) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            if(!deletedOrderItem) {
                res.status(403)
                return next(new Error("Order item does not exist!"))
            }
            return res.status(201).send(deletedOrderItem)
        })
})

//DELETE ALL ORDER ITEMS BY USER
orderItemRouter.delete("/", (req, res, next) => {
    OrderItem.deleteMany({ user: req.user._id})
        .exec((err, deletedOrderItems) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(deletedOrderItems)
        })
})

module.exports = orderItemRouter