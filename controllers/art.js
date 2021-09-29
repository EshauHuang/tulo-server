const db = require("../models");
const isAuth = require("../utils/isAuth");

const { Work, Art } = db;

const artController = {
  async getArt(req, res) {
    const { id: WorkId } = req.params;
    console.log(WorkId);
    try {
      const art = await Art.findAll({
        where: {
          WorkId,
        },
      });
      console.log(art);
      res.send(art);
    } catch (err) {
      res.send(err);
    }
  },
};

module.exports = artController;
