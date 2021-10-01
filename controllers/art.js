const db = require("../models");
const isAuth = require("../utils/isAuth");
const { Work, Art } = db;

const artController = {
  async getArt(req, res) {
    const { id } = req.params;
    try {
      const art = await Art.findOne({
        where: {
          id,
        },
      });
      res.json({ ok: 1, art });
    } catch (err) {
      res.json({ ok: 0, message: err.message });
    }
  },
  async getArts(req, res) {
    try {
      const art = await Art.findAll();
      res.json({ ok: 1, art });
    } catch (err) {
      res.json({ ok: 0, message: err.message });
    }
  },
};

module.exports = artController;
