const { connect, Schema, model } = require("mongoose");
require("dotenv").config();

const connectToDatabase = async () => {
  await connect(process.env.DATABASE_URL);
  console.log(`Database connected successfully`);
};

connectToDatabase();

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 2,
    maxLength: 20,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 20,
  },
  lastName: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 20,
  },
  age: {
    type: Number,
    required: true,
  },
});

const accountSchema = new Schema({
  balance: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const User = model("User", userSchema);
const Account = model("Account", accountSchema);

module.exports = { User, Account };
