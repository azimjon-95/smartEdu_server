const ExpensesStudent = require("../models/expenses");
const Balans = require("../models/balans");

// CREATE: Yangi xarajat qo'shish
exports.createExpense = async (req, res) => {
    const { name, amount, status, eduId } = req.body;

    try {
        // 1. Yangi xarajat qo'shish
        const expense = new ExpensesStudent(req.body);
        await expense.save();

        // 2. Balansni yangilash
        let balanceUpdate;
        if (status) {
            // Agar status true bo'lsa, balansni oshiramiz
            balanceUpdate = { $inc: { balans: amount } };
        } else {
            // Agar status false bo'lsa, balansni kamaytiramiz
            balanceUpdate = { $inc: { balans: -amount } };
        }

        // Balansni yangilash
        const balans = await Balans.findOneAndUpdate({ eduId: eduId }, balanceUpdate, { new: true });

        // Agar balans mavjud bo'lmasa, uni yaratish
        if (!balans) {
            const newBalans = new Balans({ balans: status ? amount : -amount, eduId });
            await newBalans.save();
        }

        res.status(201).json({ message: "Xarajat muvaffaqiyatli qo'shildi", data: expense });
    } catch (error) {
        res.status(400).json({ message: "Xarajat qo'shishda xatolik yuz berdi", error });
    }
};

// READ: Barcha xarajatlarni olish
exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await ExpensesStudent.find();
        res.status(200).json({ message: "Xarajatlar muvaffaqiyatli olindi", data: expenses });
    } catch (error) {
        res.status(500).json({ message: "Xarajatlarni olishda xatolik yuz berdi", error });
    }
};

// READ: ID bo'yicha bitta xarajatni olish
exports.getExpenseById = async (req, res) => {
    try {
        const expense = await ExpensesStudent.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: "Xarajat topilmadi" });
        }
        res.status(200).json({ message: "Xarajat muvaffaqiyatli olindi", data: expense });
    } catch (error) {
        res.status(500).json({ message: "Xarajatni olishda xatolik yuz berdi", error });
    }
};

// UPDATE: ID bo'yicha xarajatni yangilash
exports.updateExpense = async (req, res) => {
    try {
        const { amount, status, eduId } = req.body;

        // 1. Oldingi xarajatni topish
        const oldExpense = await ExpensesStudent.findById(req.params.id);
        if (!oldExpense) {
            return res.status(404).json({ message: "Xarajat topilmadi" });
        }

        // 2. Xarajatni yangilash
        const updatedExpense = await ExpensesStudent.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedExpense) {
            return res.status(404).json({ message: "Xarajat yangilanishda xatolik yuz berdi" });
        }

        // 3. Balansni yangilash
        let balanceUpdate;
        if (oldExpense.status && !status) {
            // Oldin true edi, endi false bo'ldi: balansni kamaytirish
            balanceUpdate = { $inc: { balans: -amount - oldExpense.amount } };
        } else if (!oldExpense.status && status) {
            // Oldin false edi, endi true bo'ldi: balansni oshirish
            balanceUpdate = { $inc: { balans: amount - oldExpense.amount } };
        } else if (oldExpense.status && status) {
            // Status o'zgarmadi, faqat amount o'zgardi
            balanceUpdate = { $inc: { balans: amount - oldExpense.amount } };
        } else if (!oldExpense.status && !status) {
            // Status o'zgarmadi, faqat amount o'zgardi
            balanceUpdate = { $inc: { balans: -amount + oldExpense.amount } };
        }

        await Balans.findOneAndUpdate({ eduId: eduId }, balanceUpdate, { new: true });

        res.status(200).json({ message: "Xarajat muvaffaqiyatli yangilandi", data: updatedExpense });
    } catch (error) {
        res.status(400).json({ message: "Xarajatni yangilashda xatolik yuz berdi", error });
    }
};

// DELETE: ID bo'yicha xarajatni o'chirish
exports.deleteExpense = async (req, res) => {
    try {
        // 1. Xarajatni topish
        const expense = await ExpensesStudent.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: "Xarajat topilmadi" });
        }

        // 2. Xarajatni o'chirish
        await expense.remove();

        // 3. Balansni yangilash
        let balanceUpdate;
        if (expense.status) {
            // Agar status true bo'lsa, balansni kamaytiramiz
            balanceUpdate = { $inc: { balans: -expense.amount } };
        } else {
            // Agar status false bo'lsa, balansni oshiramiz
            balanceUpdate = { $inc: { balans: expense.amount } };
        }

        await Balans.findOneAndUpdate({ eduId: expense.eduId }, balanceUpdate, { new: true });

        res.status(200).json({ message: "Xarajat muvaffaqiyatli o'chirildi" });
    } catch (error) {
        res.status(500).json({ message: "Xarajatni o'chirishda xatolik yuz berdi", error });
    }
};