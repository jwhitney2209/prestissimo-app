const mongoose = require("mongoose");

const uniformSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  size: {
    type: String,
    trim: true,
  },
  condition: {
    type: String,
    enum: ["New", "Used", "Worn", "Damaged"],
  },
  quantity: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  }
});

const Uniform = mongoose.model("Uniform", uniformSchema);

module.exports = Uniform;