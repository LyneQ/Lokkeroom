const express = require("express");
const bodyParser = require('body-parser');

const authRoutes = require("./routes/authRoutes.js");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('hola');
})

authRoutes(app);

app.listen(port, '',() => {
    console.log('Exemple app');
})
