const express = require("express");
const studentRouter = express.Router();
const {
  deleteStudent,
  updateStudent,
  createStudent,
  getStudent,
  updateStudentState,
  getDebtorStudents,
} = require("../controller/studentsCtrl");

studentRouter.get("/student/", getStudent); // GET /students
studentRouter.post("/student/", createStudent); // POST /students
studentRouter.put("/student/:id", updateStudent); // PUT /students/:id
studentRouter.delete("/student/:id", deleteStudent); // DELETE /students/:id
studentRouter.put("/student/update-state/:groupId", updateStudentState);
studentRouter.get("/getDebtorStudents", getDebtorStudents);

// export
module.exports = studentRouter;
