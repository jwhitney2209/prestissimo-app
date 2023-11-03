const Class = require("../../models/Class");

module.exports = {
  Query: {
    async classes(_, args, context) {
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
        const singleClass = await Class.findById(classId);
        if (singleClass) {
          return singleClass;
        } else {
          throw new Error("Class not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createClass(_, { input }, context) {
      if (!context.user) {
        throw new Error('You must be logged in to create a class.');
      }
    
      const newClass = new Class({
        userId: context.user._id,
        name: input.name,
        // createdAt is automatically set by Mongoose
      });
    
      const savedClass = await newClass.save();
    
      // Populate the 'user' field if needed when returning the result
      await savedClass.populate('userId');
    
      return {
        id: savedClass._id.toString(),
        user: savedClass.userId,
        name: savedClass.name,
        createdAt: savedClass.createdAt.toISOString(),
      };
    },
    // async deleteClass(_, { classId }, context) {
    //   const singleClass = await Class.findByIdAndDelete({ classId });
    //   return singleClass;
    // },
    // async updateClass(_, { classId, name }, context) {
    //   try {
    //     const singleClass = await Class.findOneAndUpdate(
    //       { _id: classId },
    //       { $set: { name: name } },
    //       { new: true }
    //     );
    //     return singleClass;
    //   } catch (err) {
    //     throw new Error(err);
    //   }
    // },
  },
};
