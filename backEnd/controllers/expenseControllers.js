const User = require('../models/User')
const Expense = require('../models/Expense')

exports.addExpense = async (req, res) => {
    const userId = req.user.id

    try {
        const { icon, category, amount, date, note } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" })
        }


        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date),
            note: note || ""
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
        const deleted = await Expense.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        })
        if (!deleted) {
            return res.status(404).json({ message: "Expense not found" })
        }
        res.json({ message: "Expense deleted successfully" })
    }
    catch (err) {
        res.status(500).json({ message: " Server Error" })
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const { category, amount, date, icon, note } = req.body
        if (!category || !amount) {
            return res.status(400).json({ message: "Category and amount are required" })
        }

        const update = {
            category,
            amount,
            icon,
            note: note || ""
        }
        if (date) {
            update.date = new Date(date)
        }

        const updated = await Expense.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            update,
            { new: true }
        )

        if (!updated) {
            return res.status(404).json({ message: "Expense not found" })
        }

        res.status(200).json(updated)
    } catch (err) {
        res.status(500).json({ message: "Server Error" })
    }
}

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