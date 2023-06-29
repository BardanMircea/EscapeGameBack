const mongoose = require("mongoose");

// creer schema pour Reservation
const schemaReservation = new mongoose.Schema({
  salleId: String,
  jour: String,
  creneau: String,
  utilisateurId: String,
});

// creer le model pour Utilisateur
const Reservation = mongoose.model("reservations", schemaReservation);

module.exports = Reservation;
