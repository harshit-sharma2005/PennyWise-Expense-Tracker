import React from 'react'
import CustomAreaChart from '../Charts/CustomAreaChart'

const IncomeExpenseTrend = ({incomeTransactions, expenseTransactions}) => {
    return (
        <div className='card animate-fadeInUp'>
            <div className='flex items-center justify-between'>
                <h5 className='text-sm font-semibold text-text-primary uppercase tracking-wider'>Income vs Expense Trend</h5>
                <span className='text-xs text-gray-400'>Last 60 days</span>
            </div>
            <CustomAreaChart
                incomeData={incomeTransactions}
                expenseData={expenseTransactions}
            />
        </div>
    )
}

export default IncomeExpenseTrend
