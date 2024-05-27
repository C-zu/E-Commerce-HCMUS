const mongoose = require("mongoose");
const { stringify } = require("uuid");

const userSchema = mongoose.Schema(
  {
    user_id: Number,
    account: String,
    password: String,
    role: String,
    email: String,
    address: String,
    phone: String,
    avatar: String,
  },
  {
    Timestamp: true,
  }
);

const Users = mongoose.model("users", userSchema);
module.exports = Users;

