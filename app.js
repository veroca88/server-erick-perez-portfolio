require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();

// require database configuration
require("./configs/db.configs");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", CLIENT_ORIGIN);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   })
// );

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/message-route/message"));
app.use("/", require("./routes/testAPI"));

module.exports = app;
