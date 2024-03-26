const express = require("express");

const { verifyAccessToken } = require("../helpers/jwt_helper");
const semanticSearchResults = require("../controllers/plotSearchController");
const fuzzySearchResults = require("../controllers/fuzzySearchController");

const router = express.Router();

router.route("/vector").post(verifyAccessToken, semanticSearchResults);
router.route("/fuzzy").get(verifyAccessToken, fuzzySearchResults);

module.exports = router;
