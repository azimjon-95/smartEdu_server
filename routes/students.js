const express = require("express");
const studentRouter = express.Router();
const {
    deleteStudent,
    updateStudent,
    createStudent,
    getStudent,
    updateStudentState
} = require("../controller/studentsCtrl");

studentRouter.get('/student/', getStudent); // GET /students
studentRouter.post('/student/', createStudent); // POST /students
studentRouter.put('/student/:id', updateStudent); // PUT /students/:id
studentRouter.delete('/student/:id', deleteStudent); // DELETE /students/:id
studentRouter.put('/student/update-state/:groupId', updateStudentState);

// export
module.exports = studentRouter;


