require("dotenv").config();
const express = require("express");
const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/api", require("./routes/api.js"));

app.get("/", (req, res) => {
    res.send({ message: "hello from pulp" });
})

app.listen(parseInt(PORT), () => {
    console.log(`server started at port ${PORT}`);
});
