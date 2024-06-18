const express = require("express");
const studentRouter = express.Router();
const StudentCtrl = require("../controller/studentsCtrl");

studentRouter.get('/student/', StudentCtrl.getStudent); // GET /students
studentRouter.post('/student/', StudentCtrl.createStudent); // POST /students
studentRouter.put('/student/:id', StudentCtrl.updateStudent); // PUT /students/:id
studentRouter.delete('/student/:id', StudentCtrl.deleteStudent); // DELETE /students/:id

// export
module.exports = studentRouter;


