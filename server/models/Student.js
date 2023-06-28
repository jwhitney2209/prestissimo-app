const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
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
  studentId: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  phone: {
    type: String,
    match: [/^\d{3}-\d{3}-\d{4}$/, "Must match a phone number! ex. 123-456-7890"],
  },
  age: {
    type: Number,
    trim: true,
  },
  grade: {
    type: String,
    required: true,
    enum: ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
  },
  ensemble: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ensemble",
  },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
  }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
