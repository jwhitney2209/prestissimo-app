const Class = require("../../models/Class");

module.exports = {
  Query: {
    async getClasses(_, args, context) {
      const user = context.user;;
      try {
        const classes = await Class.find({ userId: user.id }).sort({
          createdAt: -1,
        });
        return classes;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getClass(_, { classId }) {
      try {
        const class = await Class.findById(classId);
        if (class) {
          return class;
        } else {
          throw new Error("Class not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async addClass(_, { name }, context) {
      const user = context.user;
      const newClass = new Class({
        name,
        userId: user._id,
        createdAt,
      });
      const class = await newClass.save();
      return class;
    },
    async deleteClass(_, { classId }, context) {
      const class = await Class.findByIdAndDelete({ classId });
      return class;
    },
    async updateClass(_, { classId, name }, context) {
      try {
        const class = await Class.findOneAndUpdate(
          { _id: classId },
          { $set: { name: name } },
          { new: true }
        );
        return class;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
