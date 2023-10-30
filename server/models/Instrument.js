const mongoose = require("mongoose");

const instrumentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Instrument = mongoose.model("Instrument", instrumentSchema);

module.exports = Instrument;