require("dotenv/config");
const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser");
const userController = require("./controllers/user");
const user = require("./routes/user");
const art = require("./routes/art");
const work = require("./routes/work");
const image = require("./routes/image");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { directoryInit, indexInit } = require("./utils/generate");
let indexIncreased = indexInit();
let generateDirectory = directoryInit();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = `./uploads${generateDirectory()}`;
    console.log("dir", dir);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${indexIncreased()}.jpg`);
  },
});

const upload = multer({
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
      return cb("檔案格式錯誤", false);
    cb(null, true);
  },
  storage: storage,
});

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

// server.use(express.static(__dirname + "/uploads/2021-9/D1"));
server.use("/", image);
server.use("/users", user);
server.use("/arts", art);
server.use("/works", closureFuncInit, upload.array("avatar", 5), work);

server.get("/signout", userController.signout);
server.post("/me", userController.getMe);
server.post("/signup", userController.signup);
server.post("/signin", userController.signin);

server.listen(process.env.PORT, () => {
  console.log(`Listening port ${process.env.PORT}`);
});

function closureFuncInit(req, res, next) {
  indexIncreased = indexInit();
  generateDirectory = directoryInit();
  next();
}
