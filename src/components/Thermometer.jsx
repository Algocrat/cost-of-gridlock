import React, { useState } from 'react';

export default function Thermometer() {
  const [hover, setHover] = useState('');

  return (
    <div className="thermo" style={{ position: 'relative' }}>
      <div className="thermo-bar" />
      <div className="thermo-labels">
        <div
          className="thermo-label"
          onMouseEnter={() =>
            setHover('Hard to Rebuild: Lost confidence is slow to recover.')
          }
          onMouseLeave={() => setHover('')}
        >
          Hard to Rebuild
        </div>

        <div
          className="thermo-label highlight"
          onMouseEnter={() =>
            setHover('Shaken — Shutdowns erode trust; families & firms delay.')
          }
          onMouseLeave={() => setHover('')}
        >
          Shaken — Shutdowns erode trust; families & firms delay.
        </div>

        <div
          className="thermo-label"
          onMouseEnter={() =>
            setHover('Stable: Predictable government boosts confidence.')
          }
          onMouseLeave={() => setHover('')}
        >
          Stable
        </div>
      </div>
      <div className={'tooltip ' + (hover ? 'show' : '')} style={{ left: 130, top: 0 }}>
        {hover}
      </div>
    </div>
  );
}
