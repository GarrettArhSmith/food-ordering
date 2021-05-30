const express = require('express')
const restaurantRouter = express.Router()
const Restaurant = require('../models/restaurant')

//CHECK FOR RESTAURANT ROLE
const checkRole = function(req, res, next) {
    if(!req.user.roles.includes("restaurant")) {
        res.status(403)
        return next(new Error("You need to be a restaurant owner to do that!"))
    }
    return next()
}

//GET ALL RESTAURANTS
restaurantRouter.get("/", (req, res, next) => {
    Restaurant.find()
        .populate({ path: 'user', select: ['firstName', 'lastName'] })
        .exec((err, restaurants) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(restaurants)
        })
})

//GET ONE RESTAURANT
restaurantRouter.get("/:restaurantId", (req, res, next) => {
    Restaurant.findOne({ _id: req.params.restaurantId })
        .populate({ path: 'user', select: ['firstName', 'lastName'] })
        .exec((err, restaurant) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(restaurant)
        })
})

//GET ALL BY USER
restaurantRouter.get("/user/:userId", (req, res, next) => {
    console.log()
    Restaurant.find({ user: req.params.userId })
    .populate({ path: 'user', select: ['firstName', 'lastName'] })
    .exec((err, restaurant) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(restaurant)
    })
})

//POST RESTAURANT
restaurantRouter.post("/", checkRole, (req, res, next) => {
    req.body.user = req.user._id
    const newRestaurant = new Restaurant(req.body)
    newRestaurant.save((err, restaurant) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(restaurant)
    })
})

//UPDATE RESTAURANT
restaurantRouter.put("/:restaurantId", checkRole, (req, res, next) => {
    Restaurant.findOneAndUpdate(
        { _id: req.params.restaurantId, user: req.user._id },
        req.body,
        { new: true },
        (err, updatedRestaurant) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedRestaurant)
        }
    )
})

restaurantRouter.delete("/:restaurantId", checkRole, (req, res, next) => {
    Restaurant.findOneAndDelete(
        { _id: req.params.restaurantId, user: req.user._id },
        (err, deletedRestaurant) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            deletedRestaurant
            return res.status(201).send(`Successfully deleted Restaurant: `)
        }
    )
})

module.exports = restaurantRouter