const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const multer = require("multer")
const path = require("path")

const User = require("../classes/user")

const SECRET_KEY = 'secretkey'



router.put("/update/:id", async (req, res) => {
    try {
      const { username, password, profilePicture } = req.body
      let updatedUser = null
  
      // update username
      if (username) {
        updatedUser = await User.findByIdAndUpdate(req.params.id, { username }, { new: true })
      }
  
      // update password
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10)
        updatedUser = await User.findByIdAndUpdate(req.params.id, { password: hashedPassword }, { new: true })
      }
  
      // update profile picture when provided
      if (profilePicture) {
        updatedUser = await User.findByIdAndUpdate(req.params.id, { profilePicture }, { new: true })
      }
  
      if (updatedUser) {
        res.json(updatedUser)
      } else {
        res.status(400).json({ error: "No changes were made" })
      }
    } catch (error) {
      console.error("Error updating user data:", error)
      res.status(500).json({ error: `Error updating user data: ${error.message}` })
    }
  })
  
  

// USER Index Route
router.get("/", async (req, res) => {
  try {
    res.json(await User.find({}))
  } catch (error) {
    res.status(400).json(error)
  }
})

// USER Show Route
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("collectionsName")
      .populate("recommendation")
    
    res.json(user)
  } catch (error) {
    res.status(400).json(error)
  }
})

// Get Registered Users
router.get('/register', async (req, res) => {
  try {
    const users = await User.find()
    res.status(201).json(users)
  } catch (error) {
    res.status(400).json({ error: 'Unable to get users' })
  }
})

// User Create Route
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ username, password: hashedPassword })
    await newUser.save()
    res.status(201).json({ message: 'User Created Successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Error Signing Up' })
  }
})

// Get Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY)
    res.json({ message: 'Login successful', userId: user._id })
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' })
  }
})

// USER DELETE route
router.delete("/:id", async (req, res) => {
  try {
    res.json(await User.findByIdAndRemove(req.params.id))
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router

