const Student = require('../models/student'); // Adjust the path as per your structure

// READ
const getStudent = async (req, res) => {
    try {
        const student = await Student.find();
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREATE
const createStudent = async (req, res) => {
    try {
        const newRegistration = new Student(req.body);
        await newRegistration.save();
        res.status(201).json(newRegistration);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// UPDATE
const updateStudent = (req, res) => {
    Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(() => res.send('Student updated successfully'))
        .catch(err => res.status(400).json('Error: ' + err));
};

// DELETE
const deleteStudent = (req, res) => {
    Student.findByIdAndDelete(req.params.id)
        .then(() => res.send('Student deleted successfully'))
        .catch(err => res.status(400).json('Error: ' + err));
};

module.exports = {
    deleteStudent,
    updateStudent,
    createStudent,
    getStudent
}