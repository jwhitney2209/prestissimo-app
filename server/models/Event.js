const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  cost: {
    type: Number,
  },
  participants: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
      amountPaid: {
        type: Number,
        default: 0,
      },
      balanceOwed: {
        type: Number,
      },
    },
  ],
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
