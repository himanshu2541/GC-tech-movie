const express = require("express");
const { getAllUsers } = require("../controllers/adminController");
const { adminAuthProtect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/get-users").get(adminAuthProtect,getAllUsers);

module.exports = router;
