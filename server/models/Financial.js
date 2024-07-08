const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  description: {
    type: String,
  },
});

const financialSchema = new mongoose.Schema({
  balance: {
    type: Number,
    default: 0,
  },
  payments: [paymentSchema],
});

const Financial = mongoose.model("Financial", financialSchema);

module.exports = Financial;