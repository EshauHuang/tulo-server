const db = require("../models");
const isAuth = require("../utils/isAuth");
const fs = require("fs");
const path = require("path");

const { setPage, setType } = require("../utils/setOptions");
const { Work, Art, Comic, User, sequelize } = db;

const workController = {
  async newWork(req, res) {
    const { files } = req;
    const { title, type, tag, intro } = req.body;
    const [, directory] = files[0].destination.match(/\.\/.*?(\/.*)/);
    try {
      const { UserId } = await isAuth(req);
      if (files.length === 0 || !title || !type || !UserId) {
        return res.json({ ok: 0, message: "Content was empty!" });
      }
      if (!type || !title) throw new Error("FAIL");
      await sequelize.transaction(async (t) => {
        const work = await Work.create(
          {
            title,
            type,
            intro,
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
      const dir = path.resolve(__dirname, `../public${directory}`);
      console.log(err);
      fs.rm(dir, { recursive: true }, () => {
        console.log("delete folder");
      });
      console.log(err);
      res.json({ ok: 0, message: err.message });
    }
  },

  async getWork(req, res) {
    const { id } = req.params;
    try {
      const work = await Work.findOne({
        include: [
          Art,
          Comic,
          {
            model: User,
            attributes: ["username", "nickname", "intro", "photo", "createdAt"],
          },
        ],
        where: {
          id,
        },
      });
      if (!work) throw new Error("Not found");
      res.json({ ok: 1, work });
    } catch (err) {
      res.json({ ok: 0, message: err.message });
    }
  },

  async getWorks(req, res) {
    const { page, limit, offset, type } = req.query;
    const models = {
      art: Art,
      comic: Comic,
    };
    try {
      const works = await Work.findAll({
        where: {
          ...setType(type),
        },
        ...setPage(page, limit, offset),
        include: [
          { model: models[type] },
          {
            model: User,
            attributes: ["nickname", "username", "createdAt", "photo"],
          },
        ],
      });
      if (!works) throw new Error("Not found");
      res.json({ ok: 1, works });
    } catch (err) {
      res.json({ ok: 0, message: err.message });
    }
  },
};

module.exports = workController;
