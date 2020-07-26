const { Router } = require("express");
const router = new Router();
const nodemailer = require("nodemailer");
const Form = require("../../models/form.contactme.model");

const keys = require("../../configs/keys");

//Nodemailer Set-up

// const auth = {
//   auth: {
//     apiKey: keys.mailGun.apiKey,
//     domain: keys.mailGun.domain,
//   },
// };

// let transporter = nodemailer.createTransport(mailGun(auth));

// let transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   auth: {
//     user: keys.gmail.user,
//     password: keys.gmail.passwd,
//   },
// });

router.get("/api/contact-me", (req, res, next) => {
  res.send("Hello");
});

router.post("/api/contact-me", (req, res, next) => {
  const { subject, email, message } = req.body;
  console.log("Checking", req.body);

  if (!subject || !email || !message) {
    res.status(401).json({
      errorMessage:
        "All fields are mandatory. Please provide your subject, email and message.",
    });
    return;
  }

  const mailOptions = {
    from: dataMessage.email,
    to: keys.gmail.user,
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
    console.log("SENDING EMAIL TEST");
    error ? res.json("Error occurs") : res.json("Message sent");
  });
});

module.exports = router;
