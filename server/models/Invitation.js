const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
  },
  token: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
});

const Invitation = mongoose.model("Invitation", invitationSchema);

module.exports = Invitation;