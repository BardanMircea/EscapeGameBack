const Utilisateur = require("../models/Utilisateur");
const express = require("express");
const utilisateurRouter = express.Router();
const mongoose = require("mongoose");

// middleware to 404 error utilisateur
const checkValidIdUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    // Validate the ID format
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ error: "Invalid utilisateur ID" });
    }
    const user = await Utilisateur.findById(id);
    if (!user) {
      return res.status(404).json({ error: "L'utilisateur n'existe pas" });
    }
    next();
  } catch (err) {
    next(err);
  }
};

// get all utilisateurs
utilisateurRouter.get("/", async (req, res) => {
  const utilisateurs = await Utilisateur.find({});
  res.json(utilisateurs);
});

//get utilisateur whith idmiddlware
utilisateurRouter.get("/:id", checkValidIdUser, async (req, res) => {
  let id = req.params.id;
  const user = await Utilisateur.findOne({ _id: id });
  res.json(user);
});

// Create a new user
utilisateurRouter.post("/", async (req, res) => {
  const { nom, prenom, email, mdp, naissance, role } = req.body;
  if (nom && prenom && email && mdp && naissance && role) {
    await Utilisateur.create({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      mdp: req.body.mdp,
      naissance: req.body.naissance,
      role: req.body.role,
    });
    const utilisateurs = await Utilisateur.find({});
    res.json(utilisateurs);
  } else {
    res.status(422).json("Attributs manquants");
  }
});

// Update the given user
utilisateurRouter.put("/:id", checkValidIdUser, async (req, res) => {
  const { nom, prenom, email, mdp, naissance, role } = await req.body;
  const updateUser = await Utilisateur.findByIdAndUpdate(
    req.params.id,
    {
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      mdp: req.body.mdp,
      naissance: req.body.naissance,
      role: req.body.role,
    },
    { new: true } //pour renvoyer le document utilisateur mis à jour
  );
  res.json(updateUser);
});

// Delete the given user
utilisateurRouter.delete("/:id", checkValidIdUser, async (req, res) => {
  try {
    const deletedUser = await Utilisateur.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(await Utilisateur.find({}));
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = utilisateurRouter;
