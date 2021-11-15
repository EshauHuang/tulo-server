const db = require("../models");
const { Comic } = db;

const comicController = {
  async getComic(req, res) {
    const { id } = req.params;
    try {
      const comic = await Comic.findOne({
        where: {
          WorkId: id,
        },
      });
      res.json({ ok: 1, comic });
    } catch (err) {
      res.json({ ok: 0, message: err.message });
    }
  },
  async getComics(req, res) {
    try {
      const comic = await Comic.findAll();
      res.json({ ok: 1, comic });
    } catch (err) {
      res.json({ ok: 0, message: err.message });
    }
  },
};

module.exports = comicController;
