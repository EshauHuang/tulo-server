const { sign } = require("jsonwebtoken");

const createAccessToken = (user) => {
  const { id: UserId, username, nickname, createdAt } = user;
  return sign(
    { UserId, username, nickname, createdAt },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

const setAccessToken = (req, res, accessToken) => {
  return res.cookie("accessToken", accessToken, {
    httpOnly: true,
  });
};

module.exports = {
  createAccessToken,
  setAccessToken,
};
