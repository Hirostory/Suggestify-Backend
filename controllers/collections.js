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

// Collection Show Route 
router.get("/:id", async (req, res) => {
    try {
      const collection = await Collection.findById(req.params.id).populate("recommendation")
      res.json(collection)
    } catch (error) {
      res.status(400).json(error)
    }
  })

// Collection CREATE ROUTE 
router.post("/:userId/add", async (req, res) => {
    const userId = req.params.userId

    console.log("Received request to create collection for user:", userId)
    console.log("Request body:", req.body)
    try {
        const newCollection = await Collection.create({
            ...req.body,
            user_id: userId
        })

        const user = await User.findById(userId)
        console.log(user)
        user.collectionsName.push(newCollection)
        await user.save()
        
        console.log("New collection created:", newCollection)
        console.log("Updated user:", user)

        res.json(newCollection)
    } catch (error) {
        res.status(400).json(error)
    }
})

// Collection update Route 
router.put("/:id", async (req, res) => {
    try {
        res.json(await Collection.findByIdAndUpdate(req.params.id, req.body, {new: true}))
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