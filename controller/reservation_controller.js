const Reservation = require("../models/Reservation");
const express = require("express");
const reservationRouter = express.Router();
const mongoose = require("mongoose");

// middleware to 404 error reservation
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
  res.send(reservations);
});

// //get reservation whith idmiddlware
// reservationRouter.get("/:id", checkValidIdReserv, async (req, res) => {
//   let id = req.params.id;
//   const reservation = await Reservation.findOne({ _id: id });
//   res.send(reservation);
// });

// // Create a new user
// utilisateurRouter.post("/", async (req, res) => {
//     const { nom, prenom, email, mdp, naissance, role } = await req.body;
//     if (nom && prenom && email && mdp && naissance && role) {
//       await Utilisateur.create({
//         nom: req.body.nom,
//         prenom: req.body.prenom,
//         email: req.body.email,
//         mdp: req.body.mdp,
//         naissance: req.body.naissance,
//         role: req.body.role,
//       });
//       const utilisateurs = await Utilisateur.find({});
//       res.send(utilisateurs);
//     } else {
//       res.sendStatus(422);
//     }
//   });
