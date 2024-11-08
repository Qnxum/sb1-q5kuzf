import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';

interface RadarChartProps {
  data: any[];
  options?: {
    colors?: string[];
    title?: string;
    indexBy?: string;
    keys?: string[];
  };
}

export default function RadarChart({ 
  data, 
  options = {
    colors: ['#3B82F6'],
    title: '',
    indexBy: 'category',
    keys: ['value']
  }
}: RadarChartProps) {
  return (
    <div className="h-64">
      <ResponsiveRadar
        data={data}
        keys={options.keys}
        indexBy={options.indexBy}
        maxValue="auto"
        margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ from: 'color' }}
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={12}
        enableDots={true}
        dotSize={8}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color' }}
        enableDotLabel={true}
        dotLabel="value"
        dotLabelYOffset={-12}
        colors={options.colors}
        fillOpacity={0.25}
        blendMode="multiply"
        animate={true}
        motionConfig="gentle"
        theme={{
          textColor: '#9CA3AF',
          grid: {
            line: {
              stroke: '#374151'
            }
          }
        }}
      />
    </div>
  );
}