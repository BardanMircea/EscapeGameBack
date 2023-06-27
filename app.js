const express = require("express") // install express (npm i express)
const app = express()
exports.app = app
const port = 3000
const mongoose = require("mongoose") // install mongoose (npm i mongoose)


// start the server at http://localhost:3000
app.listen(port, async () =>{
    require("dotenv").config() // don't forget to install dotenv (npm i dotenv), and create the .env file
    await mongoose.connect(process.env.MONGODB_URI) // inside the .env file, define a MONGODB_URI variable with the MongoDB URI as its value
    console.log(`App started on port ${port}`)
})