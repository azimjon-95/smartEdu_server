const mongoose = require('mongoose');

const payStudentStorySchema = new mongoose.Schema({
    fullName: { type: String },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    studentFees: { type: Number }, // Studentni qilgan to'lovi
    studentFeesDate: { type: Date }, // Student to'lov qilgan sana
    studentFeesTime: { type: String }, // Student to'lov qilgan soat
    month: { type: String },
    subject: { type: [String], required: true },
});

const PayStudentStory = mongoose.model('PayStudentStory', payStudentStorySchema);

module.exports = PayStudentStory;

