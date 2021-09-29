const { verify } = require("jsonwebtoken");

const isAuth = (req) => {
  const { authorization } = req.headers;
  if (!authorization) throw new Error("UNAUTHORIZED");
  const token = authorization.split(" ")[1];
  const { iat, exp, ...user } = verify(token, process.env.ACCESS_TOKEN_SECRET);
  return user;
};

module.exports = isAuth;
