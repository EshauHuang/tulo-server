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
        attributes: ["title", "type", "tag", "UserId", "createdAt"],
        fields: ["title", "type", "tag", "UserId"],
      });
      if (type.toLowerCase() === "art") {
        result = await Art.create({
          location: ["aaaaa", 2, 3, 4],
          WorkId: work.id,
          attributes: ["location", "workId", "createAt"],
          fields: ["location", "workId"],
        });
      }
      if (type.toLowerCase() === "comic") {
        result = await Comic.create({
          location: ["1aaa", 2, 3, 4],
          WorkId: work.id,
          fields: ["location", "workId"],
        });
      }
      res.json({ ok: 1, message: "Create Work" });
    } catch (err) {
      res.json({ ok: 0, message: err.message });
    }
  },
};

module.exports = workController;
