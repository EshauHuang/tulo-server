require("dotenv/config");
const express = require("express");
const cors = require("cors");
const userController = require("./controllers/user");
const workController = require("./controllers/work");
const artController = require("./controllers/art");
const cookie = require("cookie-parser");

const server = express();

server.use(
  cors({
    origin: "http://localhost:3333",
    credentials: true,
  })
);

server.use(cookie());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/signout", userController.signout);
server.post("/me", userController.getMe);
server.post("/signup", userController.signup);
server.post("/signin", userController.signin);
server.post("/user/:id", userController.getUsers);

server.post("/work", workController.newWork);

server.get("/art/:id", artController.getArt);

server.listen(process.env.PORT, () => {
  console.log(`Listening port ${process.env.PORT}`);
});
