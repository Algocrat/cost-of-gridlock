import React, { useEffect, useRef, useState } from 'react';
import { Gavel, Users, AlertTriangle, TrendingDown, Calendar } from 'lucide-react';

const TimelinePopover = ({ node, x, y, onMouseEnter, onMouseLeave }) => {
  const popoverRef = useRef(null);
  const [adjustedPosition, setAdjustedPosition] = useState({ x, y });

  if (!node) return null;

  useEffect(() => {
    if (popoverRef.current) {
      const rect = popoverRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let adjustedX = x;
      let adjustedY = y;

      if (x + rect.width / 2 > viewportWidth - 20) {
        adjustedX = viewportWidth - rect.width / 2 - 20;
      }

      if (x - rect.width / 2 < 20) {
        adjustedX = rect.width / 2 + 20;
      }

      if (y - rect.height - 10 < 20) {
        adjustedY = y + 30;
      }

      setAdjustedPosition({ x: adjustedX, y: adjustedY });
    }
  }, [x, y]);

  const getIcon = () => {
    const type = node.type?.toLowerCase() || '';
    if (type === 'shutdown') return AlertTriangle;
    if (type === 'economic') return TrendingDown;
    if (type === 'political') return Gavel;
    return Gavel;
  };

  const getTypeStyle = () => {
    const type = node.type?.toLowerCase() || '';
    if (type === 'shutdown') {
      return { label: 'SHUTDOWN', bgColor: '#FEE2E2', textColor: '#991B1B' };
    }
    if (type === 'economic') {
      return { label: 'ECONOMIC', bgColor: '#FEF3C7', textColor: '#92400E' };
    }
    if (type === 'political') {
      return { label: 'POLITICAL', bgColor: '#DBEAFE', textColor: '#1E40AF' };
    }
    return { label: 'EVENT', bgColor: '#F3F4F6', textColor: '#374151' };
  };

  const Icon = getIcon();
  const typeStyle = getTypeStyle();

  const popoverStyle = {
    position: 'fixed',
    left: `${adjustedPosition.x}px`,
    top: `${adjustedPosition.y - 10}px`,
    transform: 'translate(-50%, -100%)',
    zIndex: 10000,
    maxWidth: '380px',
    minWidth: '280px',
    backgroundColor: 'white',
    border: '1px solid #94A3B8',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    borderBottom: '1px solid #E5E7EB'
  };

  const dateContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '11px',
    color: '#64748B',
    fontWeight: '500'
  };

  const calendarIconStyle = {
    width: '12px',
    height: '12px',
    color: '#64748B'
  };

  const iconStyle = {
    width: '16px',
    height: '16px',
    color: '#64748B',
    flexShrink: 0
  };

  const badgeStyle = {
    backgroundColor: typeStyle.bgColor,
    color: typeStyle.textColor,
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.5px',
    marginLeft: 'auto'
  };

  const playersStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 12px',
    backgroundColor: '#F8FAFC',
    borderBottom: '1px solid #E5E7EB',
    fontSize: '12px'
  };

  const playerIconStyle = {
    width: '14px',
    height: '14px',
    color: '#64748B',
    flexShrink: 0
  };

  const playerPillStyle = {
    backgroundColor: 'white',
    border: '1px solid #CBD5E1',
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '11px',
    color: '#475569',
    fontWeight: '500'
  };

  const descriptionStyle = {
    padding: '10px 12px',
    fontSize: '13px',
    lineHeight: '1.5',
    color: '#475569'
  };

  return (
    <div 
      ref={popoverRef}
      style={popoverStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Header with date, icon, and type badge */}
      <div style={headerStyle}>
        <div style={dateContainerStyle}>
          <Calendar style={calendarIconStyle} />
          <span>{node.date}</span>
        </div>
        <Icon style={iconStyle} />
        <span style={badgeStyle}>{typeStyle.label}</span>
      </div>

      {/* Key players section */}
      {node.key_names && node.key_names.length > 0 && (
        <div style={playersStyle}>
          <Users style={playerIconStyle} />
          {node.key_names.map((player, idx) => (
            <span key={idx} style={playerPillStyle}>{player}</span>
          ))}
        </div>
      )}

      {/* Description */}
      <div style={descriptionStyle}>
        {node.description}
      </div>
    </div>
  );
};

export default TimelinePopover;
