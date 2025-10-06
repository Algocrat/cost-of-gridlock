import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'

const tooltipStyle = {
  backgroundColor: 'rgba(139,94,52,0.95)',
  border: 'none',
  borderRadius: 8,
  color: '#fff',
  padding: '8px 10px'
}

export default function GDPInsetPie(){
  const data = [
    { name: 'Non-Federal Economy', value: 78, color: '#10B981', info: 'Private/state/local activity' },
    { name: 'Mandatory & Interest', value: 16, color: '#94A3B8', info: 'Continues during shutdown' },
    { name: 'Discretionary at Risk', value: 6, color: '#E11D48', info: 'Paused during shutdown' }
  ]
  return (
    <PieChart width={340} height={280}>
      <Pie data={data} cx='50%' cy='50%' innerRadius={60} outerRadius={100} dataKey='value' nameKey='name'>
        {data.map((e,i)=>(<Cell key={i} fill={e.color} />))}
      </Pie>
      <Legend />
      <Tooltip contentStyle={tooltipStyle} formatter={(v,n,p)=>[v+'%', p.payload.info]} />
    </PieChart>
  )
}