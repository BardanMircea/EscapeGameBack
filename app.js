const express = require("express"); // install express (npm i express)
const app = express();
exports.app = app;
const port = 3000;
const mongoose = require("mongoose"); // install mongoose (npm i mongoose)
const bodyParser = require("body-parser");

// import cors
const cors = require("cors")

// import routers
const salle_router = require("./controller/salle_controller");
const utilisateur_router = require("./controller/utilisateur_controller");
const participant_router = require("./controller/participant-cotroller");
const reservation_router = require("./controller/reservation_controller");
const login_router = require("./controller/login_controller")

// use body-parser pour les requettes POST at PUT
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use CORS middleware to allow cross-origin requests from our frontend domain
app.use(cors())

// configurer les routes
app.use("/salles", salle_router);
app.use("/utilisateurs", utilisateur_router);
app.use("/reservations", reservation_router);
app.use("/participants", participant_router);
app.use("/login", login_router);

// start the server at http://localhost:3000
app.listen(port, async () => {
  require("dotenv").config(); // n'oubliez pas d'installer dotenv (npm i dotenv), et de creer le fichier [.env]
  // dans le fichier [.env], il faut definir une variable [MONGODB_URI] avec l'URI MongoDB comme value (vous le trouverez dans Atlas: Database: Connect: Drivers: parag. 3)
  await mongoose.connect(process.env.MONGODB_URI); // et passer cette variable comme paramettre dans la methode connect()
  console.log(`App started on port ${port}`);
});
