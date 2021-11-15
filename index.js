require("dotenv/config");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userController = require("./controllers/user");
const user = require("./routes/user");
const art = require("./routes/art");
const comic = require("./routes/comic");
const work = require("./routes/work");
const image = require("./routes/image");
const multer = require("multer");
const fs = require("fs");
const { directoryInit } = require("./utils/generators");
let generateDirectory = directoryInit();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { type } = req.body;
    const dir = `./public/${type}${generateDirectory()}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|jfif|png|gif)$/))
      return cb("檔案格式錯誤", false);
    cb(null, true);
  },
  storage: storage,
});

const server = express();

server.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: "content-type",
    credentials: true,
  })
);

server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/img", image);
server.use("/users", user);
server.use("/arts", art);
server.use("/comics", comic);
server.use("/works", generatorInit, upload.array("pictures", 30), work);
server.post("/photo", upload.array("photo", 1), userController.postUserPhoto);

server.get("/me", userController.getMe);
server.get("/signout", userController.signout);
server.post("/signin", userController.signin);
server.post("/signup", userController.signup);

server.listen(process.env.PORT, () => {
  console.log(`Listening port ${process.env.PORT}`);
});

function generatorInit(req, res, next) {
  generateDirectory = directoryInit();
  next();
}
