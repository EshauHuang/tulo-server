const db = require("../models");
const { Art } = db;

const artController = {
  async getArt(req, res) {
    const { id } = req.params;
    try {
      const art = await Art.findOne({
        where: {
          WorkId: id,
        },
      });
      if (!art) throw new Error("Not fount");
      res.json({ ok: 1, art });
    } catch (err) {
      res.json({ ok: 0, message: err.message });
    }
  },
  async getArts(req, res) {
    try {
      const arts = await Art.findAll();
      if (!arts) throw new Error("Not fount");
      res.json({ ok: 1, arts });
    } catch (err) {
      res.json({ ok: 0, message: err.message });
    }
  },
};

module.exports = artController;
