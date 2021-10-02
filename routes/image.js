const express = require("express");
const path = require("path");
const router = express.Router();

router.get(/.*/, (req, res) => {
  const directory = req.url;
  res.sendFile(`${directory}`, {
    root: path.join(__dirname, `../public`),
  });
});

module.exports = router;
