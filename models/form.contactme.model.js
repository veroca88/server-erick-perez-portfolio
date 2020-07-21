const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const formSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    lowercase: true,
    trim: true,
  },
  message: {
    type: String,
    required: [true, "Please enter your message"],
  },
});

module.exports = model("Form", formSchema);
