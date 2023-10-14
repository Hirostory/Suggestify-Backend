const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    usermame: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true 
    },
    profilePicture: {
        tyoe: String 
    }, 
    collectionsName: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Collection"
        }
    ]
})

const User = mongoose.model("User", userSchema)

module.exports = User
