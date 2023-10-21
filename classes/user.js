const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    profilePicture: {
        type: String 
    }, 
    collectionsName: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Collection",
        }
    ],
    recommendation: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Recommendation"
        }
    ]
})

const User = mongoose.model("User", userSchema)

module.exports = User
