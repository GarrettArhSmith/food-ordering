const express = require('express')
const itemRouter = express.Router()
const Item = require('../models/item')
const Menu = require('../models/menu')

const checkRestaurantRole = function(req, res, next) {
    if(!req.user.roles.includes("restaurant")) {
        res.status(403)
        return next(new Error("You need to be a restaurant owner to do that!"))
    }
    return next()
}

//GET ALL BY MENU
itemRouter.get("/:menuId", (req, res, next) => {
    Item.find({ menu: req.params.menuId })
        .exec((err, items) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(items)
        })
})

//CREATE NEW ITEM
itemRouter.post("/:menuId", (req, res, next) => {
    Menu.findOne({ _id: req.params.menuId, user: req.user._id })
        .populate('menu')
        .exec((err, menu) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            if(!menu) {
                res.status(403)
                return next(new Error("That menu does not exist, or you are not the owner of that restaurant!"))
            }
            req.body.menu = req.params.menuId
            req.body.restaurant = menu.restaurant
            req.body.user = req.user._id
            const newItem = new Item(req.body)
            newItem.save((err, item) => {
                if(err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(201).send(item)
            })
        })
})

//UPDATE ITEM
itemRouter.put("/:itemId", checkRestaurantRole, (req, res, next) => {
    Item.findOneAndUpdate(
        { _id: req.params.itemId, user: req.user._id },
        req.body,
        { new: true },
        (err, updatedItem) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedItem)
        }
    )
})

//DELETE ONE ITEM
itemRouter.delete("/:itemId", (req, res, next) => {
    Item.findOneAndDelete({ _id: req.params.itemId, user: req.user._id })
        .exec((err, deletedItem) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            if(!deletedItem) {
                res.status(403)
                return next(new Error("Item does not exist, or you are not the owner of this restaurant!"))
            }
            return res.status(201).send(`Successfully delete Item: ${deletedItem.name}`)
        })
})

//DELETE ALL ITEMS BY MENU
itemRouter.delete("/menu/:menuId", (req, res, next) => {
    Item.deleteMany({menu: req.params.menuId, user: req.user._id})
        .exec((err, deletedItems) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            if(!deletedItems) {
                res.status(403)
                return next(new Error("Menu does not exist, or you are not the owner of this restaurant!"))
            }
            return res.status(201).send(deletedItems)
        })
})

//DELETE ALL ITEMS BY RESTAURANT
itemRouter.delete("/restaurant/:restaurantId", (req, res, next) => {
    Item.deleteMany({restaurant: req.params.restaurantId, user: req.user._id})
        .exec((err, deletedItems) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            if(!deletedItems) {
                res.status(403)
                return next(new Error("This restaurant does not exist, or you are not the owner!"))
            }
            return res.status(201).send(deletedItems)
        })
})

module.exports = itemRouter