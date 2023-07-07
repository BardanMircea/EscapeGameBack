const express = require("express")
const login_router = express.Router()
const Utilisateur = require("../models/Utilisateur")
const bcrypt = require("bcrypt")


// check the user's login credentials received from the React app (email and mdp) and check if they exist in the database 
login_router.post("/", async(req, res) => {
    const {email, mdp} = req.body

    if(!email || !mdp){
        return res.status(422).json("Missing login credential(s)")
    }

     // if the user is found, and the password matches, send status 200 
    const utilisateur = await Utilisateur.findOne({ email : email})
    if(utilisateur){
        if(bcrypt.compareSync(mdp, utilisateur.mdp)){
            return res.status(200).json(utilisateur)
        }
    }

    // if the user is not found, or the received password doesn't match the password from the database, send a 404 
    return res.sendStatus(404)
})

module.exports=login_router
