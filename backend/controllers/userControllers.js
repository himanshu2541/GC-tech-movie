const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const {validationResult} = require("express-validator");
const UserRole=require("../models/userRoleModel");

// Login user
// post request with email and password
// public access

const loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    for(let i=0; i<errors.array().length ; i++){
      throw createError.BadRequest(errors.array()[i].msg);
    }
  }
  if (!req.body) {
    throw createError.BadRequest("Please provide email and password");
  }

  const { email, password } = req.body;

  // Checking if user filled all the details
  if (!email || !password) {
    throw createError.BadRequest("Please provide all details");
  }

  // Checking for user
  const user = await User.findOne({ email });

  if (!user) {
    throw createError.NotFound("User not found");
  }

  // Checking for password

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      token: generateToken(user._id),
      success: true
    });
  } else {
    throw createError.Unauthorized("Invalid Credentials");
  }
});

// Register user
// post request with name, email and password
// public access

const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    for(let i=0; i<errors.array().length ; i++){
      throw createError.BadRequest(errors.array()[i].msg);
    }
  }
  // if (!errors.isEmpty()) {
  //   throw createError.BadRequest(errors.array()[0].msg);
  // }
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw createError.BadRequest("Please provide name, email and password");
  }

  // checking for user existance
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw createError.Conflict("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  await UserRole.create({
    UserId: user._id,
    Role: "tier4",
  });

  if(!user){
    throw createError.InternalServerError();
  }

  res.status(201).json({
    token: generateToken(user._id),
    success: true
  });

});

// update user
// post request with password and new password
// private access
const updateUser = asyncHandler(async (req, res) => {
  // id we are getting from auth middleware
  const id = req.id;
  const { password, newPassword } = req.body;
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

  res.status(200).json({ msg: "Password updated" , success: true});
});

// delete request
// post request and password
// private access

const deleteUser = asyncHandler(async (req, res) => {
  const id = req.id;
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
    res.status(200).json({ msg: "User deleted" , success: true});
  } else {
    throw createError.Unauthorized("Invalid Credentials");
  }
});

// user profile
// get request
// private access
const userProfile = asyncHandler(async (req, res) => {

  const user = await User.findById(req.id).select("-password");

  const role = await UserRole.findOne({UserId:req.id});
  
  if(!user){
    throw createError.NotFound("User not found");
  }
  const {name, email} = user;
  res.status(200).json({
    name: name,
    email: email,
    role: role,
  });
  
});

// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
  userProfile,
};
