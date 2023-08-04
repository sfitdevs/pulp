const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use("/api", require("./routes/api.js"));

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(8000);
