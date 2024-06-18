const Student = require('../models/student'); // Adjust the path as per your structure

// READ
exports.getStudent = (req, res) => {
    Student.find()
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' + err));
};

// CREATE
exports.createStudent = (req, res) => {
    const newStudent = new Student(req.body);

    newStudent.save()
        .then(() => res.send('Student added successfully'))
        .catch(err => res.status(400).json('Error: ' + err));
};

// UPDATE
exports.updateStudent = (req, res) => {
    Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(() => res.send('Student updated successfully'))
        .catch(err => res.status(400).json('Error: ' + err));
};

// DELETE
exports.deleteStudent = (req, res) => {
    Student.findByIdAndDelete(req.params.id)
        .then(() => res.send('Student deleted successfully'))
        .catch(err => res.status(400).json('Error: ' + err));
};

