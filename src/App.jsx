import React, { useState, useEffect } from 'react'
import ShutdownChrono from './components/ShutdownChrono'
import TreeChartWithPopovers from './components/TreeChartWithPopovers'
import timelineData from './data/timeline.json'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function App() {
  const [heroExpanded, setHeroExpanded] = useState(true)
  const [timelineExpanded, setTimelineExpanded] = useState(true)
  const [treeInteracted, setTreeInteracted] = useState(false)

  // Auto-collapse sections when tree is first interacted with
  const handleTreeInteraction = () => {
    if (!treeInteracted) {
      setTreeInteracted(true)
      setHeroExpanded(false)
      setTimelineExpanded(false)
      // Save to localStorage so it persists
      localStorage.setItem('treeInteracted', 'true')
    }
  }

  // Check if user has interacted before
  useEffect(() => {
    const hasInteracted = localStorage.getItem('treeInteracted')
    if (hasInteracted === 'true') {
      setTreeInteracted(true)
      setHeroExpanded(false)
      setTimelineExpanded(false)
    }
  }, [])

  return (
    <div className="app-container">
      {/* Hero Section - 20% initially, collapsible */}
      <section 
        className={`hero-section ${heroExpanded ? 'expanded' : 'collapsed'}`}
        style={{ 
          height: heroExpanded ? '20vh' : '60px',
          transition: 'height 0.4s ease-in-out'
        }}
      >
        <button 
          className="section-toggle"
          onClick={() => setHeroExpanded(!heroExpanded)}
          aria-label={heroExpanded ? "Collapse hero" : "Expand hero"}
        >
          {heroExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {heroExpanded ? (
          <>
            <h1 className="hero-title">The Cost of Gridlock</h1>
            <p className="hero-subtitle">
              When Washington stalls, America pays. The 2025 government shutdown 
              halts ~6% of GDP in discretionary spending, affecting 750,000+ federal workers, 
              contractors, and millions of families—while ripple effects spread across consumer 
              confidence, financial markets, and vulnerable communities nationwide.
            </p>
            <div className="hero-stats">
              <div className="stat-box">
                <span className="stat-value">$7-15B</span>
                <span className="stat-label">GDP Loss Per Week</span>
              </div>
              <div className="stat-box">
                <span className="stat-value">750K+</span>
                <span className="stat-label">Federal Workers Affected</span>
              </div>
              <div className="stat-box">
                <span className="stat-value">22-23%</span>
                <span className="stat-label">Federal Spending of GDP</span>
              </div>
            </div>
          </>
        ) : (
          <h2 className="section-title-collapsed">The Cost of Gridlock</h2>
        )}
      </section>

      {/* Timeline Section - 30% initially, collapsible */}
      <section 
        className={`timeline-section ${timelineExpanded ? 'expanded' : 'collapsed'}`}
        style={{ 
          height: timelineExpanded ? '30vh' : '60px',
          transition: 'height 0.4s ease-in-out'
        }}
      >
        <button 
          className="section-toggle"
          onClick={() => setTimelineExpanded(!timelineExpanded)}
          aria-label={timelineExpanded ? "Collapse timeline" : "Expand timeline"}
        >
          {timelineExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {timelineExpanded ? (
          <>
            <h2 className="section-title">Shutdown Timeline</h2>
            <p className="section-intro">
              Track the critical events from political negotiations to economic impacts
            </p>
            <div style={{ height: 'calc(100% - 80px)', overflow: 'auto' }}>
              <ShutdownChrono config={timelineData} />
            </div>
          </>
        ) : (
          <h2 className="section-title-collapsed">Shutdown Timeline</h2>
        )}
      </section>

      {/* Tree Visualization Section - Takes remaining space (50% initially) */}
      <section 
        className="tree-section"
        style={{ 
          height: treeInteracted 
            ? `calc(100vh - ${heroExpanded ? '20vh' : '60px'} - ${timelineExpanded ? '30vh' : '60px'})` 
            : '50vh',
          transition: 'height 0.4s ease-in-out'
        }}
      >
        <h2 className="section-title">Explore Impact Categories</h2>
        <p className="section-intro">
          Click on any node to expand categories and view detailed visualizations
        </p>
        <TreeChartWithPopovers onInteraction={handleTreeInteraction} />
      </section>
    </div>
  )
}