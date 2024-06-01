const bcrypt = require("bcryptjs");
const { signToken, AuthenticationError } = require("../../utils/check-auth");
require("dotenv").config();
const { GraphQLError } = require("graphql");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");
const User = require("../../models/User");
const Program = require("../../models/Program");
const Invitation = require("../../models/Invitation");
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
    },
  });

  return transporter;
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

const sendInvitationEmail = async (email, host, token) => {
  let transporter = await setupTransporter();

  const invitationUrl = `${host}/accept-invitation/${token}`;

  let mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "You've been invited to join a program",
    html: `<p>Hi,</p>
    <p>You've been invited to join a program. Click the link below to accept the invitation:</p>
    <a href="${invitationUrl}">${invitationUrl}</a>
    <p>If you did not request this, please ignore this email.</p>`,
  };

  await transporter.sendMail(mailOptions);
};
module.exports = {
  Query: {
    // async users() {
    //   try {
    //     const users = await User.find();
    //     return users;
    //   } catch (err) {
    //     throw new Error(err);
    //   }
    // },
    // async user(_, { userId }) {
    //   try {
    //     const user = await User.findById(userId);
    //     if (user) {
    //       return user;
    //     } else {
    //       throw new Error("User not found");
    //     }
    //   } catch (err) {
    //     throw new Error(err);
    //   }
    // },
    // async currentUserProgram(_, __, context) {
    //   const user = context.user
    //   if (!user) {
    //     throw new AuthenticationError("You must be logged in to view this page.");
    //   }
    //   const currentUser = await User.findById(user._id).populate("program");
    //   if (!currentUser) {
    //     throw new Error("User not found");
    //   }
    //   return currentUser.program;
    // }
  },
  Mutation: {
    async loginUser(_, { email, password }) {
      const { errors, valid } = validateLoginInput(email, password);

      if (!valid) {
        throw new GraphQLError("Errors", { errors });
      }

      const user = await User.findOne({ email }).populate("program");

      if (!user) {
        errors.general = "Invalid credentials";
        throw new GraphQLError("We do not recognize that email/password.", {
          errors,
        });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.general = "Invalid credentials";
        throw new GraphQLError("We do not recognize that email/password.", {
          errors,
        });
      }

      if (!user.isVerified) {
        throw new GraphQLError(
          "Your email address has not been verified. Please check your email for a verification link."
        );
      }

      const token = signToken(user);

      // Explicitly return the user data needed by the client
      return {
        token,
        user: {
          id: user._id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isVerified: user.isVerified,
          program: user.program
            ? {
                id: user.program._id.toString(),
                name: user.program.name,
                school: user.program.school,
                // Add additional necessary program fields here
              }
            : null,
        },
      };
    },
    // createUserAndProgram will be called when a user creates a new account and program.
    // The function will create a new Program document and a new User document in the database.
    // The function will also create a new UserVerification document to store the verification token.
    // The function will send an email to the user with a link to verify their email address.
    // The user will provide the email, password, confirmPassword, firstName, lastName, programName, and school.
    async createUserAndProgram(_, args, context) {
      const {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        programName,
        school,
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

      const newProgram = new Program({
        name: programName,
        school: school,
        users: [],
      });
      await newProgram.save();

      // Create a new user instance with the hashed password
      const newUser = new User({
        email,
        password, // Password will be hashed by the pre-save middleware
        firstName,
        lastName,
        role: "admin", // default the creator as admin
        program: newProgram._id,
        isVerified: false,
      });
      await newUser.save();

      newUser.id = newUser._id.toString();
      // add user to the program's user list
      newProgram.users.push(newUser.id);
      await newProgram.save();

      // Retrieve the program with populated user data
      const populatedProgram = await Program.findById(newProgram._id).populate(
        "users"
      );

      const verificationToken = uuidv4();
      const newUserVerification = new UserVerification({
        userId: newUser._id,
        token: verificationToken,
      });

      await newUserVerification.save();

      // Update the host with your frontend URL
      const host = "http://localhost:3000";

      await sendVerificationEmail(newUser, host, verificationToken);

      return {
        user: {
          id: newUser._id.toString(),
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          role: newUser.role,
          isVerified: newUser.isVerified,
        },
        program: {
          id: populatedProgram._id.toString(),
          name: populatedProgram.name,
          school: populatedProgram.school,
          users: populatedProgram.users.map((user) => ({
            id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            isVerified: user.isVerified,
          })),
          students: [], // Assuming no students initially
        },
      };
    },
    // verifyUser will be called when a user clicks on the verification link sent to their email.
    // The function will verify the user and sign a new token for the user.
    // The user will provide the verification token.
    // The function will find the UserVerification record by the token,
    // check if the token has expired, find the user by the id from the verification token,
    // verify the user, cleanup the verification token, sign a new token for the now verified user,
    // and return the AuthPayload with the new token and the verified user.
    async verifyUser(_, { token }) {
      // Find the user verification record by the token
      const userVerification = await UserVerification.findOne({ token });
      if (!userVerification) {
        throw new Error("Invalid or expired verification token");
      }

      // Optional: Check if the token has expired based on the createdAt and expiration logic
      const currentTime = Date.now();
      if (
        currentTime >
        new Date(userVerification.createdAt).getTime() +
          userVerification.expiration
      ) {
        // Handle expired token case
        await UserVerification.findByIdAndRemove(userVerification._id); // Cleanup expired token
        throw new Error("Verification token has expired");
      }

      // Find the user by the id from the verification token
      const user = await User.findById(userVerification.userId);
      if (!user) {
        throw new Error("User not found");
      }

      if (user.isVerified) {
        throw new Error("User is already verified");
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
    // sendInvitation will be called when a user (admin) sends an invitation to another user to join the program.
    // The function will create a new Invitation document in the database and send an email to
    // the invited user with a link to accept the invitation. The admin will provide the email,
    // programId, and role of the invited user.
    async sendInvitation(_, { email, programId, role }, context) {
      try {
        const program = await Program.findById(programId);
        if (!program) {
          return {
            success: false,
            message: "Program not found",
            invitation: null,
          };
        }

        const verificationToken = uuidv4();
        const newInvitation = new Invitation({
          email,
          program: programId,
          token: verificationToken,
          role,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        });

        await newInvitation.save();

        // Update the host with your frontend URL
        const host = "http://localhost:3000";

        await sendInvitationEmail(email, host, newInvitation.token);

        return {
          success: true,
          message: "Invitation sent",
          invitation: newInvitation,
        };
      } catch (error) {
        return { success: false, message: error.message, invitation: null };
      }
    },
    // registerUserWithToken will be called when a user accepts an invitation to join a program.
    // The function will validate the invitation token, check if the email is already registered,
    // create a new user, and remove the invitation from the database. The user will provide the token,
    // email, password, firstName, and lastName.
    async registerUserWithToken(
      _,
      { token, email, password, firstName, lastName }
    ) {
      try {
        // Validate the invitation token
        const invitation = await Invitation.findOne({ token });
        if (!invitation || new Date() > invitation.expires) {
          throw new Error("Invalid or expired invitation token");
        }

        // check if email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error("Email already registered");
        }

        // create the user
        const newUser = new User({
          email,
          password,
          firstName,
          lastName,
          role: invitation.role,
          program: invitation.program,
          isVerified: true,
        });

        const savedUser = await newUser.save();

        // Update the program's user list
        const program = await Program.findById(invitation.program);
        if (!program) {
          throw new Error("Program not found");
        }
        program.users.push(savedUser._id); // Add the new user's ID to the program's user list
        await program.save();

        await Invitation.findByIdAndRemove(invitation._id);

        const newToken = signToken(savedUser);

        return {
          token: newToken,
          user: savedUser,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
