const mongoose = require("mongoose");

// creer le schema pour Salle
const schemaSalle = new mongoose.Schema({
  nom: String,
  description: String,
  img: String,
  capacite: String,
  status: Boolean,
});

// creer le modele pour Salle
const Salle = mongoose.model("salles", schemaSalle);

module.exports = Salle;
