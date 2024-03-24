const SAME_SITE = "None";
const SECURE_COOKIE = process.env.NODE_ENV === "production" ? true : false;
const httpOnly = true;

const tokenCookieOptions = {
  httpOnly: httpOnly,
  sameSite: SAME_SITE,
  // secure: SECURE_COOKIE,
};

module.exports = tokenCookieOptions;
