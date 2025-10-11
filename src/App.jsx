import React, { useState, useEffect } from 'react'
import BeautifulTimeline from './components/BeautifulTimeline'
import UShapedFlowLine from './components/UShapedFlowLine'
import TreeChartWithPopovers from './components/TreeChartWithPopovers'
import timelineData from './data/timeline.json'
import heroStatsRaw from './data/heroStats.json'

export default function App() {
  const [heroStats, setHeroStats] = useState([])

  // Calculate shutdown duration in days automatically
  useEffect(() => {
    const processedStats = heroStatsRaw.map(stat => {
      // Check if this stat is a date field (shutdown duration)
      if (stat.isDate && stat.value) {
        const startDate = new Date(stat.value)
        const today = new Date()
        const diffTime = Math.abs(today - startDate)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        return {
          ...stat,
          value: `${diffDays} Day${diffDays !== 1 ? 's' : ''}`
        }
      }
      return stat
    })

    setHeroStats(processedStats)
  }, [])

  const handleTreeInteraction = () => {
    const treeSection = document.querySelector('.tree-section')
    if (treeSection) {
      treeSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="app-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">The Cost of Gridlock</h1>
        <p className="hero-subtitle">
          When Washington stalls, America pays. The 2025 government shutdown halts approximately 6% of GDP in discretionary spending, affecting hundreds of thousands of federal workers, contractors, and families, while its effects ripple through confidence, markets, and essential services.
        </p>

        <div className="hero-stats">
          {heroStats.map((stat, index) => (
            <div key={index} className="stat-box">
              <div className="stat-value" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <h2 className="section-title">Timeline of Events</h2>
        <p className="section-intro">
          Hoover over node to view detailed event information.
        </p>
        <UShapedFlowLine config={timelineData} />
      </section>

      {/* Tree Section */}
      <section className="tree-section">
        <h2 className="section-title">Impact Breakdown</h2>
        <p className="section-intro">
          Click on any node to expand categories and view detailed visualizations.
        </p>
        <div className="tree-container">
          <TreeChartWithPopovers onInteraction={handleTreeInteraction} />
        </div>
      </section>
    </div>
  )
}
