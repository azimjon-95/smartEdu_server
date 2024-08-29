const mongoose = require("mongoose");
const moment = require("moment");

const expensesSchema = new mongoose.Schema(
  {
    time: { type: String, default: moment().format("HH:mm") },
    day: { type: String, default: moment().format("DD.MM.YYYY") },
    name: { type: String, required: true },
    amount: { type: Number, required: true, default: 0 },
    category: { type: String },
    description: { type: String },
    status: { type: Boolean, default: false },
    month: { type: String, default: moment().format("MMMM") },
  },
  { timestamps: true }
);

const ExpensesStudent = mongoose.model("ExpensesStudent", expensesSchema);
module.exports = ExpensesStudent;
