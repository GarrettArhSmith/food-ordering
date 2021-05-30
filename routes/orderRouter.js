const express = require('express')
const orderRouter = express.Router()
const Order = require('../models/order')
const OrderItem = require('../models/orderItem')

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

//GET ALL BY RESTAURANT
orderRouter.get("/restaurant/:restaurantId", checkRestaurantRole, (req, res, next) => {
    Order.find({ restaurant: req.params.restaurantId })
        .populate('items')
        .populate({ path: 'user', select: ['firstName', 'lastName', 'phone', 'email'] })
        .populate('restaurant')
        .exec((err, orders) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            if(orders.length <= 0) {
                res.status(403)
                return next(new Error("No orders found!"))
            }
            const restaurantOwner = JSON.stringify(orders[0].restaurant.user)
            const restaurantOwnerId = restaurantOwner.substring(1, restaurantOwner.length-1)
            if(restaurantOwnerId !== req.user._id) {
                res.status(403)
                return next(new Error("You are not the owner of this restaurant!"))
            }
            return res.status(200).send(orders)
        })
})

//GET ALL ORDERS
orderRouter.get("/", checkAdminRole, (req, res, next) => {
    Order.find((err, orders) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(orders)
    })
})

//GET ONE ORDER
orderRouter.get("/:orderId", (req, res, next) => {
    Order.findOne({ _id: req.params.orderId })
        .populate('items')
        .exec((err, order) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            const orderUser = JSON.stringify(order.user)
            const orderUserId = orderUser.substring(1, orderUser.length-1)
            if(orderUserId === req.user._id || req.user.roles.includes("admin")) {
                return res.status(200).send(order)
            }else {
                res.status(403)
                return next(new Error("That order does not exist, or it is not your order!"))
            }
        })
})

//GET ALL USER ORDERS
orderRouter.get("/user", (req, res, next) => {
    Order.find({ user: req.user._id })
        .exec((err, orders) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(orders)
        })
})

//CREATE NEW ORDER
orderRouter.post("/:restaurantId", (req, res, next) => {
    req.body.user = req.user._id
    req.body.restaurant = req.params.restaurantId
    const newOrder = new Order(req.body)
    newOrder.save((err, order) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(order)
    })
})

//DELETE ORDER
orderRouter.delete("/:orderId", (req, res, next) => {
    Order.findOneAndDelete({ _id: req.params.orderId },
        (err, deletedOrder) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            if(!deletedOrder) {
                res.status(403)
                return next(new Error("That order does not exist, or it is not your order!"))
            }
            const orderUser = JSON.stringify(deletedOrder.user)
            const orderUserId = orderUser.substring(1, orderUser.length-1)
            if(orderUserId === req.user._id || req.user.roles.includes("admin")) {
                return res.status(201).send("Successfully deleted order!")
            }else {
                res.status(403)
                return next(new Error("That order does not exist, or it is not your order!"))
            }
        })
})

module.exports = orderRouter