import React, { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  AlertTriangle,  // shutdown events
  Users,          // political events
  TrendingDown,   // economic events
  FileText,       // default/document events
  Gavel,          // legislative events
  MessageSquare,  // negotiation events
  DollarSign,     // cost icon (replaces 💰)
  UsersRound      // players icon (replaces 👥)
} from 'lucide-react'
import './Timeline.css'

export default function BeautifulTimeline({ config = {} }) {
  const events = config.events || []
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Get icon for event type
  const getEventIcon = (event) => {
    const type = event.type?.toLowerCase() || ''
    const note = event.note?.toLowerCase() || ''

    if (type === 'shutdown' || note.includes('shutdown')) {
      return AlertTriangle
    }
    if (type === 'economic' || note.includes('economic')) {
      return TrendingDown
    }
    if (note.includes('senate') || note.includes('house') || note.includes('congress')) {
      return Gavel
    }
    if (note.includes('meet') || note.includes('negotiat') || note.includes('discuss')) {
      return MessageSquare
    }
    if (type === 'political') {
      return Users
    }
    return FileText
  }

  // Determine event sentiment for color
  const getEventColor = (event) => {
    if (event.type === 'shutdown' || event.type === 'economic') {
      return {
        bg: 'rgba(255, 87, 34, 0.15)',
        border: '#FF5722',
        hover: 'rgba(255, 87, 34, 0.3)'
      }
    }
    if (event.type === 'political') {
      return {
        bg: 'rgba(0, 71, 171, 0.15)',
        border: '#0047AB',
        hover: 'rgba(0, 71, 171, 0.3)'
      }
    }
    return {
      bg: 'rgba(158, 158, 158, 0.15)',
      border: '#9E9E9E',
      hover: 'rgba(158, 158, 158, 0.3)'
    }
  }

  const handlePrev = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex(Math.min(events.length - 1, currentIndex + 1))
  }

  // Calculate visible range
  const visibleStart = Math.max(0, currentIndex - 2)
  const visibleEnd = Math.min(events.length, visibleStart + 5)
  const visibleEvents = events.slice(visibleStart, visibleEnd)

  // Get current event details
  const currentEvent = events[currentIndex]
  const currentColors = currentEvent ? getEventColor(currentEvent) : null
  const EventIcon = currentEvent ? getEventIcon(currentEvent) : FileText

  return (
    <div className="beautiful-timeline-container">
      {/* Navigation Arrows */}
      <button 
        className="timeline-nav timeline-nav-left"
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={20} />
      </button>

      <button 
        className="timeline-nav timeline-nav-right"
        onClick={handleNext}
        disabled={currentIndex === events.length - 1}
      >
        <ChevronRight size={20} />
      </button>

      {/* Timeline Line */}
      <div className="timeline-line" />

      {/* Timeline Events */}
      <div className="timeline-events">
        {visibleEvents.map((event, idx) => {
          const globalIndex = visibleStart + idx
          const isHovered = hoveredIndex === globalIndex
          const isCurrent = currentIndex === globalIndex
          const colors = getEventColor(event)

          return (
            <div
              key={globalIndex}
              className={`timeline-event ${isCurrent ? 'current' : ''}`}
              onMouseEnter={() => setHoveredIndex(globalIndex)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setCurrentIndex(globalIndex)}
            >
              {/* Date Label */}
              <div className="timeline-date-top">
                {event.label || event.date}
              </div>

              {/* Node Circle */}
              <div
                className="timeline-node"
                style={{
                  borderColor: colors.border,
                  backgroundColor: isHovered || isCurrent ? colors.hover : colors.bg
                }}
              >
                {(isHovered || isCurrent) && (
                  <div
                    className="timeline-node-center"
                    style={{ backgroundColor: colors.border }}
                  />
                )}
              </div>

              {/* Event Type */}
              <div
                className="timeline-type-bottom"
                style={{ color: colors.border }}
              >
                {event.type || 'Event'}
              </div>
            </div>
          )
        })}
      </div>

      {/* Description Card */}
      {currentEvent && currentColors && (
        <div
          className="timeline-description-card"
          style={{ borderColor: currentColors.border }}
        >
          {/* 🔧 Card Header - ALL metadata moved here */}
          <div className="card-header">
            <div className="card-icon">
              <EventIcon size={20} style={{ color: currentColors.border }} />
            </div>

            {/* Right side: All badges */}
            <div className="card-header-badges">
              {/* Event type badge */}
              <div
                className="card-type-badge"
                style={{
                  backgroundColor: currentColors.bg,
                  color: currentColors.border
                }}
              >
                {currentEvent.type || 'Event'}
              </div>

              {/* 🔧 Cost badge in header */}
              {currentEvent.cost && (
                <div className="card-meta card-cost card-meta-header">
                  <DollarSign className="meta-icon-lucide" size={14} />
                  {currentEvent.cost}
                </div>
              )}

              {/* 🔧 Players badge in header */}
              {currentEvent.key_names && currentEvent.key_names.length > 0 && (
                <div className="card-meta card-players card-meta-header">
                  <UsersRound className="meta-icon-lucide" size={14} />
                  {currentEvent.key_names.join(', ')}
                </div>
              )}
            </div>
          </div>

          {/* 🔧 Card Content - ONLY description now */}
          <div className="card-content">
            <div className="card-description">{currentEvent.note}</div>
          </div>
        </div>
      )}
    </div>
  )
}