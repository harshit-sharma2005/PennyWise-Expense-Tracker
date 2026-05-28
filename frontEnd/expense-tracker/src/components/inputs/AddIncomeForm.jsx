import React, { useState, useEffect } from 'react'
import Input from './Input'
import EmojiPickerPopup from './EmojiPickerPopup'

const AddIncomeForm = ({ onAddIncome, editData }) => {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: ""
    })

    useEffect(() => {
        if (editData) {
            setIncome({
                source: editData.source || "",
                amount: editData.amount || "",
                date: editData.date ? new Date(editData.date).toISOString().split('T')[0] : "",
                icon: editData.icon || ""
            })
        }
    }, [editData])

    const handleChange = (key, value) => setIncome({ ...income, [key]: value })

    return (
        <div>
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(emoji) => handleChange("icon", emoji)}
            />

            <Input
                value={income.source}
                onChange={({ target }) => handleChange("source", target.value)}
                label="Income Source"
                placeholder="Freelance, Salary, etc."
                type="text"
            />

            <Input
                value={income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder="2500"
                type="number"
            />

            <Input
                value={income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                type="date"
            />

            <div className='flex justify-end mt-4'>
                <button
                    type='button'
                    className='btn-primary'
                    onClick={() => onAddIncome(income)}
                >
                    {editData ? "Update Income" : "Add Income"}
                </button>
            </div>
        </div>
    )
}

export default AddIncomeForm

