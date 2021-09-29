const express = require('express')
const router = express.Router()
const workController = require("../controllers/work");

router.use((req, res, next) => {
  console.log(req.url, "@", Date.now())
  next()
})

router
  .post('/', workController.newWork)
  


module.exports = router