require("dotenv/config");
const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser");
const userController = require("./controllers/user");
const user = require('./routes/user')
const art = require('./routes/art')
const work = require('./routes/work')

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

server.use('/users', user)
server.use('/arts', art)
server.use("/works", work);

server.get("/signout", userController.signout);
server.post("/me", userController.getMe);
server.post("/signup", userController.signup);
server.post("/signin", userController.signin);

server.listen(process.env.PORT, () => {
  console.log(`Listening port ${process.env.PORT}`);
});
