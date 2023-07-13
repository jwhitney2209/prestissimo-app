const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
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
  ],
  uniforms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Uniform",
    }
  ]
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
