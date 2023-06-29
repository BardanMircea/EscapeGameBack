const mongoose = require("mongoose");

// creer schema pour Participant
const schemaParticipant = new mongoose.Schema({
  nom: String,
  prenom: String,
  naissance: Date,
  reservationId: String,
});

// creer le model pour Participant
const Participant = mongoose.model("participants", schemaParticipant);

module.exports = Participant;
