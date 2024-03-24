const expressAsyncHandler = require("express-async-handler");
const createError = require("http-errors");
const { verifyRefreshToken } = require("../helpers/jwt_helper");
const User = require("../models/userModel");
const generateToken = require("../helpers/generateToken");
const { refreshTokenSchema } = require("../middlewares/validation");
const UserToken = require("../models/userTokenModel");

module.exports = {
  getNewRefreshToken: expressAsyncHandler(async (req, res) => {
    let result;
    try {
      result = await refreshTokenSchema.validateAsync(req.body);
    } catch (error) {
      if (error.isJoi === true) {
        throw createError.UnprocessableEntity(error.details[0].message);
      }
      throw createError.BadRequest();
    }

    const refresh_token = result.refreshToken;

    if (!refresh_token) {
      throw createError.BadRequest();
    }

    const id = await verifyRefreshToken(refresh_token);

    if (!id) {
      throw createError.Unauthorized();
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      throw createError.Unauthorized();
    }

    const userToken = await UserToken.findOne({ token: refresh_token });

    if (!userToken) {
      throw createError.Unauthorized();
    }

    const { accessToken, refreshToken } = await generateToken(id);

    if (!accessToken || !refreshToken) {
      throw createError.InternalServerError();
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json({ accessToken, refreshToken });
  }),

  deleteRefreshToken: expressAsyncHandler(async (req, res) => {
    let result;
    try {
      result = await refreshTokenSchema.validateAsync(req.body);
    } catch (error) {
      if (error.isJoi === true) {
        throw createError.UnprocessableEntity(error.details[0].message);
      }
      throw createError.BadRequest();
    }

    const { refreshToken } = result;

    if (!refreshToken) {
      throw createError.BadRequest();
    }

    const userToken = await UserToken.findOne({ token: refreshToken });
    if (!userToken) {
      throw createError.Unauthorized();
    }

    await UserToken.deleteOne({ token: refreshToken });
    res.status(200).json({ message: "Logout successfully" });
  }),
};
