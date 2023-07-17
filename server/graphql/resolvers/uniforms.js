const Uniform = require("../../models/Uniform");
const { GraphQLError } = require("graphql");
const { authMiddleware } = require("../../utils/check-auth");

module.exports = {
  Query: {
    async getUniforms(_, args, context) {
      const user = context.user;
      try {
        const uniforms = await Uniform.find({ userId: user._id }).sort({
          createdAt: -1,
        });
        return uniforms;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async addUniform(
      _,
      { name, size, condition },
      context
    ) {
      const user = context.user;
      const newUniform = new Uniform({
        name,
        size,
        condition,
        userId: user._id,
        createdAt: new Date().toISOString(),
      });
      const uniform = await newUniform.save();
      return uniform;
    },
    async deleteUniform(_, { uniformId }, context) {
      const user = context.user;
      try {
        const uniform = await Uniform.findById(uniformId);
        if (user.id === uniform.userId) {
          await uniform.delete();
          return "Uniform deleted successfully";
        } else {
          throw new GraphQLError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
