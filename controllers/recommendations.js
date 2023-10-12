const express = require("express") //connecting to express
const router = express.Router()

//connecting to the Schemas to this file 
const User = require("../classes/user")
const Collection = require("../classes/collection")
const Recommendation = require("../classes/recommendation")

// Recommendation Index Route
router.get("/", async (req, res) => {
    try {
        res.json(await Recommendation.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
})

// Recommendation CREATE ROUTE 
router.post("/", async (req, res) => {
    try {
        res.json(await Recommendation.create(req.body))
    } catch (error) {
        res.status(400).json(error)
    }
})

// Recommendation update Route 
router.put("/:id", async (req, res) => {
    try {
        res.json(await Recommendation.findByIdAndUpdate(req.body.id, req.body, {new: true}))
    } catch (error) {
        res.status(400).json(error)
    }
})

// Recommendation DELETE route
router.delete("/:id", async (req, res) => {
    try {
        // send all people
        res.json(await Recommendation.findByIdAndRemove(req.params.id));
      } catch (error) {
        res.status(400).json(error);
      }
})


module.exports = router