const express = require("express");
const router = express.Router();

const {
  getNewRefreshToken,
  deleteRefreshToken,
} = require("../controllers/refreshTokenController");

router.route("/").post(getNewRefreshToken);
router.route("/").delete(deleteRefreshToken);
module.exports = router;
