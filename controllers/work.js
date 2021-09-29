const db = require("../models");
const isAuth = require("../utils/isAuth");

const { Work, Art, Comic } = db;

const workController = {
  async newWork(req, res) {
    const { type, title } = req.body;
    try {
      if (!type || !title) throw new Error("FAIL");
      const me = await isAuth(req);
      const work = await Work.create({
        ...req.body,
        ...me,
        fields: ["title", "type", "tag", "UserId"],
      });
      if (type === "ART") {
        Art.create({
          location: [1, 2, 3, 4],
          WorkId: work.id,
          fields: ["location", "workId"],
        });
      }
      if (type === "COMIC") {
        Comic.create({
          location: [1, 2, 3, 4],
          WorkId: work.id,
          fields: ["location", "workId"],
        });
      }

      res.send("success");
    } catch (err) {
      res.send({ ok: 0, message: err.message });
    }
  },
};

module.exports = workController;
