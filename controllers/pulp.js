const shortUniqueId = require("short-unique-id");
const database = require("../database/database.js");

const id = new shortUniqueId({ dictionary: "alpha_lower", length: 5 });
const ak = new shortUniqueId({ dictionary: "hex", length: 10 });

const getPulp = async (req, res) => {
  try {
    let { key } = req.params;
    if (!key) return res.status(400).send({ message: "key not specified" });
    let pulpData = await database.get(key);
    if (pulpData) {
      res.status(200).send((({ password, accessKey, ...data }) => data)(pulpData));
    } else {
      res.status(404).send({ message: "pulp not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
}

const createPulp = async (req, res) => {
  try {
    let { content, language = "txt", description = "", password = "" } = req.body;
    if (!content) return res.status(400).send({ message: "content can't be empty" });
    let size = (new TextEncoder()).encode(content).byteLength;
    let details = await database.put({ content, description, language, password, size, key: id(), accessKey: ak(), timestamp: Date.now(), views: 0 });
    res.status(200).send((({ password, ...data }) => data)(details));
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
}

const deletePulp = async (req, res) => {
  try {
    let { accessKey } = req.body;
    if (!accessKey) return res.status(400).send({ message: "accessKey not specified" });
    let { items, count } = await database.fetch({ accessKey });
    if (count) {
      await database.delete(items[0].key);
      res.status(200).send({ message: "pulp deleted successfully" });
    } else {
      res.status(404).send({ message: "pulp not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
}

const downloadPulp = async (req, res) => {
  try {
    let { key } = req.params;
    if (!key) return res.set("content-type", "text/plain").status(400).send("key not specified");
    let pulpData = await database.get(key);
    if (pulpData) {
      res.set({ "content-type": "text/plain", "content-disposition": `attachment;filename=${pulpData.key}.${pulpData.language}` }).status(200).send(pulpData.content);
    } else {
      res.set("content-type", "text/plain").status(404).send("pulp not found");
    }
  } catch (error) {
    res.status(500).send("internal server error");
  }
}

const updateViews = async (key) => {
  try {
    const data = await database.get(key);
    if (data.content) await database.put({ ...data, views: parseInt(data.views) + 1 });
  } catch (error) {
    console.log("error in updateViews");
  }
}

module.exports = { getPulp, createPulp, deletePulp, downloadPulp, updateViews };
