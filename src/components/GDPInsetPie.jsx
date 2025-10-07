import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

const tooltipStyle = {
  backgroundColor: 'rgba(30, 41, 59, 0.98)',
  border: '2px solid #3B82F6',
  borderRadius: 12,
  color: '#fff',
  padding: '12px 16px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)'
}

export default function GDPInsetPie() {
  const data = [
    { 
      name: 'Non-Federal Economy', 
      value: 78, 
      color: '#06B6D4',
      info: 'Private/state/local activity' 
    },
    { 
      name: 'Mandatory & Interest', 
      value: 16, 
      color: '#3B82F6',
      info: 'Continues during shutdown' 
    },
    { 
      name: 'Discretionary at Risk', 
      value: 6, 
      color: '#F97316',
      info: 'Paused during shutdown' 
    }
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <defs>
          <linearGradient id="grad-0" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#0891B2" />
          </linearGradient>
          <linearGradient id="grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
        </defs>

        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          dataKey="value"
          paddingAngle={3}
          stroke="#fff"
          strokeWidth={3}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`}
              fill={`url(#grad-${index})`}
            />
          ))}
        </Pie>

        <Tooltip 
          contentStyle={tooltipStyle}
          formatter={(value, name, props) => [value + '%', props.payload.info]} 
        />

        <Legend 
          verticalAlign="bottom"
          height={60}
          iconType="circle"
          iconSize={12}
          wrapperStyle={{
            paddingTop: '20px',
            fontSize: '14px',
            fontWeight: '600'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}