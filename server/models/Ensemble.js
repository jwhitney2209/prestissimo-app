const mongoose = require('mongoose');

const ensembleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  userEmail: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: String,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
    }
  ]
});

const Ensemble = mongoose.model('Ensemble', ensembleSchema);

module.exports = Ensemble;