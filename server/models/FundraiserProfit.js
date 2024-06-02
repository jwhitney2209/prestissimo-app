const mongoose = require('mongoose');

const fundraiserProfitSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
  fundraiser: { type: mongoose.Schema.Types.ObjectId, ref: 'Fundraiser' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
}, { timestamps: true });