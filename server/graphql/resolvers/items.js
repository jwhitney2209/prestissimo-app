const Item = require("../../models/Item");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    async getItems(_, arts, context) {
      const user = checkAuth(context);
      try {
        const items = await Item.find({ userId: user.id }).sort({
          createdAt: -1,
        });
        return items;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getItem(_, { itemId }) {
      try {
        const item = await Item.findById(itemId);
        if (item) {
          return item;
        } else {
          throw new Error("Item not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async addItem(
      _,
      { name, description, quantity },
      context
    ) {
      const user = checkAuth(context);
      const newItem = new Item({
        name,
        description,
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
        const item = await Item.findById(itemId);
        const itemUserId = item.userId.toHexString();
        if (user.id === itemUserId) {
          await item.deleteOne();
          return `${item.name} deleted successfully.`;
        } else {
          throw new Error("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async updateItem(
      _,
      {
        itemId,
        itemInput: { name, description, modelNumber, serialCode, quantity },
      },
      context
    ) {
      const item = (
        await Item.updateOne(
          { _id: itemId },
          {
            name: name,
            description: description,
            modelNumber: modelNumber,
            serialCode: serialCode,
            quantity: quantity,
          }
        )
      ).modifiedCount;
      return item;
    },
  },
};
