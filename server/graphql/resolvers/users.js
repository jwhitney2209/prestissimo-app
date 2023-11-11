const bcrypt = require("bcryptjs");
const { signToken, AuthenticationError } = require("../../utils/check-auth");
require("dotenv").config();
const { GraphQLError } = require("graphql");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");
const User = require("../../models/User");
const UserVerification = require("../../models/UserVerification");

const { google } = require("googleapis");

const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");

const getAccessToken = async () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID, // ClientID
    process.env.CLIENT_SECRET, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  try {
    const { token } = await oauth2Client.getAccessToken();
    return token;
  } catch (error) {
    throw new Error("Error retrieving access token", error);
  }
};

const setupTransporter = async () => {
  const accessToken = await getAccessToken(); // Make sure to handle errors properly here
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.AUTH_EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
    // TURN THIS OFF IF YOU ARE NOT USING A TRUSTED CERTIFICATE - ONLY IN DEVELOPMENT WITH TRUSTED SERVER
    tls: {
      rejectUnauthorized: false,
    }
  });

  return transporter
  // other transporter setup...
};

setupTransporter().catch(console.error);

const sendVerificationEmail = async (user, host, verificationToken) => {
  let transporter = await setupTransporter();

  const verificationUrl = `${host}/verify/${verificationToken}`;

  let mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: user.email,
    subject: "Please verify your email address",
    html: `<p>Hi,</p>
    <p>Please click on the following link to verify your account:</p>
    <a href="${verificationUrl}">${verificationUrl}</a>
    <p>If you did not request this, please ignore this email.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

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
        throw new GraphQLError("We do not recognize that email/password.", { errors });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.general = "Invalid credentials";
        throw new GraphQLError("We do not recognize that email/password.", { errors });
      }

      if (!user.isVerified) {
        throw new GraphQLError("Your email address has not been verified. Please check your email for a verification link.");
      }

      const token = signToken(user);

      // Explicitly return the user data needed by the client
      return {
        token,
        user: user,
      };
    },
    async createUser(_, args) {
      const {
        email,
        password,
        confirmPassword,
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
        isVerified: false,
      });

      const savedUser = await newUser.save();
      
      const verificationToken = uuidv4();
      const newUserVerification = new UserVerification({
        userId: newUser._id,
        token: verificationToken,
      });

      await newUserVerification.save();

      // Update the host with your frontend URL
      const host = "http://localhost:3000"

      await sendVerificationEmail(savedUser, host, verificationToken);

      return {
        user: savedUser,
      };
    },
    async verifyUser(_, { token }) {
      // Find the user verification record by the token
      const userVerification = await UserVerification.findOne({ token });
      if (!userVerification) {
        throw new Error('Invalid or expired verification token');
      }
      
      // Optional: Check if the token has expired based on the createdAt and expiration logic
      const currentTime = Date.now();
      if (currentTime > new Date(userVerification.createdAt).getTime() + userVerification.expiration) {
        // Handle expired token case
        await UserVerification.findByIdAndRemove(userVerification._id); // Cleanup expired token
        throw new Error('Verification token has expired');
      }
      
      // Find the user by the id from the verification token
      const user = await User.findById(userVerification.userId);
      if (!user) {
        throw new Error('User not found');
      }
      
      if (user.isVerified) {
        throw new Error('User is already verified');
      }
      
      // Verify the user
      user.isVerified = true;
      await user.save();
      
      // Cleanup the verification token as it's no longer needed
      await UserVerification.findByIdAndRemove(userVerification._id);

      // Sign a new token for the now verified user
      const newToken = signToken(user);

      // Return the AuthPayload with the new token and the verified user
      return {
        token: newToken,
        user: user,
      };
    },
  },
};
