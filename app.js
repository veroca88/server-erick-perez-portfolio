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

app.use(
  cors({
    // origin: [process.env.FRONTEND_POINT],
    //this point is react is going to run and goes in env file too
    origin: true,
    credentials: true, //this need to setup on the frontend as well
    //in axios withCredentials: true
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/message-route/message"));
app.use("/", require("./routes/testAPI"));

module.exports = app;
