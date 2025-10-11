import React from 'react'
import * as Icons from 'lucide-react'

const Fallback = Icons.Circle

export default function BulletList({ items = [] }) {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '12px',
      padding: '6px 0' 
    }}>
      {items.map((item, index) => {
        const IconComponent = Icons[item.icon] || Fallback

        return (
          <div 
            key={index} 
            style={{ 
              display: 'flex', 
              alignItems: 'flex-start',
              gap: '10px'
            }}
          >
            {/* Icon with proper padding inside circle */}
            <div style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8d6e63, #a1887f)',
              color: '#fff',
              boxShadow: '0 1px 4px rgba(141, 110, 99, 0.2)'
            }}>
              <IconComponent size={14} strokeWidth={2} />
            </div>

            {/* Content */}
            <div style={{ flex: 1, paddingTop: '1px' }}>
              <h4 style={{ 
                margin: '0 0 3px 0',
                fontSize: '1.0rem',
                fontWeight: '700',
                color: '#3e2723',
                lineHeight: '1.3'
              }}>
                {item.title}
              </h4>
              <p style={{ 
                margin: 0,
                fontSize: '0.9rem',
                color: '#5d4037',
                lineHeight: '1.6'
              }}>
                {item.detail}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}