const Income = require("../models/Income")
const Expense = require("../models/Expense")

const { isValidObjectId, Types } = require("mongoose")

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id
        const userObjectId = new Types.ObjectId(String(userId))

        //matchig grouping and summing
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: { $toDouble: "$amount" } } } }
        ])


        console.log("total Income", { totalIncome, userId: isValidObjectId(userId) })

        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: { $toDouble: "$amount" } } } }
        ])


        const last60dayIncomeTransaction = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 })

        const incomeLast60days = last60dayIncomeTransaction.reduce(
            (sum, transaction) => sum + Number(transaction.amount),
            0
        )

        const last30dayExpenseTransaction = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 })

        const expenseLast30days = last30dayExpenseTransaction.reduce(
            (sum, transaction) => sum + Number(transaction.amount),
            0
        )



        const lastTransaction = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "income"
                })
            ),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "expense"
                })
            ),
        ].sort((a, b) => b.date - a.date);//sort latest first

        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30dayExpenses: {
                total: expenseLast30days,
                transactions: last30dayExpenseTransaction
            },
            last60dayIncome: {
                total: incomeLast60days,
                transactions: last60dayIncomeTransaction
            },
            recentTransactions: lastTransaction
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error", err })
    }
}
