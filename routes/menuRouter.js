const express = require('express')
const menuRouter = express.Router()
const Menu = require('../models/menu')
const Restaurant = require('../models/restaurant')

//CHECK FOR RESTAURANT ROLE
const checkRole = function(req, res, next) {
    if(!req.user.roles.includes("restaurant")) {
        res.status(403)
        return next(new Error("You need to be a restaurant owner to do that!"))
    }
    return next()
}

//GET MENUS BY RESTAURANT
menuRouter.get("/:restaurantId", (req, res, next) => {
    Menu.find({ restaurant: req.params.restaurantId },
        (err, menu) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(menu)
        }
    )
})

//CREATE NEW MENU
menuRouter.post("/:restaurantId", checkRole, (req, res, next) => {
    Restaurant.findOne(
        { _id: req.params.restaurantId, user: req.user._id },
        (err, restaurant) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            if(!restaurant) {
                res.status(403)
                return next(new Error("You are not the owner of this restaurant!"))
            }
            req.body.user = req.user._id
            req.body.restaurant = req.params.restaurantId
            const newMenu = new Menu(req.body)
            newMenu.save((err, menu) => {
                if(err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(201).send(menu)
            })
        }
    )
})

//UPDATE MENU
menuRouter.put("/:menuId", checkRole, (req, res, next) => {
    Menu.findOneAndUpdate(
        { _id: req.params.menuId, user: req.user._id },
        req.body,
        { new: true },
        (err, updatedMenu) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            if(!updatedMenu) {
                res.status(403)
                return next(new Error("You are not the owner of this restaurant!"))
            }
            return res.status(201).send(updatedMenu)
        }
    )
})

//DELETE ONE MENU
menuRouter.delete("/:menuId", checkRole, (req, res, next) => {
    Menu.findOneAndDelete(
        {  _id: req.params.menuId, user: req.user._id },
        (err, deletedMenu) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            if(!deletedMenu) {
                res.status(403)
                return next(new Error("This menu does not exist or you are not the owner of this restaurant!"))
            }
            return res.status(201).send(deletedMenu)
        }
    )
})

//DELETE ALL MENUS BY RESTAURANT
menuRouter.delete("/restaurant/:restaurantId", (req, res, next) => {
    Menu.deleteMany({restaurant: req.params.restaurantId, user: req.user._id})
        .exec((err, deletedMenus) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            if(!deletedMenus) {
                res.status(403)
                return next(new Error("This restaurant does not exist, or you are not the owner!"))
            }
            return res.status(201).send(deletedMenus)
        })
})

module.exports = menuRouter