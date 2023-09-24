const { MongoDriverError } = require("mongodb");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.Model("User", user);
