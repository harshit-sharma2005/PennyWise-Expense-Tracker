const express = require('express')

const {
    getAllExpense,
    addExpense,
    deleteExpense,
    downloadExpenseExcel,
    updateExpense
} = require('../controllers/expenseControllers')

const { protect } = require('../middleware/authMiddleware')
const router = express.Router();

router.post('/add', protect, addExpense)
router.get('/get', protect, getAllExpense)
router.get('/download', protect, downloadExpenseExcel)
router.delete('/:id', protect, deleteExpense)
router.put('/:id', protect, updateExpense)

module.exports = router;
