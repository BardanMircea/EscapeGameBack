const Salle  = require("../models/Salle")
const express = require("express")
const salle_router = express.Router()


// CRUD pour Salle
// get all
salle_router.get("/", async(req, res) => {
    res.send(await Salle.find({}))
})

// get salle by id
salle_router.get("/:salle_id", async(req, res) => {
    res.send(await Salle.findById(req.params.salle_id))
}) 

// ajouter une salle
salle_router.post("/", async(req, res) => {
    if(req.body.nom && req.body.description && req.body.capacite){
        await Salle.create(req.body)
        res.send(await Salle.find({}))
    }   else {
        res.status(422).send("Attributs manquants")
    }
})

module.exports=salle_router