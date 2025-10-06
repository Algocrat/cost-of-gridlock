import React from 'react'

export default function CCILineChart({ config = {} }) {
  const data = config.chartData || []

  if (data.length === 0) return null

  // Calculate chart dimensions
  const width = 100
  const height = 60
  const padding = 5

  // Get min and max values for scaling
  const values = data.map(d => d.cci)
  const minVal = Math.min(...values) - 5
  const maxVal = Math.max(...values) + 5

  // Create points for the line
  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - 2 * padding)
    const y = height - padding - ((d.cci - minVal) / (maxVal - minVal)) * (height - 2 * padding)
    return { x, y, ...d }
  })

  // Split into green (pre-shutdown) and red (shutdown) segments
  const greenPoints = points.slice(0, 3) // Jul, Aug, Sep
  const redPoints = points.slice(2) // Sep, Oct, Nov (overlap at Sep)

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      minHeight: '300px'
    }}>
      {/* Title matching other sections */}
      <div className="title" style={{ marginBottom: '1rem', textAlign: 'center' }}>
        {config.title || 'Consumer Confidence Index'}
      </div>

      <div style={{ 
        width: '100%', 
        maxWidth: '600px',
        padding: '20px',
        background: 'var(--bg)'
      }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto' }}>
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(percent => {
            const y = height - padding - (percent / 100) * (height - 2 * padding)
            const value = minVal + (percent / 100) * (maxVal - minVal)
            return (
              <g key={percent}>
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="var(--muted)"
                  strokeWidth="0.1"
                  opacity="0.3"
                />
                <text
                  x={padding - 1}
                  y={y}
                  fill="var(--muted)"
                  fontSize="2"
                  textAnchor="end"
                  dominantBaseline="middle"
                >
                  {value.toFixed(0)}
                </text>
              </g>
            )
          })}

          {/* Green line (Jul-Sep) - solid */}
          <path
            d={greenPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}
            fill="none"
            stroke="#a6b985"
            strokeWidth="0.5"
          />

          {/* Red line (Sep-Nov) - dotted */}
          <path
            d={redPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}
            fill="none"
            stroke="#dc2626"
            strokeWidth="0.5"
            strokeDasharray="1,1"
          />

          {/* Data points */}
          {points.map((p, i) => {
            const isRed = i >= 2 // Sep, Oct, Nov are red
            return (
              <g key={i}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="0.8"
                  fill={p.projected ? 'var(--bg)' : (isRed ? '#dc2626' : '#a6b985')}
                  stroke={isRed ? '#dc2626' : '#a6b985'}
                  strokeWidth="0.3"
                />
                {/* Month labels */}
                <text
                  x={p.x}
                  y={height - 1}
                  fill="var(--text)"
                  fontSize="2.5"
                  textAnchor="middle"
                >
                  {p.month.split(' ')[0]}
                </text>
                {/* Value labels */}
                <text
                  x={p.x}
                  y={p.y - 2}
                  fill="var(--text)"
                  fontSize="2.5"
                  textAnchor="middle"
                  fontWeight="600"
                >
                  {p.cci}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Legend */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '15px',
          fontSize: '0.75rem',
          color: 'var(--muted)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ 
              width: '20px', 
              height: '2px', 
              background: '#a6b985' 
            }}></div>
            <span>Actual</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ 
              width: '20px', 
              height: '2px', 
              background: '#dc2626',
              backgroundImage: 'linear-gradient(90deg, #dc2626 50%, transparent 50%)',
              backgroundSize: '4px 2px'
            }}></div>
            <span>Projected</span>
          </div>
        </div>
      </div>

      {config.note && (
        <p style={{ 
          fontSize: '0.75rem', 
          color: 'var(--muted)', 
          marginTop: '1rem', 
          fontStyle: 'italic',
          textAlign: 'center',
          maxWidth: '600px'
        }}>
          {config.note}
        </p>
      )}
    </div>
  )
}