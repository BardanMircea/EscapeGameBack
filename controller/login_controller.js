const express = require("express")
const login_router = express.Router()
const Utilisateur = require("../models/Utilisateur")
const bcrypt = require("bcrypt")


// check the user's login credentials received from the React app (email and mdp) and check if they exist in the database 
login_router.get("/", async(req, res) => {
    const utilisateur = await Utilisateur.find({ email : req.body.email})

    // if the user is found, and the password matches, send status 200 
    if(utilisateur && bcrypt.compareSync(req.body.mdp, utilisateur.mdp)){
        return res.sendStatus(200)
    }

    // if the user is not found, or the received password doesn't match the password from the database, send a 404 
    return res.sendStatus(404)
    
})

module.exports=login_router
