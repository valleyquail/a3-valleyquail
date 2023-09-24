const mongoose = require("mongoose");

const { Schema, SchemaTypes } = mongoose;

const HourSchema = new Schema({
  date: { type: Date, required: true },
  person: { type: SchemaTypes.ObjectId, ref: "user", required: true },
  numHours: { type: Number, required: true },
  reason: { type: String, required: true },
});

HourSchema.virtual("url").get(function () {
  return "/" + this._id;
});

module.exports = mongoose.Model("Hours", HourSchema);
