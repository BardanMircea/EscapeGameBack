const express = require("express"); // install express (npm i express)
const app = express();
exports.app = app;
const port = 3000;
const mongoose = require("mongoose"); // install mongoose (npm i mongoose)
const Utilisateur = require("./models/Utilisateur");
const utilisateurRouter = require("./controller/utilisateur_controller");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/utilisateurs", utilisateurRouter);

// start the server at http://localhost:3000
app.listen(port, async () => {
  require("dotenv").config(); // n'oubliez pas d'installer dotenv (npm i dotenv), et de creer le fichier [.env]
  // dans le fichier [.env], il faut definir une variable [MONGODB_URI] avec l'URI MongoDB comme value (vous le trouverez dans Atlas: Database: Connect: Drivers: parag. 3)
  await mongoose.connect(process.env.MONGODB_URI); // et passer cette variable comme paramettre dans la methode connect()
  console.log(`App started on port ${port}`);
});

// L'alternative serait de nous nous connecter directement, sans [.env], au MongoDb, comme suit, mais cela va exposer notre mdp a tout le monde ayant access a notre Repo GitHub:

// app.listen(port, async () =>{
//     const MONGODB_URI="mongodb+srv://mirceacbardan:dictateurs2023@cluster0.w7mwvau.mongodb.net/EscapeGame?retryWrites=true&w=majority"
//     await mongoose.connect(MONGODB_URI)
//     console.log(`App started on port ${port}`)
// })
