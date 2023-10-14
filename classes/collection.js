const mongoose = require("mongoose")

const collectionNameSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
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

const Collection = mongoose.model("Collection", collectionNameSchema)

module.exports = Collection