const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
require("dotenv").config();

const { validateRegisterInput, validateLoginInput } = require("../../utils/validators");
const User = require("../../models/User");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.SECRET,
    { expiresIn: "1h" }
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
  },
  Mutation: {
    async login(_, { email, password }) {
      const { errors, valid } = validateLoginInput(email, password);
      const user = await User.findOne({email});
      if(!user) {
        errors.general = "Email not found";
        throw new UserInputError("Email not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if(!match) {
        errors.general = "Invalid credentials";
        throw new UserInputError("Invalid credentials", { errors });
      }

      const token = generateToken(user)

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      {
        registerInput: {
          firstName,
          lastName,
          email,
          phone,
          password,
          confirmPassword,
          organization,
          street,
          city,
          state,
          zip,
        },
      },
      context,
      info
    ) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        firstName,
        lastName,
        email,
        phone,
        password,
        confirmPassword,
        organization,
        street,
        city,
        state,
        zip
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
        firstName,
        lastName,
        email,
        phone,
        password,
        organization,
        street,
        city,
        state,
        zip,
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
