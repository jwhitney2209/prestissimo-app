const Uniform = require("../../models/Uniform");
const { GraphQLError } = require("graphql");
const { authMiddleware } = require("../../utils/check-auth");

module.exports = {
  Query: {
    async uniforms(_, args, context) {
      const user = context.user;
      try {
        const uniforms = await Uniform.find({ userId: user._id })
          .sort({
            createdAt: -1,
          })
          .populate("assignedTo");
        return uniforms;
      } catch (err) {
        throw new Error(err);
      }
    },
    async uniform(_, { uniformId }, context) {
      try {
        const uniform = await Uniform.findById(uniformId).populate(
          "assignedTo"
        );

        return uniform;
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createUniform(
      _,
      { category, name, size, condition, quantity },
      context
    ) {
      const user = context.user;
      const uniforms = [];

      for (let i = 0; i < quantity; i++) {
        uniforms.push({
          category,
          name,
          size,
          condition,
          userId: user._id,
          createdAt: new Date().toISOString(),
        });
      }

      const insertedUniforms = await Uniform.insertMany(uniforms);

      return insertedUniforms;
    },
    // async deleteUniform(_, { uniformId }, context) {
    //   // delete uniform by id without auth
    //   try {
    //     const uniform = await Uniform.findByIdAndDelete(uniformId);
    //     return "Uniform deleted successfully";
    //   } catch (err) {
    //     throw new Error(err);
    //   }
    // },
    // // assign student to uniform
    // async assignStudentToUniform(_, { studentId, uniformId }, context) {
    //   const user = context.user;
    //   try {
    //     const uniform = await Uniform.findById(uniformId);
    //     if (user.id === uniform.userId) {
    //       uniform.assignedTo = studentId;
    //       await uniform.save();
    //       return uniform;
    //     } else {
    //       throw new GraphQLError("Action not allowed");
    //     }
    //   } catch (err) {
    //     throw new Error(err);
    //   }
    // },
  },
};
