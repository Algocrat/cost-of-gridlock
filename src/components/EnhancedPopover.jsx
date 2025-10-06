import React from 'react'
import BulletList from './BulletList'
import GDPInsetPie from './GDPInsetPie'
import Thermometer from './Thermometer'
import CCILineChart from './CCILineChart'

export default function EnhancedPopover({ node, x, y }) {
  if (!node || !node.visualization) return null

  const renderVisualization = () => {
    const viz = node.visualization

    switch (viz.type) {
      case 'list':
        return <BulletList items={viz.data} />

      case 'pie':
        return <GDPInsetPie data={viz.data} />

      case 'thermometer':
        return <Thermometer value={viz.data.value} label={viz.data.label} />

      case 'lineChart':
        return <CCILineChart data={viz.data} />

      case 'text':
        return (
          <div style={{ 
            padding: '10px', 
            fontSize: '0.95rem', 
            lineHeight: '1.6',
            color: '#5d4037'
          }}>
            {viz.data.content}
          </div>
        )

      default:
        return <p style={{ color: '#5d4037' }}>{node.detail}</p>
    }
  }

  // Calculate screen center
  const screenCenterX = window.innerWidth / 2
  const screenCenterY = window.innerHeight / 2

  // Calculate the midpoint between node and screen center
  const midPointX = (x + screenCenterX) / 2
  const midPointY = (y + screenCenterY) / 2

  // Larger popover dimensions to avoid scrollbars
  const popoverWidth = 600  // Increased from 400
  const popoverHeight = 500 // Increased from 300

  // Calculate final position
  let finalX = midPointX
  let finalY = midPointY

  // Ensure popover stays within viewport with margins
  const margin = 20

  // Adjust horizontal position
  if (finalX - popoverWidth / 2 < margin) {
    finalX = margin + popoverWidth / 2
  } else if (finalX + popoverWidth / 2 > window.innerWidth - margin) {
    finalX = window.innerWidth - margin - popoverWidth / 2
  }

  // Adjust vertical position
  if (finalY - popoverHeight / 2 < margin) {
    finalY = margin + popoverHeight / 2
  } else if (finalY + popoverHeight / 2 > window.innerHeight - margin) {
    finalY = window.innerHeight - margin - popoverHeight / 2
  }

  return (
    <div
      className="enhanced-popover"
      style={{
        position: 'fixed',
        left: `${finalX}px`,
        top: `${finalY}px`,
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        pointerEvents: 'auto',
        width: 'auto',
        minWidth: '400px',
        maxWidth: `${popoverWidth}px`,
        height: 'auto',
        minHeight: '250px',
        maxHeight: `${popoverHeight}px`,
        overflow: 'visible'
      }}
    >
      <div className="popover-content">
        <h3 className="popover-title">{node.title}</h3>
        {node.detail && <p className="popover-detail">{node.detail}</p>}
        <div className="popover-viz">
          {renderVisualization()}
        </div>
      </div>
    </div>
  )
}