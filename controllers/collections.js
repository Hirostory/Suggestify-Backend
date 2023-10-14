const express = require("express") //connecting to express
const router = express.Router()

//connecting to the Schemas to this file 
const User = require("../classes/user")
const Collection = require("../classes/collection")
const Recommendation = require("../classes/recommendation")

// Collection Index Route
router.get("/", async (req, res) => {
    try {
        res.json(await Collection.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
})

// Collection CREATE ROUTE 
router.post("/", async (req, res) => {
    try {
        res.json(await Collection.create(req.body))
    } catch (error) {
        res.status(400).json(error)
    }
})

// Collection update Route 
router.put("/:id", async (req, res) => {
    try {
        res.json(await Collection.findByIdAndUpdate(req.body.id, req.body, {new: true}))
    } catch (error) {
        res.status(400).json(error)
    }
})

// Collection DELETE route
router.delete("/:id", async (req, res) => {
    try {
        // send all people
        res.json(await Collection.findByIdAndRemove(req.params.id));
      } catch (error) {
        res.status(400).json(error);
      }
})


module.exports = router