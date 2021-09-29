const db = require("../models");
const isAuth = require("../utils/isAuth");
const checkParams = require("../utils/checkParams");
const { Work, Art } = db;

const artController = {
  async getArts(req, res) {
    const { id } = req.params;
    try {
      const art = await Art.findAll({
        where: {
          id,
        },
      });
      res.json({ ok: 1, art });
    } catch (err) {
      res.send(err);
    }
  },
};

module.exports = artController;
