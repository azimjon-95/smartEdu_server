const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true },
    roomCapacity: { type: Number },
    lessonTime: { type: String, required: true },
    subjects: { type: [String], required: true },
    teachers: { type: [String], required: true },
});

const Groups = mongoose.model('Registration', RegistrationSchema);

module.exports = Groups;
