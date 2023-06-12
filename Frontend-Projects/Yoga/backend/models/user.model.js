const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  age: String,
  gender: String,
  contact: String,
  fee: String,
  slot: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;
