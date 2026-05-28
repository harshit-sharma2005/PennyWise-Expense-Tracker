import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const COLORS = ['#00e676', '#1de9b6', '#ffd740']


const FinanceOverview=({totalBalance,totalExpense,totalIncome})=>{
    const balanceData=[
        {name:'Total Balance',amount:totalBalance},
        {name:'Total Income',amount:totalIncome},
        {name:'Total Expense',amount:totalExpense}
    ]

  return (
    <div className='card animate-fadeInUp'>
        <div className='flex items-center justify-center'>
            <h5 className='text-sm font-semibold text-text-primary uppercase tracking-wider'>Financial Overview</h5>
        </div>

        <CustomPieChart
            data={balanceData}
            label="Total Balance"
            totalAmount={`$${totalBalance}`}
            colors={COLORS}
            showTextAnchor
        />
    </div>
  )
}

export default FinanceOverview
