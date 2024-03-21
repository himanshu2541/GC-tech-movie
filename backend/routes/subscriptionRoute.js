const express = require("express");
const { updateUserRole } = require("../controllers/subscriptionController");
const { protect } = require("../middlewares/authMiddleware");


const router = express.Router();

router.route("/updateRole").put(protect,updateUserRole);

module.exports = router;
