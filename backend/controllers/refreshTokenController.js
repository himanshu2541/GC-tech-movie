const expressAsyncHandler = require("express-async-handler");
const createError = require("http-errors");
const { verifyRefreshToken } = require("../helpers/jwt_helper");
const User = require("../models/userModel");
const generateToken = require("../helpers/generateToken");
const UserToken = require("../models/userTokenModel");
const tokenCookieOptions = require("../helpers/tokenCookieOptions");
const userRoleModel = require("../models/userRoleModel");

module.exports = {
  getNewRefreshToken: expressAsyncHandler(async (req, res) => {
    console.log(req.cookies);

    const refresh_token =
      req.cookies?.refreshToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!refresh_token) {
      throw createError.Unauthorized();
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

    const role = await userRoleModel.findOne({ UserId: id });

    res
      .status(200)
      .cookie("refreshToken", refreshToken, tokenCookieOptions)
      .cookie("accessToken", accessToken, tokenCookieOptions)
      .json({
        accessToken,
        refreshToken,
        user: {
          roles: role.Role,
        },
      });
  }),

  deleteRefreshToken: expressAsyncHandler(async (req, res) => {
    const refreshToken =
      req.cookies?.refreshToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!refreshToken) {
      throw createError.BadRequest();
    }

    const userToken = await UserToken.findOne({ token: refreshToken });
    if (!userToken) {
      throw createError.InternalServerError();
    }

    await UserToken.deleteOne({ token: refreshToken });

    res.status(200).json({ message: "Logout successfully" });
  }),
};
