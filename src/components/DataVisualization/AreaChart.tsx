import React from 'react';
import { ResponsiveLine } from '@nivo/line';

interface AreaChartProps {
  data: any[];
  options?: {
    colors?: string[];
    title?: string;
    xAxis?: string;
    yAxis?: string;
  };
}

export default function AreaChart({ 
  data, 
  options = {
    colors: ['#3B82F6'],
    title: '',
    xAxis: 'name',
    yAxis: 'value'
  }
}: AreaChartProps) {
  const formattedData = [
    {
      id: options.yAxis,
      data: data.map(d => ({
        x: d[options.xAxis],
        y: d[options.yAxis]
      }))
    }
  ];

  return (
    <div className="h-64">
      <ResponsiveLine
        data={formattedData}
        margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: options.xAxis || '',
          legendOffset: 40,
          legendPosition: 'middle'
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: options.yAxis || '',
          legendOffset: -40,
          legendPosition: 'middle'
        }}
        colors={options.colors}
        enableArea={true}
        areaOpacity={0.3}
        enablePoints={false}
        useMesh={true}
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