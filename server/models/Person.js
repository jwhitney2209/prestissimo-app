const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["Student", "Teacher", "Parent", "Volunteer"],
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
    enum: ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  },
  accountBalance: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: String,
  },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
  },
  ensembles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ensemble",
    }
  ]
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
