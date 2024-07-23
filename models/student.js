const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    groupId: { type: String, required: true },
    teacherId: { type: String, required: true },
    teacherFullName: { type: [String], required: true },
    lessonTime: { type: String, required: true },
    lessonDate: { type: String, required: true },
    payForLesson: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    address: { type: String, required: true },
    studentPhoneNumber: { type: String, required: true },
    parentPhoneNumber: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    subject: { type: String },
    state: { type: String, default: "new" },
    coin: { type: Number, default: 0 },
    indebtedness: {
        debtorDate: { type: String },
        debtorPay: { type: Number, default: 0 },

    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;







// const students = [
//     {
//         groupId: "group123",
//         teacherId: "teacher123",
//         teacherFullName: ['John Doe'],
//         lessonTime: '10:00',
//         lessonDate: '2024-07-22',
//         payForLesson: 100,
//         firstName: 'Ali',
//         lastName: 'Valiyev',
//         middleName: 'Ibrohim o\'g\'li',
//         dateOfBirth: new Date('2005-01-01'),
//         address: 'Tashkent, Uzbekistan',
//         studentPhoneNumber: '+998901234567',
//         parentPhoneNumber: '+998901234567',
//         gender: 'male',
//         subject: 'Mathematics',
//         state: 'new',
//         indebtedness: {
//             debtorDate: '2024-06-22',
//             debtorPay: 0,
//         }
//     },
//     {
//         groupId: "group123",
//         teacherId: "teacher123",
//         teacherFullName: ['John Doe'],
//         lessonTime: '11:00',
//         lessonDate: '2024-07-22',
//         payForLesson: 100,
//         firstName: 'Zarina',
//         lastName: 'Sodiqova',
//         middleName: 'Qudrat qizi',
//         dateOfBirth: new Date('2005-02-02'),
//         address: 'Tashkent, Uzbekistan',
//         studentPhoneNumber: '+998901234568',
//         parentPhoneNumber: '+998901234568',
//         gender: 'female',
//         subject: 'Physics',
//         state: 'new',
//         indebtedness: {
//             debtorDate: '2024-06-22',
//             debtorPay: 0,
//         }
//     },
//     {
//         groupId: "group123",
//         teacherId: "teacher123",
//         teacherFullName: ['John Doe'],
//         lessonTime: '12:00',
//         lessonDate: '2024-07-22',
//         payForLesson: 100,
//         firstName: 'Jasur',
//         lastName: 'Karimov',
//         middleName: 'Bahodir o\'g\'li',
//         dateOfBirth: new Date('2005-03-03'),
//         address: 'Tashkent, Uzbekistan',
//         studentPhoneNumber: '+998901234569',
//         parentPhoneNumber: '+998901234569',
//         gender: 'male',
//         subject: 'Chemistry',
//         state: 'new',
//         indebtedness: {
//             debtorDate: '2024-06-22',
//             debtorPay: 0,
//         }
//     },
//     {
//         groupId: "group123",
//         teacherId: "teacher123",
//         teacherFullName: ['John Doe'],
//         lessonTime: '13:00',
//         lessonDate: '2024-07-22',
//         payForLesson: 100,
//         firstName: 'Shahnoza',
//         lastName: 'Yuldasheva',
//         middleName: 'Abdurahim qizi',
//         dateOfBirth: new Date('2005-04-04'),
//         address: 'Tashkent, Uzbekistan',
//         studentPhoneNumber: '+998901234570',
//         parentPhoneNumber: '+998901234570',
//         gender: 'female',
//         subject: 'Biology',
//         state: 'new',
//         indebtedness: {
//             debtorDate: '2024-06-22',
//             debtorPay: 0,
//         }
//     },
//     {
//         groupId: "group123",
//         teacherId: "teacher123",
//         teacherFullName: ['John Doe'],
//         lessonTime: '14:00',
//         lessonDate: '2024-07-22',
//         payForLesson: 100,
//         firstName: 'Aziz',
//         lastName: 'Rakhimov',
//         middleName: 'Rustam o\'g\'li',
//         dateOfBirth: new Date('2005-05-05'),
//         address: 'Tashkent, Uzbekistan',
//         studentPhoneNumber: '+998901234571',
//         parentPhoneNumber: '+998901234571',
//         gender: 'male',
//         subject: 'History',
//         state: 'new',
//         indebtedness: {
//             debtorDate: '2024-06-22',
//             debtorPay: 0,
//         }
//     },
//     {
//         groupId: "group123",
//         teacherId: "teacher123",
//         teacherFullName: ['John Doe'],
//         lessonTime: '15:00',
//         lessonDate: '2024-07-22',
//         payForLesson: 100,
//         firstName: 'Nargiza',
//         lastName: 'Islomova',
//         middleName: 'Salim qizi',
//         dateOfBirth: new Date('2005-06-06'),
//         address: 'Tashkent, Uzbekistan',
//         studentPhoneNumber: '+998901234572',
//         parentPhoneNumber: '+998901234572',
//         gender: 'female',
//         subject: 'Geography',
//         state: 'new',
//         indebtedness: {
//             debtorDate: '2024-06-22',
//             debtorPay: 0,
//         }
//     },
//     {
//         groupId: "group123",
//         teacherId: "teacher123",
//         teacherFullName: ['John Doe'],
//         lessonTime: '16:00',
//         lessonDate: '2024-07-22',
//         payForLesson: 100,
//         firstName: 'Bekzod',
//         lastName: 'Usmonov',
//         middleName: 'Qodir o\'g\'li',
//         dateOfBirth: new Date('2005-07-07'),
//         address: 'Tashkent, Uzbekistan',
//         studentPhoneNumber: '+998901234573',
//         parentPhoneNumber: '+998901234573',
//         gender: 'male',
//         subject: 'Literature',
//         state: 'new',
//         indebtedness: {
//             debtorDate: '2024-06-22',
//             debtorPay: 0,
//         }
//     },
//     {
//         groupId: "group123",
//         teacherId: "teacher123",
//         teacherFullName: ['John Doe'],
//         lessonTime: '17:00',
//         lessonDate: '2024-07-22',
//         payForLesson: 100,
//         firstName: 'Sevinch',
//         lastName: 'Yusupova',
//         middleName: 'Orif qizi',
//         dateOfBirth: new Date('2005-08-08'),
//         address: 'Tashkent, Uzbekistan',
//         studentPhoneNumber: '+998901234574',
//         parentPhoneNumber: '+998901234574',
//         gender: 'female',
//         subject: 'English',
//         state: 'new',
//         indebtedness: {
//             debtorDate: '2024-06-22',
//             debtorPay: 0,
//         }
//     },
//     {
//         groupId: "group123",
//         teacherId: "teacher123",
//         teacherFullName: ['John Doe'],
//         lessonTime: '18:00',
//         lessonDate: '2024-07-22',
//         payForLesson: 100,
//         firstName: 'Davron',
//         lastName: 'Eshonov',
//         middleName: 'Rahmat o\'g\'li',
//         dateOfBirth: new Date('2005-09-09'),
//         address: 'Tashkent, Uzbekistan',
//         studentPhoneNumber: '+998901234575',
//         parentPhoneNumber: '+998901234575',
//         gender: 'male',
//         subject: 'Computer Science',
//         state: 'new',
//         indebtedness: {
//             debtorDate: '2024-06-22',
//             debtorPay: 0,
//         }
//     },
//     {
//         groupId: "group123",
//         teacherId: "teacher123",
//         teacherFullName: ['John Doe'],
//         lessonTime: '19:00',
//         lessonDate: '2024-07-22',
//         payForLesson: 100,
//         firstName: 'Malika',
//         lastName: 'Mahmudova',
//         middleName: 'Anvar qizi',
//         dateOfBirth: new Date('2005-10-10'),
//         address: 'Tashkent, Uzbekistan',
//         studentPhoneNumber: '+998901234576',
//         parentPhoneNumber: '+998901234576',
//         gender: 'female',
//         subject: 'Art',
//         state: 'new',
//         indebtedness: {
//             debtorDate: '2024-06-22',
//             debtorPay: 0,
//         }
//     }
// ];