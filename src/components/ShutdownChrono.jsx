import React from 'react'
import { Chrono } from 'react-chrono'


export default function ShutdownChrono({ config = {} }) {
  const items = (config.events || []).map(e => ({
    title: e.label,
    cardTitle: (e.type || '').toUpperCase(),
    cardSubtitle: e.note,
    cardDetailedText: e.cost ? [e.cost] : undefined
  }))


  return (
    <div style={{ width: '100%' }}>
      <div className="title" style={{ marginBottom: '1rem', textAlign: 'center' }}>
        Political Timeline: 2025 Shutdown
      </div>

      <Chrono
        items={items}
        mode="HORIZONTAL"
        hideControls
        disableToolbar
        theme={{
          primary: '#a6b985',
          secondary: 'transparent',
          cardBgColor: 'var(--bg)',
          titleColor: 'var(--text)',
          titleColorActive: 'var(--text)'
        }}
        cardHeight={140}
      />
    </div>
  )
}