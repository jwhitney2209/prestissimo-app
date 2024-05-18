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
  schoolId: {
    type: String,
  },
  grade: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  phone: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
  }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
