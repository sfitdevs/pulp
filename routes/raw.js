const express = require("express");
const { rawPulp } = require("../controllers/raw.js");
const router = express.Router();

router
  .get("/:key", rawPulp)
  .post("/:key", rawPulp);

module.exports = router;
