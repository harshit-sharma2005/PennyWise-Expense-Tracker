import React, { useState, useEffect } from 'react'
import Input from './Input'
import EmojiPickerPopup from './EmojiPickerPopup'

const AddExpenseForm = ({ onAddExpense, editData }) => {
    const [expense, setExpense] = useState({
        category: "",
        amount: "",
        date: "",
        icon: "",
        note: ""
    })

    useEffect(() => {
        if (editData) {
            setExpense({
                category: editData.category || "",
                amount: editData.amount || "",
                date: editData.date ? new Date(editData.date).toISOString().split('T')[0] : "",
                icon: editData.icon || "",
                note: editData.note || ""
            })
        }
    }, [editData])

    const handleChange = (key, value) => setExpense({ ...expense, [key]: value })

    return (
        <div>
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(emoji) => handleChange("icon", emoji)}
            />

            <Input
                value={expense.category}
                onChange={({ target }) => handleChange("category", target.value)}
                label="Expense Category"
                placeholder="Rent, Food, Travel, etc."
                type="text"
            />

            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder="500"
                type="number"
            />

            <Input
                value={expense.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                type="date"
            />

            <Input
                value={expense.note}
                onChange={({ target }) => handleChange("note", target.value)}
                label="Note (optional)"
                placeholder="Short description or details"
                type="text"
            />

            <div className='flex justify-end mt-4'>
                <button
                    type='button'
                    className='btn-primary'
                    onClick={() => onAddExpense(expense)}
                >
                    {editData ? "Update Expense" : "Add Expense"}
                </button>
            </div>
        </div>
    )
}

export default AddExpenseForm

