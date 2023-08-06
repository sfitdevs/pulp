const shortUniqueId = require("short-unique-id");
const database = require("../database/database.js");

const id = new shortUniqueId({ dictionary: "alpha_lower", length: 5 });
const ak = new shortUniqueId({ dictionary: "hex", length: 10 });

const getPulp = async (req, res) => {
  try {
    let { key } = req.params;
    if (!key) return res.send("key not specified");
    let pulpData = await database.get(key);
    if (pulpData) {
      res.send((({ password, accessKey, ...data }) => data)(pulpData));
    } else {
      res.send({ error: "pulp not found" });
    }
  } catch (error) {
    res.send({ error: "internal server error" });
  }
}

const createPulp = async (req, res) => {
  try {
    let { content, language = "txt", password = "" } = req.body;
    if (!content) return res.send({ error: "content can't be empty" });
    let size = (new TextEncoder()).encode(content).byteLength;
    let details = await database.put({ content, language, password, size, key: id(), accessKey: ak(), timestamp: Date.now(), views: 0 });
    res.send((({ password, ...data }) => data)(details));
  } catch (error) {
    res.send({ error: "internal server error" });
  }
}

const deletePulp = async (req, res) => {
  try {
    let { accessKey } = req.body;
    if (!accessKey) return res.send("accessKey not specified");
    let { items, count } = await database.fetch({ accessKey });
    if (count) {
      await database.delete(items[0].key);
      res.send("pulp deleted successfully");
    } else {
      res.send("pulp not found");
    }
  } catch (error) {
    res.send({ error: "internal server error" });
  }
}

module.exports = { getPulp, createPulp, deletePulp };
