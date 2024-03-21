const express = require("express");
const {
  updateUser,
  deleteUser,
  loginUser,
  registerUser,
  userProfile,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");
const {
  createEmailChain,
  createPasswordChain,
  createNameChain,
} = require("../middlewares/validationChains");

const router = express.Router();

router
  .route("/login")
  .post(createEmailChain(), createPasswordChain(), loginUser);

router
  .route("/register")
  .post(createNameChain(), createEmailChain(), createPasswordChain(), registerUser);

router
  .route("/")
  .patch(protect, updateUser)
  .delete(protect, deleteUser)
  .get(protect, userProfile);

module.exports = router;
