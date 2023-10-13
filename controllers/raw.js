const database = require("../database/database.js");
const { updateViews } = require("./pulp.js");

const rawPulp = async ({ originalUrl }, res) => {
  try {
    let [key] = originalUrl.replace("/", "").split("!");
    if (!key) return res.set("content-type", "text/plain").status(400).send("key not specified");
    let pulpData = await database.get(key);
    if (pulpData) {
      res.set("content-type", "text/plain").status(200).send(pulpData.content);
      updateViews(key);
    } else {
      res.set("content-type", "text/plain").status(404).send("pulp not found");
    }
  } catch (error) {
    res.status(500).send("internal server error");
  }
}

module.exports = { rawPulp };
