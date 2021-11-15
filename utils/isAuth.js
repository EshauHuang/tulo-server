const { verify } = require("jsonwebtoken");

const isAuth = (req) => {
  const { accessToken } = req.cookies;
  if (!accessToken) throw new Error("UNAUTHORIZED");
  const { iat, exp, ...user } = verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET
  );
  return user;
};

module.exports = isAuth;
