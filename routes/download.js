const express = require("express");
const { downloadPulp } = require("../controllers/pulp.js");
const router = express.Router();

router
  .get("/:key", downloadPulp);

module.exports = router;
