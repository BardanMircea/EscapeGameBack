const mongoose = require("mongoose");

// creer schema pour Participant
const schemaParticipant = new mongoose.Schema({
  salleId: String,
  jour: String,
  creneau: String,
  utilisateurId: String,
});

// creer le model pour Participant
const Participant = mongoose.model("participants", schemaParticipant);

module.exports = Participant;
