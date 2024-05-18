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
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  assignedTo: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
      date_assigned: { type: Date, default: Date.now },
    },
  ],
});

const Uniform = mongoose.model("Uniform", uniformSchema);

module.exports = Uniform;
