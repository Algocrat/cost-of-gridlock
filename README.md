# The Cost of Gridlock

An interactive data visualization exploring the cascading economic, social, and operational impacts of the 2025 U.S. government shutdown.

🔗 **[Live Demo](https://algocrat.github.io/cost-of-gridlock/)**

## Overview

As the 2025 government shutdown enters its third week, this project provides a comprehensive, data-driven analysis of its wide-reaching effects across federal operations, economic indicators, and vulnerable communities. Built with modern web technologies, the visualization presents complex government shutdown data through interactive charts, timelines, and hierarchical breakdowns.

## Features

- **Interactive Tree Visualization**: D3.js-powered hierarchical breakdown of shutdown impacts across Economic, Social, and Political sectors with expandable nodes and detailed popovers
- **Timeline Chronicle**: Track critical events from September 19 negotiations through October 15, including failed Senate votes and key political decisions
- **Hero Statistics Dashboard**: Real-time metrics including furloughed workers (750K+), flight delays (6,000+ daily), Consumer Confidence Index trends, and GDP impact estimates
- **Enhanced Data Popovers**: Rich contextual information with embedded charts, bullet lists, and data visualizations for each impact category
- **Responsive Design**: Mobile-first approach optimized for all screen sizes
- **Patriotic Color Palette**: Thoughtful use of red, white, and blue tones with vintage patriotic aesthetic

## Data Sources

All data is sourced from official government reports, major news outlets, economic research firms (S&P Global, Goldman Sachs), and congressional records as of October 15, 2025. Sources are cited throughout the visualization.

## Technology Stack

- **React 18** - Component-based UI architecture
- **D3.js** - Interactive tree chart and data visualizations
- **Framer Motion** - Smooth animations and transitions
- **Recharts** - Economic charts and graphs
- **React Chrono** - Timeline visualization
- **Vite** - Fast build tool and dev server
- **Lucide React** - Icon system

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Visit `http://localhost:5173` to view the application.

## Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── TreeChartWithPopovers.jsx    # Main D3 tree visualization
│   ├── EnhancedPopover.jsx           # Detailed impact popovers
│   ├── ShutdownChrono.jsx            # Timeline component
│   ├── GDPInsetPie.jsx               # GDP impact charts
│   ├── CCILineChart.jsx              # Consumer Confidence trends
│   ├── Thermometer.jsx               # Gauge visualizations
│   └── BulletList.jsx                # Formatted data lists
├── data/
│   ├── treeData.json                 # Hierarchical impact data
│   ├── timeline.json                 # Political event timeline
│   └── heroStats.json                # Key metrics
├── App.jsx                           # Main application
└── styles.css                        # Global styles
```

## Key Metrics Tracked

- **Economic Impact**: GDP reduction estimates, contractor effects, market disruption
- **Workforce Impact**: 750K+ furloughed workers, 700K working without pay
- **Service Disruptions**: Aviation delays, museum closures, WIC program strain
- **Consumer Confidence**: Decline from 97.4 to 94.2
- **Political Timeline**: 9+ failed Senate votes, stalled negotiations

## Contributing

This is a data journalism project. If you notice data inaccuracies or have updated statistics, please open an issue with cited sources.

## License

MIT License - See LICENSE file for details

## Author

Built by [Tejas Patel](https://github.com/algocrat) to provide transparent, unbiased analysis of government shutdown impacts.

## Acknowledgments

Special thanks to all the local businesses and federal employees whose stories inform this visualization.

---

*Last Updated: October 16, 2025 (Day 16 of shutdown)*