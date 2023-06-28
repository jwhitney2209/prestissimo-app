const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ensemble: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ensemble',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  }
});

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;
