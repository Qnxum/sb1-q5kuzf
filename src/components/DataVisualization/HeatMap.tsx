import React from 'react';
import { ResponsiveHeatMap } from '@nivo/heatmap';

interface HeatMapProps {
  data: any[];
  options?: {
    colors?: string[];
    title?: string;
    xAxis?: string;
    yAxis?: string;
  };
}

export default function HeatMap({ 
  data, 
  options = {
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
    title: '',
    xAxis: '',
    yAxis: ''
  }
}: HeatMapProps) {
  return (
    <div className="h-64">
      <ResponsiveHeatMap
        data={data}
        margin={{ top: 20, right: 60, bottom: 60, left: 60 }}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: options.xAxis,
          legendOffset: 46
        }}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: options.xAxis,
          legendPosition: 'middle',
          legendOffset: 46
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: options.yAxis,
          legendPosition: 'middle',
          legendOffset: -40
        }}
        colors={options.colors}
        emptyColor="#374151"
        borderColor="#1F2937"
        labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
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