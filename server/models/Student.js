const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  userId: {
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
    lowercase: true,
  },
  phone: {
    type: String,
  },
  grade: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  instrument: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instrument",
  },
  classes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    }
  ],
  uniforms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Uniform",
    }
  ]
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
