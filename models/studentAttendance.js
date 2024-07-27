const mongoose = require("mongoose");
let moment = require("moment");

let today = moment().format("DD.MM.YYYY");

const studentAttendance = new mongoose.Schema({
  studentId: mongoose.Schema.Types.ObjectId,
  groupId: { type: String },
  reason: { type: Boolean, default: false },
  date: { type: String, default: today },
});

const Attendance = mongoose.model("Attendance", studentAttendance);

module.exports = Attendance;
