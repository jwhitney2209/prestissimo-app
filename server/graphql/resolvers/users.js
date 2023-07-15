const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");
const User = require("../../models/User");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
    },
    process.env.SECRET,
    { expiresIn: "3d" }
  );
}

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

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(_, { email, password, confirmPassword }, context, info) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // Make sure user doesnt already exist
      const user = await User.findOne({ email });
      if (user) {
        throw new UserInputError("Email is already in use.", {
          errors: {
            email: "This email is already in use.",
          },
        });
      }
      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
