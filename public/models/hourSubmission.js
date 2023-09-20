const mongoose = require("mongoose");

const { Schema } = mongoose.Schema;

const HourSchema = new Schema({
  date: { type: Date, required: true },
  person: { type: Schema.ObjectId, ref: "user", required: true },
  numHours: { type: Number, required: true },
  reason: { type: String, required: true },
});

HourSchema.virtual("url").get(function () {
  return "/";
});
