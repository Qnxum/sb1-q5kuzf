import React from 'react';
import { NivoBar } from './NivoBar';
import type { EngagementMetric } from './types';

interface EngagementBarChartProps {
  data: EngagementMetric[];
  height?: number;
  colors?: string[];
}

export const EngagementBarChart = ({
  data,
  height = 300,
  colors = ['#60A5FA']
}: EngagementBarChartProps) => {
  const formattedData = data.map(d => ({
    metric: d.metric,
    value: d.value
  }));

  return (
    <NivoBar
      data={formattedData}
      height={height}
      colors={colors}
      indexBy="metric"
      keys={['value']}
      margin={{
        top: 10,
        right: 10,
        bottom: 50,
        left: 50
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -45,
        legendPosition: 'middle',
        legendOffset: 40
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: 'middle',
        legendOffset: -40
      }}
    />
  );
};