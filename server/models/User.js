const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    trim: true,
  },
  city: {
      type: String,
      trim: true,
  },
  state: {
      type: String,
      trim: true,
  },
  zip: {
      type: String,
      trim: true,
  },
});

const schoolSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    trim: true,
  },
  schoolAddress: addressSchema,
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  firstName: {
      type: String,
      trim: true,
  },
  lastName: {
      type: String,
      trim: true,
  },
  school: schoolSchema,
  address: addressSchema,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
})

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

module.exports = User;
