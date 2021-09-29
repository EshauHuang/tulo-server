const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.use((req, res, next) => {
  console.log(req.url, "@", Date.now());
  next();
});

router
  .get("/", userController.getUsers)
  .get("/:id/", userController.getUser)
  .get("/:id/:source", userController.getUserToWorks);

module.exports = router;
