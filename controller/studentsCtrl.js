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
const updateStudent = async (req, res) => {
    let result = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!result) {
        return res.status(404).send("Student not found")
    }
    res.status(200).json(result)

};

// DELETE
const deleteStudent = (req, res) => {
    Student.findByIdAndDelete(req.params.id)
        .then(() => res.send('Student deleted successfully'))
        .catch(err => res.status(400).json('Error: ' + err));
};

const updateStudentState = async (req, res) => {
    const { groupId } = req.params;
    try {
        await Student.updateMany({ groupId: groupId }, req.body);
        res.status(200).send('Students updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating students');
    }
};







module.exports = {
    deleteStudent,
    updateStudent,
    createStudent,
    getStudent,
    updateStudentState
}