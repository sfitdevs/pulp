const express = require("express");
const { getPulp, createPulp, deletePulp } = require("../controllers/pulp.js");
const router = express.Router();

router
  .get("/:key", getPulp)
  .post("/", createPulp)
  .delete("/", deletePulp)
  .put("/:key")

module.exports = router;
