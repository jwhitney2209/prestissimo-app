const bcrypt = require("bcryptjs");
const { signToken, AuthenticationError } = require("../../utils/check-auth");
require("dotenv").config();
const { GraphQLError } = require("graphql");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");
const User = require("../../models/User");

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getUser(_, { userId }) {
      try {
        const user = await User.findById(userId);
        if (user) {
          return user;
        } else {
          throw new Error("User not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async login(_, { email, password }) {
      const { errors, valid } = validateLoginInput(email, password);
      const user = await User.findOne({ email });
      if (!user) {
        errors.general = "Email not found";
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Invalid credentials";
      }

      const token = signToken(user);

      return {
        ...user._doc,
        _id: user._id,
        token,
      };
    },
    async register(_, { email, password, confirmPassword }) {
      const { valid, errors } = validateRegisterInput(
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new GraphQLError("Errors", { errors });
      }

      const checkUser = await User.findOne({ email });

      if (checkUser) {
        throw new GraphQLError("This email is already taken.");
      }

      const user = await User({
        email,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await user.save();

      const token = signToken(res);

      return {
        ...res._doc,
        _id: res._id,
        token,
      };
    },
  },
};
