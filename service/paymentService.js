const Student = require('../models/student');
const PayStudentStory = require('../models/payStudentStory');

const updateIndebtedness = async () => {
    try {
        const students = await Student.find();
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        for (const student of students) {
            const lastPayment = await PayStudentStory.findOne({
                studentId: student._id,
                studentFeesDate: {
                    $gte: new Date(currentYear, currentMonth, 1),
                    $lt: new Date(currentYear, currentMonth + 1, 1),
                },
            }).sort({ studentFeesDate: -1 });

            if (!lastPayment) {
                student.indebtedness += student.payForLesson;
                await student.save();
            }
        }

        console.log('Indebtedness updated for all students.');
    } catch (error) {
        console.error('Error updating indebtedness:', error);
    }
};

module.exports = updateIndebtedness;
