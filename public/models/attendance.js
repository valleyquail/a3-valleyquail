const mongoose = require("mongoose");

const { Schema, SchemaTypes } = mongoose;

const AttendanceSchema = new Schema({
  date: { type: Date, required: true },
  person: { type: SchemaTypes.ObjectId, ref: "user", required: true },
  attended: { type: Boolean, required: true },
});

AttendanceSchema.virtual("url").get(function () {
  return "/" + this._id;
});

module.exports = mongoose.Model("Attendance", AttendanceSchema);
