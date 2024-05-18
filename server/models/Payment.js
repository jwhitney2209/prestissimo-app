const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  method: {
    type: String,
    enum: ['cash', 'check', 'credit', 'debit', 'paypal', 'venmo', 'cashapp', 'other'],
    required: true,
  },
  type: {
    type: String, enum: ['payment', 'refund', 'fundraiser', 'trip', 'uniform', 'other']
  },
  notes: {
    type: String,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
