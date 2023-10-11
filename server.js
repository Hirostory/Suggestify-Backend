require("dotenv").config();
// pull PORT from .env, give default value of 3000
const { PORT = 3000 } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
const mongo = require('./classes/mongo')
// import middleware
const cors = require('cors')
const morgan = require('morgan')
//Middleware use
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.get("/hello", (req,res)=>{
    res.send("YAY!")
})

app.listen(PORT, console.log(`Server is listening on http://localhost:${PORT}`))
