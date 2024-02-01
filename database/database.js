require("dotenv").config();
const { Deta } = require("deta");
const deta = Deta();
const db = deta.Base("pulp");

module.exports = db;
