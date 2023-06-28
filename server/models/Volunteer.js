const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  phone: {
    type: String,
    match: [/^\d{3}-\d{3}-\d{4}$/, "Must match a phone number! ex. 123-456-7890"],
  }
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

module.exports = Volunteer;