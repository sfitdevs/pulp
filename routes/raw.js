const express = require("express");
const { rawPulp } = require("../controllers/raw.js");
const router = express.Router();

router
  .get("/", rawPulp)
  .post("/", rawPulp);

module.exports = router;
