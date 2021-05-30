const express = require('express')
const userRouter = express.Router()
const User = require('../models/user')

const checkAdminRole = function(req, res, next) {
    if(!req.user.roles.includes("admin")) {
        res.status(403)
        return next(new Error("You need to be an admin to do that!"))
    }
    return next()
}

//GET ALL USERS
userRouter.get("/", checkAdminRole, (req, res, next) => {
    User.find()
        .exec((err, users) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(users)
        })
})

//GET ALL BY ROLE
userRouter.get("/:role", checkAdminRole, (req, res, next) => {
    User.find({ roles: { $in: [req.params.role] } })
        .exec((err, users) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            if(!users) {
                res.status(404)
                return next(new Error(`No users found with ${req.params.role}`))
            }
            return res.status(200).send(users)
        })
})

module.exports = userRouter