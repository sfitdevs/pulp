const shortUniqueId = require("short-unique-id");

const id = new shortUniqueId({ dictionary: "alpha_lower", length: 5 });

const getPulp = (req, res) => {
  try {
    let { code, language = "txt", password = "" } = req.body;
    if (!code) return res.send({ error: "property `code` cannot be empty" });
    res.send({ code, language, password, key: id(), timestamp: Date.now() });
  } catch (error) {
    res.send({ error: "internal server error" });
  }
}

const createPulp = (req, res) => {
  try {
    let { code, language = "txt", password = "" } = req.body;
    if (!code) return res.send({ error: "property `code` cannot be empty" });
    res.send({ code, language, password, key: id(), timestamp: Date.now() });
  } catch (error) {
    res.send({ error: "internal server error" });
  }
}

const deletePulp = (req, res) => {
  try {
    let { code, language = "txt", password = "" } = req.body;
    if (!code) return res.send({ error: "property `code` cannot be empty" });
    res.send({ code, language, password, key: id(), timestamp: Date.now() });
  } catch (error) {
    res.send({ error: "internal server error" });
  }
}

module.exports = { getPulp, createPulp, deletePulp };
