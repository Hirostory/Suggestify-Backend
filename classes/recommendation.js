const mongoose = require("mongoose")

const recommendationSchema = new mongoose.Schema({
    collection: {
        type: mongoose.Types.ObjectId,
        ref: "Collection"
    },
    title: {
        type: String,
        required: true 
    },
    reviewDescription: String,
    image: String,
    link: String
})

const Recommendation = mongoose.model("Recommendation")

module.exports = Recommendation