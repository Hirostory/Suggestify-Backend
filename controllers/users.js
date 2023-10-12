const express = require("express") //connecting to express
const router = express.Router()

//connecting to the Schemas to this file 
const User = require("../classes/user")
const Collection = require("../classes/collection")
const Recommendation = require("../classes/recommendation")

// USER Index Route
router.get("/", async (req, res) => {
    try {
        res.json(await User.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
})

// USER CREATE ROUTE 
router.post("/", async (req, res) => {
    try {
        res.json(await User.create(req.body))
    } catch (error) {
        res.status(400).json(error)
    }
})

// USER update Route 
router.put("/:id", async (req, res) => {
    try {
        res.json(await User.findByIdAndUpdate(req.body.id, req.body, {new: true}))
    } catch (error) {
        res.status(400).json(error)
    }
})

// USER DELETE route
router.delete("/:id", async (req, res) => {
    try {
        // send all people
        res.json(await User.findByIdAndRemove(req.params.id));
      } catch (error) {
        res.status(400).json(error);
      }
})


module.exports = router