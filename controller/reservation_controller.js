const Reservation = require("../models/Reservation");
const express = require("express");
const reservationRouter = express.Router();
const mongoose = require("mongoose");

// middleware to check valid id reservation 
const checkValidIdReserv = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Validate the ID format
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ error: "Invalid reservation ID" });
    }

    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ error: "La réservation n'existe pas" });
    }

    next();
  } catch (err) {
    next(err);
  }
};

// get all reservations
reservationRouter.get("/", async (req, res) => {
  const reservations = await Reservation.find({});
  res.json(reservations);
});

//get reservation whith id middelware
reservationRouter.get("/:id", checkValidIdReserv, async (req, res) => {
  let id = req.params.id;
  const reservation = await Reservation.findOne({ _id: id });
  res.json(reservation);
});

// get reservations by salle id
reservationRouter.get("/salle/:salleId", async (req, res) => {
  const reservations = await Reservation.find({salleId : req.params.salleId})
  console.log(reservations)
  if(!reservations){
    res.status(404).json("Pas de Reservation pour cette salle")
  }

  res.json(reservations)
})

// Create a reservation
reservationRouter.post("/", async (req, res) => {
  const { salleId, jour, creneau, utilisateurId } = req.body;
  if (salleId && jour && creneau && utilisateurId) {
    await Reservation.create({
      salleId: salleId,
      jour: jour,
      creneau: creneau,
      utilisateurId: utilisateurId,
    });
    const reservations = await Reservation.find({});
    res.send(reservations);
  } else {
    res.status(422).json("Attributs manquants");
  }
});

// Update the given reservation
reservationRouter.put("/:id", checkValidIdReserv, async (req, res) => {
  const updateReserv = await Reservation.findByIdAndUpdate(
    req.params.id,
    {
      salleId: req.body.salleId,
      jour: req.body.jour,
      creneau: req.body.creneau,
      utilisateurId: req.body.utilisateurId,
    },
    { new: true } //pour renvoyer le document utilisateur mis à jour
  );
  res.json(updateReserv);
});

// Delete the given reservation
reservationRouter.delete("/:id", checkValidIdReserv, async (req, res) => {
  try {
    const deletedReserv = await Reservation.findByIdAndDelete(req.params.id);
    if (!deletedReserv) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json(await Reservation.find({}));
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = reservationRouter;
