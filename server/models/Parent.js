const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
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
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  }],
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
  },
});

const Parent = mongoose.model("Parent", parentSchema);

module.exports = Parent;