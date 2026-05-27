const User = require('../models/User')
const Expense = require('../models/Expense')

exports.addExpense = async (req, res) => {
    const userId = req.user.id

    try {
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" })
        }


        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        })

        await newExpense.save()
        res.status(200).json(newExpense)
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" })
    }
};


exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 })
        res.json(expense);
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" })
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully" })
    }
    catch (err) {
        res.status(500).json({ message: " Server Error" })
    }
};

//download all expenses as excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 })

        const ExcelJS = require("exceljs")
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet("Expense")

        worksheet.columns = [
            { header: "Category", key: "category", width: 25 },
            { header: "Amount", key: "amount", width: 15 },
            { header: "Date", key: "date", width: 15 }
        ]

        expense.forEach((item) => {
            worksheet.addRow({
                category: item.category,
                amount: item.amount,
                date: item.date.toISOString().split("T")[0]
            })
        })

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
        res.setHeader("Content-Disposition", 'attachment; filename="expense_details.xlsx"')

        await workbook.xlsx.write(res)
        res.end()
    } catch (err) {
        res.status(500).json({ message: "Server Error" })
    }
}