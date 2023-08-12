const express = require("express");
const bytes = require("bytes");
const relativeDate = require("relative-date");
const router = express.Router();
const database = require("../database/database.js");
const { updateViews } = require("../controllers/pulp.js");

router.get("/:key", async (req, res) => {
  try {
    let { key } = req.params;
    if (!key) return res.set("content-type", "text/plain").status(400).send("key not specified");
    let pulpData = await database.get(key);
    if (!pulpData) return res.set("content-type", "text/plain").status(404).send("pulp not found");
    let { content, views, timestamp, size, language } = pulpData;
    res.render("pulp", { content, views, language, key, date: relativeDate(timestamp), size: bytes.format(size) });
    updateViews(key);
  } catch (error) {
    res.status(500).send("internal server error");
  }
})

module.exports = router;
