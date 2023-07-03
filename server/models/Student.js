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
  schoolId: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  age: {
    type: String,
    trim: true,
  },
  grade: {
    type: String,
    required: true,
    enum: ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
  },
  createdAt: {
    type: String,
  }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
