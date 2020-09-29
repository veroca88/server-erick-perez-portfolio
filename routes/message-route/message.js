require("dotenv").config();
const { Router } = require("express");
const router = new Router();
const nodemailer = require("nodemailer");
const mailGunTrans = require("nodemailer-mailgun-transport");
const Form = require("../../models/form.contactme.model");

// const keys = require("../../configs/keys");

//Nodemailer Set-up

// const auth = {
//   auth: {
//     api_key: process.env.MAILGUN_KEY,
//     domain: process.env.MAILGUN_DOMAIN,
//   },
// };
// proxy: 'http://user:pass@localhost:8080' // optional proxy, default is false

// let transporter = nodemailer.createTransport(mailGunTrans(auth));

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    password: process.env.GMAIL_KEY,
  },
});

router.get("/contact-me", (req, res, next) => {
  res.send("Hello");
});

router.post("/contact-me", (req, res, next) => {
  const { subject, email, message } = req.body;
  // console.log("Checking", req.body);
  const dataMessage = req.body;

  if (!subject || !email || !message) {
    res.render({
      errorMessage:
        "All fields are mandatory. Please provide your subject, email and message.",
    });
    return;
  }

  return transporter.sendMail(
    {
      from: dataMessage.email,
      to: process.env.GMAIL_USER,
      subject: `Message from ${dataMessage.email}`,
      html: `
        <div style="text-align: center;">
          <h2>👋 Hi Erick you have a new Message!! 👋</h2>
          <h2>From: ${dataMessage.email}</h2>
          <h2>Subject: ${dataMessage.subject}</h2>
          <p>${dataMessage.message}</p>
        </div>
      `,
    },
    (err, info) => {
      console.log("info :", info);
      console.log("error :", err);
    }
  );
});

module.exports = router;

// const mailOptions = {
//   from: dataMessage.email,
//   to: process.env.GMAIL_USER,
//   subject: `Message from ${dataMessage.email}`,
//   html: `
//     <div style="text-align: center;">
//       <h2>👋 Hi Erick you have a new Message!! 👋</h2>
//       <h2>From: ${dataMessage.email}</h2>
//       <h2>Subject: ${dataMessage.subject}</h2>
//       <p>${dataMessage.message}</p>
//     </div>
//   `,
// };

// return transporter.sendMail(mailOptions, (error, data) => {
