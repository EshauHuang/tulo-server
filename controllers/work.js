const db = require("../models");
const isAuth = require("../utils/isAuth");
const fs = require("fs");

const { Work, Art, Comic, sequelize } = db;

const workController = {
  async newWork(req, res) {
    const { files } = req;
    const { title, type, tag } = req.body;
    const { UserId } = await isAuth(req);
    const directory = files[0].destination;
    try {
      if (!type || !title) throw new Error("FAIL");
      await sequelize.transaction(async (t) => {
        const work = await Work.create(
          {
            title,
            type,
            tag,
            UserId,
          },
          { transaction: t }
        );

        if (type.toLowerCase() === "art") {
          await Art.create(
            {
              directory,
              WorkId: work.id,
            },
            { transaction: t }
          );
        }
        if (type.toLowerCase() === "comic") {
          await Comic.create(
            {
              directory,
              WorkId: work.id,
            },
            { transaction: t }
          );
        }
        return work;
      });
      res.json({ ok: 1, message: "Create Work" });
    } catch (err) {
      fs.rmdir(directory, { recursive: true }, () => {
        console.log("delete files");
      });
      res.json({ ok: 0, message: err.message });
    }
  },

  async getWorks(req, res) {},
};

module.exports = workController;
