const Salle  = require("../models/Salle")
const express = require("express")
const salle_router = express.Router()
const mongoose = require("mongoose")

// CRUD pour Salle
// get all
salle_router.get("/", async(req, res) => {
    res.json(await Salle.find({}))
})

// get salle by id
salle_router.get("/:salle_id", checkValidSalleId, async(req, res) => {
    res.json(await Salle.findById(req.params.salle_id))
}) 

// ajouter une salle
salle_router.post("/", async(req, res) => {
    if(req.body.nom && req.body.description && req.body.capacite){
        await Salle.create(req.body)
        res.json(await Salle.find({}))
    }   else {
        res.status(422).json("Attributs manquants")
    }
})

//update  Salle
salle_router.put("/:salleId", checkValidSalleId, async(req, res) => {
    const {nom, description, capacite, img} = await Salle.findById(req.params.salleId)
    const salle = await Salle.findById(req.params.salleId)
    
    const updatedSalle = await Salle.findByIdAndUpdate(
        req.params.salleId,
        {
          nom: req.body.nom,
          description: req.body.description,
          capacite : req.body.capacite,
          img : req.body.img
        },
        { new: true }
    )

    res.json(updatedSalle)
})


// middleware to check if Salle id is valid
async function checkValidSalleId(req, res, next) {
    try {
        const id = req.params.salle_id
        if(!mongoose.isValidObjectId(id)){
            return res.status(404).json("Invalid salle ID")
        }

        const salle = await Salle.findById(id)

        if(!salle){
            return res.status(404).json("Salle not found")
        }

        next()
    } catch (error) {
        next(error)
    }
    
}

module.exports=salle_router