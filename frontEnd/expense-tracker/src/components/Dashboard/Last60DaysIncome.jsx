import React from 'react'
import CustomBarChart from '../Charts/CustomBarChart'

const Last60DaysIncome = ({ data }) => {

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
                <h5 className='text-sm font-semibold text-text-primary uppercase tracking-wider'>Last 60 Days Income</h5>
                <span className='text-[10px] font-medium bg-success-bg text-success border border-success/15 px-1.5 py-0.5 rounded-full'>Income</span>
            </div>
            <CustomBarChart data={prepareChartData()} barColor="#00e676" />
        </div>
    )
}

export default Last60DaysIncome
