const jwt = require("jsonwebtoken");

const createError = require("http-errors");
const UserToken = require("../models/userTokenModel");

module.exports = {
  signAccessToken: (id) => {
    return new Promise((resolve, reject) => {
      const payload = { id };

      const secret = process.env.JWT_SECRET;

      const options = {
        expiresIn: "10m",
        issuer: "kgplay",
      };

      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          return reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },

  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) {
      return next(createError.Unauthorized());
    }
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          return next(createError.Unauthorized());
        } else if (err.name === "TokenExpiredError") {
          return next(createError.Unauthorized("Session Expired, Login Again"));
        } else {
          return next(createError.Unauthorized());
        }
      }
      
      req.payload = payload;
      next();
    });
  },

  signRefreshToken: (id) => {
    return new Promise((resolve, reject) => {
      const payload = { id };

      const secret = process.env.REFRESH_TOKEN_SECRET;

      const options = {
        expiresIn: "60d",
        issuer: "kgplay",
      };

      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          return reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },

  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {

      const userToken = UserToken.findOne({ token: refreshToken })

      if(!userToken){
        return reject(createError.Unauthorized())
      }
      
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) return reject(createError.Unauthorized())
          const {id} = payload
          resolve(id)
        }
      )
    })
  },
};
