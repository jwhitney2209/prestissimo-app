const Inventory = require('../../models/Inventory');
const checkAuth = require('../../utils/check-auth');
module.exports = {
  Query: {
    async getItems() {
      try {
        const items = await Inventory.find().sort({ createdAt: -1 });
        return items;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getItem(_, { itemId }) {
      try {
        const item = await Inventory.findById(itemId);
        if (item) {
          return item;
        } else {
          throw new Error('Item not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createItem(
      _,
      {
        itemInput: {
          name,
          size,
          quantity,
        }
      },
      context
    ) {
      const user = checkAuth(context);
      const newItem = new Inventory({
        name,
        size,
        quantity,
        userId: user.id,
        createdAt: new Date().toISOString(),
      });
      const item = await newItem.save();
      return item;
    },
    async deleteItem(_, { itemId }, context) {
      const user = checkAuth(context);
      try {
        const item = await Inventory.findById(itemId);
        const itemUserId = item.userId.toHexString();
        if (user.id === itemUserId) {
          await item.deleteOne();
          return 'Item deleted successfully';
        } else {
          throw new Error('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  }
}