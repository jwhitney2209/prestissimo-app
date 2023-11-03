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
    async users() {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
    async user(_, { userId }) {
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
    async loginUser(_, { email, password }) {
      const { errors, valid } = validateLoginInput(email, password);

      if (!valid) {
        throw new GraphQLError("Errors", { errors });
      }

      const user = await User.findOne({ email });

      if (!user) {
        errors.general = "Invalid credentials";
        throw new GraphQLError("Errors", { errors });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.general = "Invalid credentials";
        throw new GraphQLError("Errors", { errors });
      }

      const token = signToken(user);

      // Explicitly return the user data needed by the client
      return {
        token,
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          // add other required User fields if they are supposed to be returned upon login
          // make sure to include the `school` and `address` if they are required fields
        },
      };
    },
    async createUser(_, args) {
      const {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        school,
        address,
      } = args;

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

      // Create a new user instance with the hashed password
      const newUser = new User({
        email,
        password, // Password will be hashed by the pre-save middleware
        firstName,
        lastName,
        school: {
          schoolName: school.schoolName,
          schoolAddress: {
            street: school.schoolAddress.street,
            city: school.schoolAddress.city,
            state: school.schoolAddress.state,
            zip: school.schoolAddress.zip,
          },
        },
        address: {
          street: address.street,
          city: address.city,
          state: address.state,
          zip: address.zip,
        },
      });

      const savedUser = await newUser.save();

      const token = signToken(savedUser);

      return {
        user: savedUser,
        token
      };
    },
  },
};
