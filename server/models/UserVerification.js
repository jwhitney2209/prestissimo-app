const mongoose = require('mongoose');

const userVerificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: () => Date.now() + 3600*500, // 3600 seconds from now
    index: { expires: '1h' }, // MongoDB TTL index for 1 hour
  },
});

const UserVerification = mongoose.model('UserVerification', userVerificationSchema);

module.exports = UserVerification;