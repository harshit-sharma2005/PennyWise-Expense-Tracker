const User = require('../models/User')
const Income = require('../models/Income')



exports.addIncome = async (req, res) => {
    const userId = req.user.id

    try {
        const { icon, source, amount, date, note } = req.body;

        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" })
        }


        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date),
            note: note || ""
        })

        await newIncome.save()
        res.status(200).json(newIncome)
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" })
    }
};

exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 })
        res.json(income);
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" })
    }
};

exports.deleteIncome = async (req, res) => {
    try {
        const deleted = await Income.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        })
        if (!deleted) {
            return res.status(404).json({ message: "Income not found" })
        }
        res.json({ message: "Income deleted successfully" })
    }
    catch (err) {
        res.status(500).json({ message: " Server Error" })
    }
};

exports.updateIncome = async (req, res) => {
    try {
        const { source, amount, date, icon, note } = req.body
        if (!source || !amount) {
            return res.status(400).json({ message: "Source and amount are required" })
        }

        const update = {
            source,
            amount,
            icon,
            note: note || ""
        }
        if (date) {
            update.date = new Date(date)
        }

        const updated = await Income.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            update,
            { new: true }
        )

        if (!updated) {
            return res.status(404).json({ message: "Income not found" })
        }

        res.status(200).json(updated)
    } catch (err) {
        res.status(500).json({ message: "Server Error" })
    }
}

//download all income as excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id
    try {
        const income = await Income.find({ userId }).sort({ date: -1 })

        const ExcelJS = require("exceljs")
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet("Income")

        worksheet.columns = [
            { header: "Source", key: "source", width: 25 },
            { header: "Amount", key: "amount", width: 15 },
            { header: "Date", key: "date", width: 15 }
        ]

        income.forEach((item) => {
            worksheet.addRow({
                source: item.source,
                amount: item.amount,
                date: item.date.toISOString().split("T")[0]
            })
        })

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
        res.setHeader("Content-Disposition", 'attachment; filename="income_details.xlsx"')

        await workbook.xlsx.write(res)
        res.end()
    } catch (err) {
        res.status(500).json({ message: "Server Error" })
    }
}