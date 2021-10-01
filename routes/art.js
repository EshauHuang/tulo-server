const express = require("express");
const router = express.Router();
const artController = require("../controllers/art");

router.use((req, res, next) => {
  console.log(`${req.method} /arts${req.url}`);
  next();
});

router.get("/", artController.getArts).get("/:id", artController.getArt);

module.exports = router;
