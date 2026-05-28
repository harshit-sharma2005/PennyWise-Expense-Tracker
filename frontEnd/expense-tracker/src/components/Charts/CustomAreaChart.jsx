import React from 'react'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const CustomAreaChart = ({incomeData, expenseData}) => {
    //merge income and expense data by date
    const mergeData = () => {
        const dateMap = {}

        ;(incomeData || []).forEach(item => {
            const date = new Date(item.date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short'
            })
            if(!dateMap[date]) dateMap[date] = {date, income: 0, expense: 0}
            dateMap[date].income += Number(item.amount)
        })

        ;(expenseData || []).forEach(item => {
            const date = new Date(item.date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short'
            })
            if(!dateMap[date]) dateMap[date] = {date, income: 0, expense: 0}
            dateMap[date].expense += Number(item.amount)
        })

        return Object.values(dateMap).sort((a, b) => {
            const parseDate = (d) => {
                const [day, mon] = d.split(' ')
                const months = {Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11}
                return new Date(2026, months[mon] || 0, parseInt(day))
            }
            return parseDate(a.date) - parseDate(b.date)
        })
    }

    const data = mergeData()

    return (
        <div className='mt-2'>
            <ResponsiveContainer width="100%" height={185}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#875CF5" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#875CF5" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FA2C37" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#FA2C37" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                    <XAxis 
                        dataKey="date" 
                        tick={{fontSize: 11, fill: '#999'}}
                        axisLine={{stroke: '#e5e7eb'}}
                    />
                    <YAxis 
                        tick={{fontSize: 11, fill: '#999'}} 
                        width={45}
                        axisLine={{stroke: '#e5e7eb'}}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                        }}
                    />
                    <Legend wrapperStyle={{fontSize: '11px', paddingTop: '4px'}}/>
                    <Area
                        type="monotone"
                        dataKey="income"
                        stroke="#875CF5"
                        strokeWidth={2}
                        fill="url(#incomeGradient)"
                        name="Income"
                    />
                    <Area
                        type="monotone"
                        dataKey="expense"
                        stroke="#FA2C37"
                        strokeWidth={2}
                        fill="url(#expenseGradient)"
                        name="Expense"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomAreaChart
