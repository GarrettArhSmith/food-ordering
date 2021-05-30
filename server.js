const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')
const path = require("path")

const port = process.env.PORT || 9000
const secret = process.env.SECRET || "potato bad me big"

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "build")))

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log("Connected to Food-Ordering DB.")
)

app.use('/auth', require('./routes/authRouter'))
app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
app.use('/api/user', require('./routes/userRouter'))
app.use('/api/item', require('./routes/itemRouter'))
app.use('/api/menu', require('./routes/menuRouter'))
app.use('/api/restaurant', require('./routes/restaurantRouter'))
app.use('/api/order', require('./routes/orderRouter'))
app.use('/api/order-item', require('./routes/orderItemRouter'))

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log("Server is listening on port 9000.")
})