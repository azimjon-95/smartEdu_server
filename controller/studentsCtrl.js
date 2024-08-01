const Student = require("../models/student"); // Adjust the path as per your structure
// const studentAttendance = require("../models/studentAttendance");
const Groups = require("../models/groups");

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
  console.log(req);
  let result = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!result) {
    return res.status(404).send("Student not found")
  }
  res.status(200).json(result)

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

const getDebtorStudents = async (req, res) => {
  try {
    const students = await Student.find({ state: "active" });

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0-based, yanvar = 0, fevral = 1, ...

    // Oyni boshidan bugungacha o'tilgan darslar sonini hisoblash
    const getLessonNumber = (startYear, startMonth, daysOfWeek) => {
      const startDate = new Date(startYear, startMonth, 1);
      const endDate = today;

      let lessonCount = 0;

      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        if (daysOfWeek.includes(d.getDay())) {
          lessonCount++;
        }
      }
      return lessonCount;
    };

    let result = students.map((student) => {
      const monthlyPay = student.payForLesson; // 1 oy uchun to'lov

      // bir oyda darslar soni
      const classesPerMonth =
        student.lessonDate === "evenDays"
          ? 13
          : student.lessonDate === "oddDays"
            ? 13
            : 26;

      // Darslar qaysi kunlari o'tadi
      const lessonDays =
        student.lessonDate === "evenDays"
          ? [2, 4, 6]
          : student.lessonDate === "oddDays"
            ? [1, 3, 5]
            : [1, 2, 3, 4, 5, 6];

      // bu oyni boshidan hozirgacha otilgan darslar soni
      const lessonNumber = getLessonNumber(
        currentYear,
        currentMonth,
        lessonDays
      );

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

      let month = (today.getMonth() + 1).toString().padStart(2, "0"); // Hozirgi oy
      let updatedIndebtedness = {
        ...student.indebtedness,
        debtorPay:
          month !== student.indebtedness.debtorDate.split("-")[1]
            ? student.indebtedness.debtorPay + debt
            : student.indebtedness.debtorPay -
            (classesPerMonth - lessonNumber) * (monthlyPay / classesPerMonth),
      };

      return { ...student._doc, indebtedness: updatedIndebtedness };
    });

    res.send(result);
  } catch (error) {
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
