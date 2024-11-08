import React from 'react';
import { ResponsiveLine } from '@nivo/line';

interface LineChartProps {
  data: any[];
  options?: {
    colors?: string[];
    title?: string;
    xAxis?: string;
    yAxis?: string;
  };
}

export default function LineChart({ 
  data, 
  options = {
    colors: ['#3B82F6'],
    title: '',
    xAxis: '',
    yAxis: ''
  }
}: LineChartProps) {
  const formattedData = [
    {
      id: options.yAxis || 'value',
      data: data.map(d => ({
        x: d[options.xAxis || 'name'],
        y: d[options.yAxis || 'value']
      }))
    }
  ];

  return (
    <div className="h-64">
      <ResponsiveLine
        data={formattedData}
        margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
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
        pointSize={8}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableArea={true}
        areaOpacity={0.15}
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