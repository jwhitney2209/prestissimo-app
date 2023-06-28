const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, 'Must match an email address!']
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{3}-\d{3}-\d{4}$/, 'Must match a phone number! ex. 123-456-7890']
  },
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;