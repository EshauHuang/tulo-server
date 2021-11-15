const express = require("express");
const router = express.Router();
const comicController = require("../controllers/comic");

router.use((req, res, next) => {
  console.log(`${req.method} /comics${req.url}`);
  next();
});

router
  .get("/", comicController.getComics)
  .get("/:id", comicController.getComic);

module.exports = router;
