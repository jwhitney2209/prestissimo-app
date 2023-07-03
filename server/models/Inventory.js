const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  size: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: String,
  },
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;