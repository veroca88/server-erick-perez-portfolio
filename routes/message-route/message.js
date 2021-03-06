require("dotenv").config();
const { Router } = require("express");
const router = new Router();
const nodemailer = require("nodemailer");
const mailGunTrans = require("nodemailer-mailgun-transport");
const Form = require("../../models/form.contactme.model");

// const keys = require("../../configs/keys");

//Nodemailer Set-up

const auth = {
  auth: {
    api_key: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
};

let transporter = nodemailer.createTransport(mailGunTrans(auth));

router.post("/api/contact-me", (req, res, next) => {
  const { subject, email, message } = req.body;
  console.log("Checking", req.body);
  const dataMessage = req.body;

  if (!subject || !email || !message) {
    res.status(401).json({
      errorMessage:
        "All fields are mandatory. Please provide your subject, email and message.",
    });
    return;
  }
  const mailOptions = {
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
  };

  return transporter.sendMail(mailOptions, (error, data) => {
    error ? res.json("Error occurs") : res.json("Message sent");
  });
});

module.exports = router;
