const mongoose = require('mongoose');

const studentAttendance = new mongoose.Schema({
    studentId: mongoose.Schema.Types.ObjectId,
    status: { type: String },
    date: { type: Date, default: Date.now },
    eduId: { type: String },

});

const Attendance = mongoose.model('Attendance', studentAttendance);

module.exports = Attendance;