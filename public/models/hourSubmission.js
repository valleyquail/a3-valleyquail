const mongoose = require("mongoose");

const { Schema, SchemaTypes } = mongoose;

const HourSchema = new Schema({
  date: { type: Date, required: true },
  person: { type: SchemaTypes.ObjectId, ref: "User", required: true },
  numHours: { type: Number, required: true },
  reason: { type: String, required: true },
});

HourSchema.virtual("url").get(function () {
  return "/";
});

module.exports = mongoose.model("hours", HourSchema);
