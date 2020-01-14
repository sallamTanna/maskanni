const express = require("express");

const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const compresion = require("compression");
const helmet = require("compression");
const router = require("./router");

const middlewares = [helmet(), compresion(), express.json(), express.urlencoded()];

require("dotenv").config();

app.use(cookieParser());
app.use(middlewares);
app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.use("/v1", router);

app.set("PORT", process.env.PORT || 9000);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.get((req, res, next) => {
  res.status(404).send("404 not found");
});


app.use((err, req, res, next) => {
  if (err.isBoom) {
    return res.status(err.output.statusCode).json({
      error: {
        statusCode: err.output.statusCode,
        msg: err.output.payload.message
      }
    });
  }
});

module.exports = app;
