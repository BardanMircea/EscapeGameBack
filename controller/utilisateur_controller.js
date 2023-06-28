const Utilisateur = require("../models/Utilisateur");
const express = require("express");
const utilisateurRouter = express.Router();

// get all gategories
utilisateurRouter.get("/", async (req, res) => {
  const utilisateurs = await Utilisateur.find({});
  res.send(utilisateurs);
});

module.exports = utilisateurRouter;
