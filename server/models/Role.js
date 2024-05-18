const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['admin', 'staff','parent'],
  },
  permissions: [String],
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
  },
});