const express = require("express");
const router = express.Router();
const path = require("path");

router.use(express.static(__dirname + "/uploads/2021-9/D1"));

router.get("/:directory/:file", (req, res) => {
  const { directory, file } = req.params;
  res.sendFile(`${directory}/${file}`, {
    root: path.join(__dirname, "../uploads/2021-9/D1/"),
  });
});

module.exports = router;
