const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  user_id: { type: String, sparse: true },
});

module.exports = mongoose.model("User", userSchema);
