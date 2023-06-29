const Participant = require("../models/Participant");
const Reservation = require("../models/Reservation");
const express = require("express");
const participantRouter = express.Router();
const mongoose = require("mongoose");

// middleware to 404 error participants
const checkValidIdParticipant = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Validate the ID format
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ error: "Invalid participant ID" });
    }

    const participant = await Participant.findById(id);
    if (!participant) {
      return res.status(404).json({ error: "Participant n'existe pas" });
    }

    next();
  } catch (err) {
    next(err);
  }
};

// get all participants
participantRouter.get("/", async (req, res) => {
  const participants = await Participant.find({});
  res.send(participants);
});

// //get participant whith id
participantRouter.get("/:id", async (req, res) => {
  let idReservation = req.params.id;

  const reservation = await Reservation.findById(idReservation);
  if (reservation) {
    const participants = await Participant.find({
      reservationId: idReservation,
    });
    res.send(participants);
  } else {
    return res.status(404).json({ error: "Reservation n'existe pas" });
  }
});

// Create a new participant
participantRouter.post("/", async (req, res) => {
  const { nom, prenom, naissance, reservationId } = await req.body;
  if (nom && prenom && naissance && reservationId) {
    await Participant.create({
      nom: req.body.nom,
      prenom: req.body.prenom,
      naissance: req.body.naissance,
      reservationId: req.body.reservationId,
    });
    const participants = await Participant.find({});
    res.send(participants);
  } else {
    res.sendStatus(422);
  }
});

// Update the given participant
participantRouter.put("/:id", checkValidIdParticipant, async (req, res) => {
  const updatParticipant = await Participant.findByIdAndUpdate(
    req.params.id,
    {
      nom: req.body.nom,
      prenom: req.body.prenom,
      naissance: req.body.naissance,
      reservationId: req.body.reservationId,
    },
    { new: true } //pour renvoyer le document participant mis à jour
  );
  res.send(updatParticipant);
});

// Delete the given participant
participantRouter.delete("/:id", checkValidIdParticipant, async (req, res) => {
  try {
    const deletedParticipant = await Participant.findByIdAndDelete(
      req.params.id
    );
    if (!deletedParticipant) {
      return res.status(404).json({ error: "Participant not found" });
    }
    res.json({ message: "Participant deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = participantRouter;