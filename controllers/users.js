const express = require("express") //connecting to express
const router = express.Router()

//connecting to the Schemas to this file 
const User = require("../classes/user")
const Collection = require("../classes/collection")
const Recommendation = require("../classes/recommendation")

// USER Index Route
router.get("/", async (req, res) => {
    try {
        res.json(await User.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
})

// USER CREATE ROUTE 
router.post("/", async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        res.json(await User.create(req.body, (err, createdUser) => {
            if(err){
                console.log(err);
                res.json(err.message)
              } else {
                console.log('user is created', createdUser);
                res.json(createdUser)
              }  
        }))

    } catch (error) {
        res.status(400).json(error)
    }
})

// USER update Route 
router.put("/:id", async (req, res) => {
    try {
        res.json(await User.findByIdAndUpdate(req.body.id, req.body, {new: true}))
    } catch (error) {
        res.status(400).json(error)
    }
})

// route to authenticate user
router.put('/login', async (req, res) => {
    console.log(req.body)
     try {

        res.json( await User.findOne({username: req.body.username}, (err, foundUser) => {
            if(err) {
                res.json('Oops, there was an error. Please try again')
              } else {
                if(!foundUser){
                  res.json('Username and password do not match. Please try again.')
                } else if(bcrypt.compareSync(req.body.password, foundUser.password)) {
                  res.json({username: foundUser.username})
                } else {
                  res.json('Username and password do not match. Please try again.')
                }
              }
        }))
}
    catch (error) {
        res.status(400).json(error)
   }
})

// USER DELETE route
router.delete("/:id", async (req, res) => {
    try {
        // send all people
        res.json(await User.findByIdAndRemove(req.params.id));
      } catch (error) {
        res.status(400).json(error);
      }
})


module.exports = router