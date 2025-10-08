import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

// Custom Tooltip with light background
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '2px solid #0047AB',
        borderRadius: '12px',
        padding: '12px 16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)'
      }}>
        <div style={{ 
          fontWeight: '700', 
          fontSize: '15px', 
          color: '#002868',
          marginBottom: '4px'
        }}>
          {data.name}
        </div>
        <div style={{ 
          fontSize: '14px', 
          color: '#003366',
          marginBottom: '2px'
        }}>
          {data.value}%
        </div>
        <div style={{ 
          fontSize: '13px', 
          color: '#64748B',
          fontStyle: 'italic'
        }}>
          {data.info}
        </div>
      </div>
    )
  }
  return null
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
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
          label={({ name, value }) => `${value}%`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          verticalAlign="bottom" 
          height={36}
          formatter={(value, entry) => (
            <span style={{ color: '#003366', fontSize: '14px' }}>
              {value}
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
