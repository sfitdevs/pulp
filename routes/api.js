const express = require("express");
const { getPulp, createPulp, deletePulp } = require("../controllers/pulp.js");
const router = express.Router();

router
  .get("/", getPulp)
  .post("/", createPulp)
  .delete("/", deletePulp);

module.exports = router;