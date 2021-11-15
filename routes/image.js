const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const dir = path.resolve(__dirname, `../public/`);

router.get(/.*\/.*\.(jpg|png|gif)$/, (req, res) => {
  const directory = req.url;
  res.sendFile(`${dir}${directory}`);
});

router.get(/.*/, (req, res) => {
  const directory = req.url;
  try {
    fs.readdir(`${dir}${directory}`, (err, files) => {
      if (!files) throw new Error("Not fount");
      const ascFiles = files.sort((a, b) => a.split(".")[0] - b.split(".")[0]);
      res.json({ ok: 1, files: ascFiles });
    });
  } catch (err) {
    res.json({ ok: 0, message: err });
  }
});

module.exports = router;
