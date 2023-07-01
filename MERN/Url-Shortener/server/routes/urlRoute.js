const express = require("express");
const router = express.Router();

const {
  generateShortUrl,
  getShortURL,
} = require("../controllers/urlController");

router.get("/:shortID", getShortURL);
router.post("/", generateShortUrl);

module.exports = router;
