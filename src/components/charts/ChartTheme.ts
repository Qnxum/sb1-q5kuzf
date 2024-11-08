import type { ChartTheme } from './types';

export const chartTheme: ChartTheme = {
  background: 'transparent',
  textColor: '#9CA3AF',
  fontSize: 11,
  axis: {
    domain: {
      line: {
        stroke: '#374151',
        strokeWidth: 1
      }
    },
    ticks: {
      line: {
        stroke: '#374151',
        strokeWidth: 1
      }
    }
  },
  grid: {
    line: {
      stroke: '#374151',
      strokeWidth: 1
    }
  },
  tooltip: {
    container: {
      background: '#1F2937',
      color: '#F3F4F6',
      fontSize: '12px',
      borderRadius: '4px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }
  },
  // Override Nivo's internal defaultProps
  crosshair: {
    line: {
      stroke: '#374151',
      strokeWidth: 1,
      strokeOpacity: 0.35
    }
  },
  annotations: {
    text: {
      fontSize: 11,
      fill: '#9CA3AF',
      outlineWidth: 2,
      outlineColor: '#1F2937',
      outlineOpacity: 1
    },
    link: {
      stroke: '#374151',
      strokeWidth: 1,
      outlineWidth: 2,
      outlineColor: '#1F2937',
      outlineOpacity: 1
    },
    outline: {
      stroke: '#374151',
      strokeWidth: 2,
      outlineWidth: 2,
      outlineColor: '#1F2937',
      outlineOpacity: 1
    },
    symbol: {
      fill: '#60A5FA',
      size: 8,
      strokeWidth: 1,
      strokeOpacity: 1
    }
  }
};