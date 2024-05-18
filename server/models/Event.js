const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
  },
  totalCost: {
    type: Number,
  },
  eventDate: {
    type: Date,
  },
  profitSplit: {
    vendorPercentage: { type: Number, default: 0},
    studentPercentage: { type: Number, default: 0},
    schoolPercentage: { type: Number, default: 0},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
