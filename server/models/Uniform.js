const mongoose = require("mongoose");

const uniformSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  createdAt: {
    type: String,
  }
});

const Uniform = mongoose.model("Uniform", uniformSchema);

module.exports = Uniform;