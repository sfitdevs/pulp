const shortUniqueId = require("short-unique-id");
// const db = require("../db/db.js");

const id = new shortUniqueId({ dictionary: "alpha_lower", length: 5 });
const ak = new shortUniqueId({ dictionary: "hex", length: 10 });

const getPulp = (req, res) => {
  try {
    let { key } = req.body;
    // fetch the pulp from db and show
  } catch (error) {
    res.send({ error: "internal server error" });
  }
}

const createPulp = async (req, res) => {
  try {
    let { code, language = "txt", password = "" } = req.body;
    if (!code) return res.send({ error: "property `code` cannot be empty" });
    // put into database
    // let details = await db.put({ code, language, password, key: id(), timestamp: Date.now() });
    let details = { code, language, password, key: id(), accessKey: ak(), timestamp: Date.now() };
    res.send((({ password, ...o }) => o)(details));
  } catch (error) {
    res.send({ error: "internal server error" });
  }
}

const deletePulp = (req, res) => {
  try {
    let { accessKey } = req.body;
    if (!accessKey) return res.send("accessKey not specified");
    // find by accessKey in database and delete particular pulp
  } catch (error) {
    res.send({ error: "internal server error" });
  }
}

module.exports = { getPulp, createPulp, deletePulp };
