require("dotenv").config()
// pull PORT from .env, give default value of 4000
const { DATABASE_URL, PORT = 3000 } = process.env || 3000;
// import express
const express = require("express");
// create application object
const app = express();
const mongoose = require("mongoose")
// import middleware
const cors = require('cors')
const morgan = require('morgan')

mongoose.connect(DATABASE_URL)

mongoose.connection
    .on('open', () => console.log('You are connected to mongoose'))
    .on('close', () => console.log('You are disconnected to mongoose'))
    .on('error', (err) => console.log(err))

//importing it to my controller 
const userController = require("./controllers/users.js")
const collectionController = require("./controllers/collections.js")
const recommendationController = require("./controllers/recommendations.js")

//Middleware use
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/user', userController)
app.use('/collection', collectionController)
app.use('/recommendation', recommendationController)

app.get("/", (req,res)=>{
    res.send("YAY!")
})

app.listen(PORT, console.log(`Server is listening on http://localhost:${PORT}`))
