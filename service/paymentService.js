const Student = require('../models/student');
const PayStudentStory = require('../models/payStudentStory');

const updateIndebtedness = async () => {
    try {
        const students = await Student.find({ state: 'active' }); // Only active students
        const today = new Date();
        const currentMonth = (today.getMonth() + 1);
        const currentYear = today.getFullYear();
        const currentMonthStart = new Date(currentYear, currentMonth, 1);

        for (const student of students) {
            const lastPayment = await PayStudentStory.findOne();

            if (!lastPayment) {
                const debtorDate = new Date(student.indebtedness.debtorDate);
                const debtorMonth = (debtorDate.getMonth() + 1);
                const debtorYear = debtorDate.getFullYear();

                if (debtorMonth !== currentMonth || debtorYear !== currentYear) {
                    student.indebtedness.debtorPay += student.payForLesson;
                    student.indebtedness.debtorDate = currentMonthStart.toISOString().split('T')[0];
                    await student.save();
                }
            }
        }

    } catch (error) {
        console.error('Error updating indebtedness:', error);
    }
};

module.exports = updateIndebtedness;












// const Student = require('../models/student');
// const PayStudentStory = require('../models/payStudentStory');

// const updateIndebtedness = async () => {
//     try {
//         const students = await Student.find({ state: 'active' }); // Only active students
//         const today = new Date();
//         const currentMonth = today.getMonth();
//         const currentYear = today.getFullYear();
//         const currentMonthStart = new Date(currentYear, currentMonth, 1);

//         for (const student of students) {
//             const lastPayment = await PayStudentStory.findOne({
//                 studentId: student._id,
//                 studentFeesDate: {
//                     $gte: currentMonthStart,
//                     $lt: new Date(currentYear, currentMonth + 1, 1),
//                 },
//             }).sort({ studentFeesDate: -1 });

//             if (!lastPayment) {
//                 const debtorDate = new Date(student.indebtedness.debtorDate);
//                 console.log(debtorDate);
//                 console.log(currentMonth);
//                 if (debtorDate.getMonth() !== currentMonth || debtorDate.getFullYear() !== currentYear) {
//                     student.indebtedness.debtorPay += student.payForLesson;
//                     student.indebtedness.debtorDate = currentMonthStart.toISOString().split('T')[0];
//                     await student.save();
//                 }
//             }
//         }

//         console.log('Indebtedness updated for all students.');
//     } catch (error) {
//         console.error('Error updating indebtedness:', error);
//     }
// };

// module.exports = updateIndebtedness;






// const Student = require('../models/student');
// const PayStudentStory = require('../models/payStudentStory');

// const updateIndebtedness = async () => {
//     try {
//         const students = await Student.find();
//         const today = new Date();
//         const currentMonth = today.getMonth();
//         const currentYear = today.getFullYear();

//         for (const student of students) {
//             const lastPayment = await PayStudentStory.findOne({
//                 studentId: student._id,
//                 studentFeesDate: {
//                     $gte: new Date(currentYear, currentMonth, 1),
//                     $lt: new Date(currentYear, currentMonth + 1, 1),
//                 },
//             }).sort({ studentFeesDate: -1 });

//             if (!lastPayment) {
//                 student.indebtedness += student.payForLesson;
//                 await student.save();
//             }
//         }

//         console.log('Indebtedness updated for all students.');
//     } catch (error) {
//         console.error('Error updating indebtedness:', error);
//     }
// };

// module.exports = updateIndebtedness;











