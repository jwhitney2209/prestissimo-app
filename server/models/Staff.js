const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  firstName: {
      type: String,
      trim: true,
  },
  lastName: {
      type: String,
      trim: true,
  },
  role: {
    type: String,
    enum: ['admin', 'staff','parent'],
  },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});