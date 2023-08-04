require("dotenv").config();
const { Deta } = require("deta");
const deta = Deta(process.env.DETA);
const db = deta.Base(process.env.BASE);

module.exports = db;
