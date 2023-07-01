const Utilisateur = require("../models/Utilisateur");
const express = require("express");
const utilisateurRouter = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

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

//get utilisateur by id with middleware
utilisateurRouter.get("/:id", checkValidIdUser, async (req, res) => {
  let id = req.params.id;
  const user = await Utilisateur.findOne({ _id: id });
  res.json(user);
});

// Create a new user
utilisateurRouter.post("/", async (req, res) => {
  // check if [nom, prenom, mdp, email, naissance] attributes are present in the req.body (the [role] attribute will be set to "utilisateur" by default, later)
  const {nom, prenom, email, mdp, naissance} = req.body;
  if(!nom || !prenom || !email || !mdp || !naissance){
      return res.status(422).json("Attributs manquants")
  }

  // check if the new user's email is already in the database
  const utilisateur = await Utilisateur.findOne({email : req.body.email})
  if(utilisateur){
      return res.status(409).json("Adresse email deja enregistree")
  }

  // if not, create a new user and send a response status 200 
  const encryptedMdp = bcrypt.hashSync(mdp, 8)

  await Utilisateur.create({
      nom : nom,
      prenom : prenom,
      email : email,
      mdp : encryptedMdp,
      naissance : naissance,
      role : "utilisateur"
  })

  res.sendStatus(200)
});

// Update the given user
utilisateurRouter.put("/:id", checkValidIdUser, async (req, res) => {
  const { nom, prenom, email, mdp, naissance, role } = req.body;
  const updatedUser = await Utilisateur.findById(req.params.id)

  // if the mdp is present in the req.body, hash it and save the new hash in the database, else keep the old mdp hash
  let updatedMdp = updatedUser.mdp;
  if(mdp) {
    updatedMdp = bcrypt.hashSync(mdp, 8)
  }

  const updateUser = await Utilisateur.findByIdAndUpdate(
    req.params.id,
    {
      nom: nom,
      prenom: prenom,
      email: email,
      mdp: updatedMdp,
      naissance: naissance,
      role: role,
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
