const express = require("express");
const router = express.Router();
const expensesController = require("../controller/expenses.ctrl");

// CREATE: Yangi xarajat qo'shish
router.post("/create-expense", expensesController.createExpense);

// READ: Barcha xarajatlarni olish
router.get("/all-expenses", expensesController.getAllExpenses);

// READ: ID bo'yicha bitta xarajatni olish
router.get("/expense/:id", expensesController.getExpenseById);

// UPDATE: ID bo'yicha xarajatni yangilash
router.put("/update-expense/:id", expensesController.updateExpense);

// DELETE: ID bo'yicha xarajatni o'chirish
router.delete("/delete-expense/:id", expensesController.deleteExpense);

module.exports = router;
