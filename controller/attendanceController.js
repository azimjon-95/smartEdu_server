const Attendance = require('../models/studentAttendance');

// Create a new attendance record
exports.createAttendance = async (req, res) => {
    try {
        const newAttendance = new Attendance(req.body);
        await newAttendance.save();
        res.status(201).json(newAttendance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all attendance records
exports.getAllAttendances = async (req, res) => {
    try {
        const attendances = await Attendance.find().populate('studentId');
        res.status(200).json(attendances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single attendance record by ID
exports.getAttendanceById = async (req, res) => {
    try {
        const attendance = await Attendance.findById(req.params.id).populate('studentId');
        if (!attendance) return res.status(404).json({ message: 'Attendance not found' });
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an attendance record by ID
exports.updateAttendance = async (req, res) => {
    try {
        const updatedAttendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAttendance) return res.status(404).json({ message: 'Attendance not found' });
        res.status(200).json(updatedAttendance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an attendance record by ID
exports.deleteAttendance = async (req, res) => {
    try {
        const deletedAttendance = await Attendance.findByIdAndDelete(req.params.id);
        if (!deletedAttendance) return res.status(404).json({ message: 'Attendance not found' });
        res.status(200).json({ message: 'Attendance deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
