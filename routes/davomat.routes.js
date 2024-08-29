const express = require('express');
const router = express.Router();
const attendanceController = require('../controller/attendanceController');

// Create a new attendance record
router.post('/', attendanceController.createAttendance);

// Get all attendance records
router.get('/', attendanceController.getAllAttendances);

// Get a single attendance record by ID
router.get('/:id', attendanceController.getAttendanceById);

// Update an attendance record by ID
router.put('/:id', attendanceController.updateAttendance);

// Delete an attendance record by ID
router.delete('/:id', attendanceController.deleteAttendance);

module.exports = router;
