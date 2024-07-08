const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
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
    required: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
  },
  parents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parent",
  }],
  financial: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Financial",
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
