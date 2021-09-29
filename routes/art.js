const express = require('express')
const router = express.Router()
const artController = require("../controllers/art");

router.use((req, res, next) => {
  console.log(req.url, "@", Date.now())
  next()
})

router
  .get('/', artController.getArts)
  .get("/:id", artController.getArts)


module.exports = router