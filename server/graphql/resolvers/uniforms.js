const Uniform = require("../../models/Uniform");
const { GraphQLError } = require("graphql");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    async getUniforms(_, args, context) {
      const user = checkAuth(context);
      try {
        const uniforms = await Uniform.find({ userId: user.id }).sort({
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
      const user = checkAuth(context);
      const newUniform = new Uniform({
        name,
        size,
        condition,
        userId: user.id,
        createdAt: new Date().toISOString(),
      });
      const uniform = await newUniform.save();
      return uniform;
    },
    async deleteUniform(_, { uniformId }, context) {
      const user = checkAuth(context);
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
