import React from 'react'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

const CustomBarChart = ({ data, barColor }) => {
    return (
        <div className='mt-6'>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12, fill: '#999' }}
                        angle={-45}
                        textAnchor='end'
                        height={60}
                    />
                    <YAxis tick={{ fontSize: 12, fill: '#999' }} width={60} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                        }}
                    />
                    <Bar
                        dataKey="amount"
                        fill={barColor || '#875CF5'}
                        radius={[4, 4, 0, 0]}
                        barSize={18}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarChart
