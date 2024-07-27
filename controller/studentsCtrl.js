const Student = require("../models/student"); // Adjust the path as per your structure
// const studentAttendance = require("../models/studentAttendance");
let moment = require("moment");
const Groups = require("../models/groups");

let month = moment().format("MM");

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
  let result = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!result) {
    return res.status(404).send("Student not found");
  }
  res.status(200).json(result);
};

// DELETE
const deleteStudent = (req, res) => {
  Student.findByIdAndDelete(req.params.id)
    .then(() => res.send("Student deleted successfully"))
    .catch((err) => res.status(400).json("Error: " + err));
};

const updateStudentState = async (req, res) => {
  const { groupId } = req.params;
  try {
    await Student.updateMany({ groupId: groupId }, req.body);
    res.status(200).send("Students updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating students");
  }
};

// GET DEBTOR STUDENTS

let data = [
  {
    studentId: "669fe10f56dae4dc9702852c",
    groupId: "669fe0f356dae4dc97028527",
    start: "20.07.2024",
    end: "21.07.2024",
  },

  {
    studentId: "669fe68470f2aeb021f360b0",
    groupId: "669fe66a70f2aeb021f360ab",
    start: "15.07.2024",
    end: "25.07.2024",
  },

  {
    studentId: "669fe69f70f2aeb021f360b9",
    groupId: "669fe66a70f2aeb021f360ab",
    start: "5.07.2024",
    end: "15.07.2024",
  },
  {
    studentId: "669fe6b870f2aeb021f360c2",
    groupId: "669fe66a70f2aeb021f360ab",
    start: "6.07.2024",
    end: "22.07.2024",
  },
];

// const getDebtorStudents = async (req, res) => {
//   try {
//     let groups = await Groups.find();
//     let students = await Student.find({ state: "active" });

//     let result = students.map((student) => {
//       let monthlySum = groups.find((g) => g._id == student.groupId)?.mothlyPay;
//       let debt = Math.round(
//         monthlySum -
//           data.filter(
//             (s) => s.studentId == student._id && s.groupId == student.groupId
//           ).length *
//             (monthlySum / 13)
//       );
//       return { ...student._doc, debt };
//     });

//     res.send(result);
//   } catch (error) {
//     console.error(error);
//     // res.status(500).json({ message: error.message });
//   }
// };

const getDebtorStudents = async (req, res) => {
  try {
    const groups = await Groups.find();
    const students = await Student.find({ state: "active" });

    const monthlyPay = 500000; // 1 oy uchun to'lov
    const classesPerMonth = 13; // 1 oyda 13 ta dars

    let result = students.map((student) => {
      let group = groups.find(
        (g) => g._id.toString() === student.groupId.toString()
      );
      if (!group) {
        return { ...student._doc, debt: 0 }; // Agar guruh topilmasa, qarz 0 deb qabul qilinadi
      }

      // Talaba uchun muzlatilgan kunlarni hisoblash
      let frozenDays = data.reduce((total, entry) => {
        if (
          entry.studentId === student._id.toString() &&
          entry.groupId === student.groupId.toString()
        ) {
          let startDate = new Date(entry.start.split(".").reverse().join("-"));
          let endDate = new Date(entry.end.split(".").reverse().join("-"));
          let difference = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1; // Boshlanish va tugash kunlarini ham qo'shish
          return total + difference;
        }
        return total;
      }, 0);

      // Muzlatilgan kunlar tufayli o'tkazib yuborilgan darslar soni
      let classesMissed = Math.round((frozenDays / 30) * classesPerMonth);

      // Qarzni hisoblash
      let debt = Math.round(
        monthlyPay - classesMissed * (monthlyPay / classesPerMonth)
      );

      return { ...student._doc, debt };
    });

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  deleteStudent,
  updateStudent,
  createStudent,
  getStudent,
  updateStudentState,
  getDebtorStudents,
};
