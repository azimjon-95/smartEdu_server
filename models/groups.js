const mongoose = require('mongoose');

const RegistrGrupsationSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true },
    roomCapacity: { type: Array },
    lessonTime: { type: String, required: true },
    subjects: { type: [String], required: true },
    teachers: { type: [String], required: true },
    state: { type: String, required: true },
    schedule: { type: String },
});

const Groups = mongoose.model('RegistrationGrups', RegistrGrupsationSchema);
module.exports = Groups;
