const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    trim: true,
  },
  city: {
      type: String,
      trim: true,
  },
  state: {
      type: String,
      trim: true,
  },
  zip: {
      type: String,
      trim: true,
  },
});

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  school: {
    type: String,
    required: true,
    trim: true,
  },
  address: addressSchema,
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  }]
});

const Program = mongoose.model("Program", programSchema);

module.exports = Program;