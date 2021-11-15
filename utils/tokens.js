const { sign } = require("jsonwebtoken");

const createAccessToken = (user) => {
  const { id: UserId, username, nickname } = user;
  return sign({ UserId, username, nickname }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

const setAccessToken = (req, res, accessToken) => {
  return res.cookie("accessToken", accessToken, {
    maxAge: 60 * 60 * 24 * 1000 * 7,
  });
};

module.exports = {
  createAccessToken,
  setAccessToken,
};
