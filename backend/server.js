import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import bcrypt from "bcrypt-nodejs"
import uuid from "uuid/v4"

// Express setup, including JSON body parsing.
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Tells express to add the "Access-Control-Allow-Origin" header to allow requests from anywhere.
app.use(cors())

// Connect to MongoDB, on the "products-api" database. If the db doesn't
// exist, mongo will create it.
mongoose.connect("mongodb://localhost/signup-form-api", { useMongoClient: true })

// This makes mongo use ES6 promises, instead of its own implementation
mongoose.Promise = Promise

// Log when mongo connects, or encounters errors when trying to connect.
mongoose.connection.on("error", err => console.error("Connection error:", err))
mongoose.connection.once("open", () => console.log("Connected to mongodb"))

//
// Define a model here.
const User = mongoose.model("User", {
  username: String,
  email: String,
  password: String,
  token: {
    type: String,
    default: () => uuid() }
})

// Example root endpoint to get started with
app.get("/", (req, res) => {
  const password = "supersecretpassword"
  const hash = bcrypt.hashSync(password)

  // bcrypt.compareSync("supersecretpassword", hash) // true
  // bcrypt.compareSync("incorrectpassword", hash) // false

  res.send(`Signup form api. Here's an example of an encrypted password: ${hash}`)
})

// Add more endpoints here!
app.get("/users", (req, res) => {
  User.find().then(users => {
    res.json(users)
  })
})

app.get("/users/:id", (req, res) => {
  res.json({
    requestingUserId: req.params.id
  })
})

app.post("/users", (req, res) => {
  const encryptedPassword = bcrypt.hashSync(req.body.password)
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: encryptedPassword
  })
  newUser.save()
    .then(() => {
      res.status(201).json({ created: true })
    })
    .catch(err => {
      res.status(400).json({ created: false, error: err })
    })
})

app.post("/sessions", (req, res) => {
  // * find the user (based on username)
  // * encrypt the password
  // * check the encrypted password against the user's password
  // * return the user's token if everything was good or errors
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        res.json({ message: "Success!", token: user.token, userId: user.id })
      } else {
        res.status(401).json({ message: "Authentication failure" })
      }
    })
})

app.listen(8080, () => console.log("Products API listening on port 8080!"))
