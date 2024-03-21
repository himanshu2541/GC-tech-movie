const jwt = require("jsonwebtoken");

const getTokenFromHeaders = (req, res) => {
  let token;

  if (!req.headers.authorization) {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
  if (!req.headers.authorization.startsWith("Bearer")) {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }

  token = req.headers.authorization.split(" ")[1];

  // verify token

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(401);
    throw new Error("Not Authorized, Invalid token");
  }

  return decoded;
};

module.exports = { getTokenFromHeaders };
