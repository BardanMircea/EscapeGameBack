import mongoose from "mongoose";

// creer schema pour Utilisateur
const schemaUtilisateur = new mongoose.Schema({
    nom: String,
    prenom: String,
    email : String,
    mdp : String,
    naissance : Date, 
    role : String
});

// creer le model pour Utilisateur
const Utilisateur = mongoose.model("Utilisateur", schemaUtilisateur)

exports.Utilisateur
