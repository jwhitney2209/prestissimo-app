const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  description: {
    type: String,
  },
}, {
  timestamps: true,
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
