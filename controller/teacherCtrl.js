const Teacher = require('../models/teacher'); // Teacher modelini import qilish
const bcrypt = require('bcrypt'); // Parolni tekshirish uchun bcrypt kutubxonasini import qilish

// Barcha ustozlarni olish
exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Bir ustozni olish
exports.getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) return res.status(404).json({ message: 'Ustoz topilmadi' });
        res.json(teacher);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Ustoz yaratish
exports.createTeacher = async (req, res) => {
    const teacher = new Teacher(req.body);
    try {
        console.log(teacher);
        const newTeacher = await teacher.save();
        res.status(201).json(newTeacher);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Ustozni yangilash
exports.updateTeacher = async (req, res) => {
    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTeacher) return res.status(404).json({ message: 'Ustoz topilmadi' });
        res.json(updatedTeacher);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Ustozni o'chirish
exports.deleteTeacher = async (req, res) => {
    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
        if (!deletedTeacher) return res.status(404).json({ message: 'Ustoz topilmadi' });
        res.json({ message: 'Ustoz o\'chirildi' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// SignIn (kirish) funksiyasi
exports.signIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        const teacher = await Teacher.findOne({ username });
        if (!teacher) {
            return res.status(400).json({ message: 'Foydalanuvchi nomi yoki parol xato' });
        }

        const isMatch = await teacher.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Foydalanuvchi nomi yoki parol xato' });
        }

        res.json({ message: 'Muvaffaqiyatli kirish' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
