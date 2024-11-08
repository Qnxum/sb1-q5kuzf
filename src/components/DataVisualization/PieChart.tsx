import React from 'react';
import { ResponsivePie } from '@nivo/pie';

interface PieChartProps {
  data: any[];
  options?: {
    colors?: string[];
    title?: string;
    xAxis?: string;
    yAxis?: string;
  };
}

export default function PieChart({ 
  data, 
  options = {
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
    title: '',
    xAxis: 'name',
    yAxis: 'value'
  }
}: PieChartProps) {
  const formattedData = data.map(d => ({
    id: d[options.xAxis],
    value: d[options.yAxis],
    label: d[options.xAxis]
  }));

  return (
    <div className="h-64">
      <ResponsivePie
        data={formattedData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={options.colors}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#9CA3AF"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        theme={{
          textColor: '#9CA3AF'
        }}
      />
    </div>
  );
}