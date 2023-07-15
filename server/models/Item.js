const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: String,
  },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;