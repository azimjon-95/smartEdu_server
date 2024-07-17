const PayStudentStory = require('../models/payStudentStory');
const Student = require('../models/student');

exports.createPayment = async (req, res) => {
    try {
        const { studentId, studentFees, studentFeesDate, studentFeesTime, month, subject } = req.body;
        const newPayment = new PayStudentStory({
            studentId,
            studentFees,
            studentFeesDate,
            studentFeesTime,
            month,
            subject,
        });

        await newPayment.save();

        const student = await Student.findById(studentId);
        if (student) {
            student.indebtedness -= studentFees;
            await student.save();
        }

        res.status(201).json(newPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getPayments = async (req, res) => {
    try {
        const payments = await PayStudentStory.find();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPaymentById = async (req, res) => {
    try {
        const payment = await PayStudentStory.findById(req.params.id);
        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePayment = async (req, res) => {
    try {
        const payment = await PayStudentStory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        res.status(200).json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deletePayment = async (req, res) => {
    try {
        const payment = await PayStudentStory.findByIdAndDelete(req.params.id);
        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        res.status(200).json({ message: 'Payment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
