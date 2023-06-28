const mongoose = require('mongoose');

const ensembleSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
  name: {
    type: String,
    required: true,
    trim: true,
  }
});

const Ensemble = mongoose.model('Ensemble', ensembleSchema);

module.exports = Ensemble;
