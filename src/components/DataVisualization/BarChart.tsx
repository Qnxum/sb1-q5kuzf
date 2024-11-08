import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

interface BarChartProps {
  data: any[];
  options?: {
    colors?: string[];
    title?: string;
    xAxis?: string;
    yAxis?: string;
  };
}

export default function BarChart({ 
  data, 
  options = {
    colors: ['#3B82F6'],
    title: '',
    xAxis: '',
    yAxis: ''
  }
}: BarChartProps) {
  return (
    <div className="h-64">
      <ResponsiveBar
        data={data}
        keys={[options.yAxis || 'value']}
        indexBy={options.xAxis || 'name'}
        margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={options.colors}
        borderRadius={4}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: options.xAxis || '',
          legendPosition: 'middle',
          legendOffset: 40
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: options.yAxis || '',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
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