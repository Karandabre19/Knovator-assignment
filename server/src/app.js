const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.get("/", async (req, res) => {
    res.send("started the Job importing machine");
});

module.exports = app;
