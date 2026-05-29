const express = require('express')

const {
    getAllIncome,
    addIncome,
    deleteIncome,
    downloadIncomeExcel,
    updateIncome
} = require('../controllers/incomeControllers')

const { protect } = require('../middleware/authMiddleware')
const router = express.Router();

router.post('/add', protect, addIncome)
router.get('/get', protect, getAllIncome)
router.get('/download', protect, downloadIncomeExcel)
router.delete('/:id', protect, deleteIncome)
router.put('/:id', protect, updateIncome)

module.exports = router;
