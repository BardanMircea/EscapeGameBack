const Salle = require("../models/Salle");
const express = require("express");
const salle_router = express.Router();
const mongoose = require("mongoose");

// CRUD pour Salle
// get toutes les Salles
salle_router.get("/", async (req, res) => {
  res.json(await Salle.find({}));
});

// get une salle by id
salle_router.get("/:salle_id", checkValidSalleId, async (req, res) => {
  res.json(await Salle.findById(req.params.salle_id));
});

// ajouter une salle
salle_router.post("/", async (req, res) => {
  if (req.body.nom && req.body.description && req.body.capacite) {
    await Salle.create(req.body);
    res.json(await Salle.find({}));
  } else {
    res.status(422).json("Attributs manquants");
  }
});

// mettre a jour une Salle
salle_router.put("/:salle_id", checkValidSalleId, async (req, res) => {
  const { nom, description, capacite, img, status } = await Salle.findById(
    req.params.salle_id
  );
  //const salle = await Salle.findById(req.params.salle_id);

  const updatedSalle = await Salle.findByIdAndUpdate(
    req.params.salle_id,
    {
      nom: nom,
      description: description,
      capacite: capacite,
      img: img,
      status: req.body.status,
    },
    { new: true }
  );

  res.json(updatedSalle);
});

// supprimer une Salle
salle_router.delete("/:salle_id", checkValidSalleId, async (req, res) => {
  await Salle.findByIdAndDelete(req.params.salle_id);

  res.status(200).json(await Salle.find({}));
});

// middleware pour verifier si l'id de la Salle est valide
async function checkValidSalleId(req, res, next) {
  try {
    const id = req.params.salle_id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json("Invalid salle ID");
    }

    const salle = await Salle.findById(id);

    if (!salle) {
      return res.status(404).json("Salle not found");
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = salle_router;
