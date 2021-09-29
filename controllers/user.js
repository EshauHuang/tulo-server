const bcrypt = require("bcrypt");
const db = require("../models");
const isAuth = require("../utils/isAuth");
const { createAccessToken, setAccessToken } = require("../utils/tokens");

const { User, Work, Art, Comic } = db;
const saltRounds = Number(process.env.SALT);

const userController = {
  async signup(req, res) {
    const { username, password, nickname } = req.body;
    try {
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
      const accessToken = createAccessToken(newUser);
      setAccessToken(req, res, accessToken);
      res.json({ ok: 1, message: "SIGN UP" });
    } catch (err) {
      res.json({ ok: 0, message: err.message });
    }
  },
  async signin(req, res) {
    const { username, password } = req.body;
    if (!username || !password) throw new Error("INVALID");
    try {
      const user = await User.findOne({
        where: {
          username,
        },
      });
      if (!user) throw new Error("INVALID");
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("INVALID");
      const accessToken = createAccessToken(user.id);
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
  async getUsers(req, res) {
    const { id } = req.params;
    const { auth } = req.body;
    try {
      if (auth !== process.env.AUTH) throw new Error("UNAUTHORIZED");
      const user = await User.findOne({
        where: {
          id,
        },
        attributes: ["username", "nickname", "createdAt"],
        include: [
          {
            model: Work,
            include: [Comic, Art],
          },
        ],
      });
      res.json({ ok: 1, user });
    } catch (err) {
      res.json({ ok: 0, message: err.message });
    }
  },
  async getMe(req, res) {
    try {
      const user = await isAuth(req);
      res.json({ ok: 1, user });
    } catch (err) {
      res.json({ ok: 0, message: err.message });
    }
  },
};

module.exports = userController;

function controlOrder(...query) {
  console.log(...query);
}
