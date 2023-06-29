const Utilisateur = require("../models/Participant");
const express = require("express");
const participantRouter = express.Router();
const mongoose = require("mongoose");
const utilisateurRouter = require("./utilisateur_controller");

module.exports = utilisateurRouter;
