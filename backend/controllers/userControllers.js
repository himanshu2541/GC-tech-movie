const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const UserRole = require("../models/userRoleModel");
const {
  loginSchema,
  registerSchema,
  updateUserSchema,
} = require("../middlewares/validation");
const generateToken = require("../helpers/generateToken");
// Login user
// post request with email and password
// public access

const loginUser = asyncHandler(async (req, res) => {
  // validating the body
  let result;
  try {
    result = await loginSchema.validateAsync(req.body);
  } catch (error) {
    if (error.isJoi === true) {
      throw createError.UnprocessableEntity(error.details[0].message);
    }
    throw createError.BadRequest();
  }

  // checking for user existance
  const { email, password } = result;
  const user = await User.findOne({ email });

  if (!user) {
    throw createError.NotFound("User not found");
  }

  // Checking for password
  if (user && (await bcrypt.compare(password, user.password))) {
    const { accessToken, refreshToken } = await generateToken(user._id);

    if (!accessToken || !refreshToken) {
      throw createError.InternalServerError();
    }

    res.status(200).json({
      accessToken,
      refreshToken,
    });
  } else {
    throw createError.Unauthorized("Invalid Credentials");
  }
});

// Register user
// post request with name, email and password
// public access

const registerUser = asyncHandler(async (req, res) => {
  // checking for validation
  let result;
  try {
    result = await registerSchema.validateAsync(req.body);
  } catch (error) {
    if (error.isJoi === true) {
      throw createError.UnprocessableEntity(error.details[0].message);
    }
    throw createError.BadRequest();
  }

  const { name, email, password } = result;

  // checking for user existance
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw createError.Conflict("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // creating user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (!user) {
    throw createError.InternalServerError();
  }

  // creating user role
  const userRole = await UserRole.create({
    UserId: user._id,
    Role: "tier4",
  });

  if (!userRole) {
    await User.findByIdAndDelete(user._id);
    throw createError.InternalServerError();
  }

  const { accessToken, refreshToken } = await generateToken(user._id);

  if (!accessToken || !refreshToken) {
    throw createError.InternalServerError();
  }

  res.status(201).json({ accessToken, refreshToken });
});

// update user
// post request with password and new password
// private access
const updateUser = asyncHandler(async (req, res) => {
  // id we are getting from auth middleware

  let result;
  try {
    result = await updateUserSchema.validateAsync(req.body);
  } catch (error) {
    if (error.isJoi === true) {
      throw createError.UnprocessableEntity(error.details[0].message);
    }
    throw createError.BadRequest();
  }

  const { password, newPassword } = result;

  const { id } = req.payload;

  if (!id) {
    throw createError.BadRequest("Please provide id");
  }

  if (!password || !newPassword) {
    throw createError.BadRequest("Please provide password and new password");
  }

  // checking for user existance

  const user = await User.findById(id);

  if (!user) {
    throw createError.NotFound("User not found");
  }

  // confirming the user password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw createError.Unauthorized("Invalid Credentials");
  }

  // updating the user password

  const salt = await bcrypt.genSalt(10);
  const newHashedPassword = await bcrypt.hash(newPassword, salt);

  const updatedUser = await User.findByIdAndUpdate(
    { _id: id },
    {
      password: newHashedPassword,
    }
  );

  if (!updatedUser) {
    throw createError.InternalServerError();
  }

  res.status(200).json({ msg: "Password updated", success: true });
});

// delete request
// post request and password
// private access

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.payload;
  const { password } = req.body;

  if (!id) {
    throw createError.BadRequest("Please provide id");
  }
  if (!password) {
    throw createError.BadRequest("Please provide password");
  }

  // checking for user existance
  const user = await User.findById(id);
  if (!user) {
    throw createError.NotFound("User not found");
  }

  // confirming the user password
  if (user && (await bcrypt.compare(password, user.password))) {
    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "User deleted", success: true });
  } else {
    throw createError.Unauthorized("Invalid Credentials");
  }
});

// user profile
// get request
// private access
const userProfile = asyncHandler(async (req, res) => {

  const { id } = req.payload;
  const user = await User.findById(id).select("-password");

  const role = await UserRole.findOne({ UserId: id });

  if (!user) {
    throw createError.NotFound("User not found");
  }

  const { name, email } = user;
  res.status(200).json({
    name: name,
    email: email,
    role: role.Role,
  });
  
});

module.exports = {
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
  userProfile,
};
