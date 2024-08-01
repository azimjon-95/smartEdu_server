const mongoose = require("mongoose");
let moment = require("moment");

let today = moment().format("DD.MM.YYYY");

const studentAttendance = new mongoose.Schema({
  studentId: mongoose.Schema.Types.ObjectId,
  status: { type: String },
  date: { type: Date, default: Date.now },
  eduId: { type: String },

});

const Attendance = mongoose.model("Attendance", studentAttendance);

module.exports = Attendance;
