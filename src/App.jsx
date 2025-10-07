import React, { useState, useEffect } from 'react'
import BeautifulTimeline from './components/BeautifulTimeline'
import TreeChartWithPopovers from './components/TreeChartWithPopovers'
import timelineData from './data/timeline.json'
import heroStats from './data/heroStats.json'

export default function App() {
  const handleTreeInteraction = () => {
    // Just scroll to tree section smoothly
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

        {/*  ADD THIS SECTION - This was completely missing! */}
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
          Track the critical events from political negotiations to economic impacts.
        </p>
        <BeautifulTimeline config={timelineData} />
      </section>

      {/* Tree Visualization Section */}
      <section className="tree-section">
        <h2 className="section-title">Impact Breakdown</h2>
        <p className="section-intro">
          Click on any node to expand categories and view detailed visualizations.
        </p>
        <TreeChartWithPopovers onInteraction={handleTreeInteraction} />
      </section>
    </div>
  )
}
