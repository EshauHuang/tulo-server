const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const db = require("../models");
const isAuth = require("../utils/isAuth");
const { setOptions } = require("../utils/setOptions");
const { createAccessToken, setAccessToken } = require("../utils/tokens");

const { User, Work, Art, Comic, sequelize } = db;
const saltRounds = Number(process.env.SALT);

const userController = {
  async signup(req, res) {
    const { username, password, nickname } = req.body;
    try {
      if (!username || !password || !nickname) throw new Error("INVALID");
      const user = await User.findOne({
        where: {
          username,
        },
      });
      if (user) throw new Error("DUPLICATED");
      const hash = await bcrypt.hash(password, saltRounds);
      const newUser = await User.create({
        username,
        password: hash,
        nickname,
      });
      if (!newUser) throw new Error("FAIL");
      const { id, intro } = newUser;
      const accessToken = createAccessToken(newUser);
      setAccessToken(req, res, accessToken);
      res.json({
        ok: 1,
        user: {
          UserId: id,
          username,
          nickname,
          intro,
        },
      });
    } catch (err) {
      res.json({ ok: 0, message: err.message });
    }
  },
  async signin(req, res) {
    const { username, password } = req.body;
    try {
      if (!username || !password) throw new Error("BLANK CONTENT");
      const user = await User.findOne({
        where: {
          username,
        },
      });
      if (!user) throw new Error("NOT FOUNT");
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("INVALID");
      const accessToken = createAccessToken(user);
      setAccessToken(req, res, accessToken);
      res.json({ ok: 1, message: "SIGN IN" });
    } catch (err) {
      res.json({ ok: 0, message: err.message });
    }
  },
  async signout(req, res) {
    res.clearCookie("accessToken");
    res.json({ ok: 1, message: "SIGN OUT" });
  },
  async getMe(req, res) {
    try {
      const user = await isAuth(req);
      res.json({ ok: 1, user });
    } catch (err) {
      res.json({ ok: 0, message: err.message });
    }
  },
  async getUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findOne({
        where: {
          id,
        },
        attributes: [
          "id",
          "username",
          "intro",
          "photo",
          "nickname",
          "createdAt",
        ],
      });
      if (!user) throw new Error("NOT FOUNT");
      res.json({ ok: 1, user });
    } catch (err) {
      res.json({ ok: 0, message: err.message });
    }
  },
  async getUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: ["id", "username", "nickname", "createdAt"],
      });
      if (!users) throw new Error("NOT FOUNT");
      res.json({ ok: 1, users });
    } catch (err) {
      res.json({ ok: 0, message: err.message });
    }
  },
  async postUserPhoto(req, res) {
    try {
      const { files } = req;
      const [, directory] = files[0].destination.match(/\.\/.*?(\/.*)/);
      const me = await isAuth(req);
      if (!me) throw new Error("INVALID");
      const { UserId } = me;
      const user = await User.findOne({
        where: {
          id: UserId,
        },
      });
      if (user.photo) {
        const oldPhoto = path.resolve(__dirname, `../public${user.photo}`);
        const newPhoto = path.resolve(__dirname, `../public${directory}`);
        fs.rename(`${newPhoto}/0.jpg`, `${oldPhoto}/0.jpg`, (err) => {
          if (err) throw err;
          fs.rm(newPhoto, { recursive: true }, () => {
            console.log("delete newPhoto");
          });
          console.log("update photo!");
        });
      } else {
        await user.update({ photo: directory });
      }
      res.json({ ok: 1, photo: user.photo });
    } catch (err) {
      res.json({ ok: 0, message: err });
    }
  },
  async edit(req, res) {
    const { nickname, intro } = req.body;
    try {
      if (!nickname) throw new Error("BLANK CONTENT");
      const me = await isAuth(req);
      if (!me) throw new Error("INVALID");
      const { UserId } = me;
      const user = await User.findOne({
        where: {
          id: UserId,
        },
      });
      await user.update({ nickname, intro });
      res.json({ ok: 1, message: "Update Success" });
    } catch (err) {
      res.json({ ok: 0, message: err });
    }
  },
  async getExtended(req, res) {
    let countOptions = {};
    const { type } = req.query;
    if (type === "art" || type === "comic") {
      countOptions.type = type;
    }
    const options = setOptions(req, {
      parentsModel: Work,
      childrenModels: {
        art: [Art],
        comic: [Comic],
        all: [Comic, Art],
      },
    });
    try {
      const user = await User.findOne({
        attributes: ["username", "nickname", "createdAt"],
        ...options,
      });
      if (!user) throw new Error("Not fount");
      const count = await Work.count({
        where: {
          UserId: user.id,
          ...countOptions,
        },
      });
      res.json({ ok: 1, user, count });
    } catch (err) {
      res.json({ ok: 0, message: err.message });
    }
  },
};

module.exports = userController;
