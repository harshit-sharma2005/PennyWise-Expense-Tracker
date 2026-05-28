import React from 'react'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

const CustomBarChart = ({ data, barColor }) => {
    return (
        <div className='mt-2'>
            <ResponsiveContainer width="100%" height={130}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 10, fill: '#999' }}
                        angle={-30}
                        textAnchor='end'
                        height={35}
                    />
                    <YAxis tick={{ fontSize: 10, fill: '#999' }} width={45} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                        }}
                    />
                    <Bar
                        dataKey="amount"
                        fill={barColor || '#875CF5'}
                        radius={[4, 4, 0, 0]}
                        barSize={12}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarChart
