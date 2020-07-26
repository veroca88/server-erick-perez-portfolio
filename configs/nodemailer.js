const nodemailer = require("nodemailer");

const keys = require("./keys");

let transporter = nodemailer.createTransport({
  service: "smtp.gmail.com",
  auth: {
    user: keys.gmail.user,
    pass: keys.gmail.passwd,
  },
});
