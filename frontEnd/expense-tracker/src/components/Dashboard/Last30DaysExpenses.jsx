import React from 'react'
import CustomBarChart from '../Charts/CustomBarChart'

const Last30DaysExpenses = ({ data }) => {

    const prepareChartData = () => {
        const chartData = {}
            ; (data?.transactions || []).forEach(item => {
                const date = new Date(item.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short'
                })
                if (!chartData[date]) chartData[date] = 0
                chartData[date] += Number(item.amount)
            })

        return Object.entries(chartData)
            .map(([date, amount]) => ({ date, amount }))
            .reverse()
    }

    return (
        <div className='card animate-fadeInUp'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg font-semibold text-gray-800'>Last 30 Days Expenses</h5>
                <span className='text-xs text-gray-400 bg-red-50 text-red-500 px-2 py-0.5 rounded-full'>Expense</span>
            </div>
            <CustomBarChart data={prepareChartData()} barColor="#FA2C37" />
        </div>
    )
}

export default Last30DaysExpenses
