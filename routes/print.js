const express = require("express");
const router = express.Router();
const database = require("../database/database.js");

router.get("/:key", async (req, res) => {
  try {
    let { key } = req.params;
    if (!key) return res.set("content-type", "text/plain").status(400).send("key not specified");
    let pulpData = await database.get(key);
    if (!pulpData) return res.set("content-type", "text/plain").status(404).send("pulp not found");
    let { content, language } = pulpData;
    res.render("print", { content, language });
  } catch (error) {
    res.status(500).send("internal server error");
  }
})

module.exports = router;
