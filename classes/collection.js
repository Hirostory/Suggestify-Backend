const mongoose = require("mongoose")

const collectionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Type.ObjectId,
        ref: "User"
    },
    name: String,
    description: String,
    image: String,
    enum: ["TV Show", "Movie", "Book", "Product", "Restaurant"],
    recommendation: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Recommendation"
        }
    ]

})

const Collection = mongoose.model("Collection", collectionSchema)

module.exports = Collection