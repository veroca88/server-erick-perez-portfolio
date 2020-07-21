const nodemailer = require("nodemailer");

const keys = require("./keys");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: keys.gmail.user,
    pass: keys.gmail.passwd,
  },
});
