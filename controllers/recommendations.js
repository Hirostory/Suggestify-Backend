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

// Recommendation Show Route 
router.get("/:id", async (req, res) => {
    try {
      const recommendation = await Recommendation.findById(req.params.id).populate("user")
      res.json(recommendation)
    } catch (error) {
      res.status(400).json(error)
    }
  })

// Recommendation CREATE ROUTE 
router.post("/:collectionId/add", async (req, res) => {
    const collectionId = req.params.collectionId

    console.log("Received request to create recommendation for collection:", collectionId)
    console.log("Request body:", req.body)
    try {
        const newRecommendation = await Recommendation.create({
            ...req.body,
            collectionsName: collectionId
        })

        const collection = await Collection.findById(collectionId)
        console.log(collection)
        collection.recommendation.push(newRecommendation)
        await collection.save()

        const user = await User.findOne({ _id: collection.user_id})
        user.recommendation.push(newRecommendation)
        await user.save()
        
        console.log("New collection created:", newRecommendation)
        console.log("Updated collection:", collection)

        res.json(newRecommendation)
    } catch (error) {
        res.status(400).json(error)
    }
})

// Recommendation update Route 
router.put("/:id", async (req, res) => {
    try {
        res.json(await Recommendation.findByIdAndUpdate(req.params.id, req.body, {new: true}))
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