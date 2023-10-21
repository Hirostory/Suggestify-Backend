const mongoose = require("mongoose")

const recommendationSchema = new mongoose.Schema({
    collectionName: {
        type: mongoose.Types.ObjectId,
        ref: "Collection"
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true 
    },
    reviewDescription: String,
    image: String,
    link: String
})

const Recommendation = mongoose.model("Recommendation", recommendationSchema)

module.exports = Recommendation