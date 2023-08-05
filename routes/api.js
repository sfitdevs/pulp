const express = require("express");
const { getPulp, createPulp, deletePulp } = require("../controllers/pulp.js");
const router = express.Router();

router
  .get("/:key", getPulp)
  .post("/", createPulp)
  .delete("/", deletePulp);

module.exports = router;