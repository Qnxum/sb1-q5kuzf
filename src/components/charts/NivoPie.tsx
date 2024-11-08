import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { chartTheme } from './ChartTheme';

interface NivoPieProps {
  data: Array<{
    id: string;
    value: number;
    color?: string;
  }>;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  colors?: string[];
  innerRadius?: number;
  padAngle?: number;
  cornerRadius?: number;
}

export const NivoPie = ({
  data,
  height = 400,
  margin = { top: 40, right: 40, bottom: 40, left: 40 },
  colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
  innerRadius = 0.5,
  padAngle = 0.7,
  cornerRadius = 3
}: NivoPieProps) => {
  const theme = {
    ...chartTheme,
    labels: {
      text: {
        fill: chartTheme.textColor,
        fontSize: chartTheme.fontSize
      }
    }
  };

  return (
    <div style={{ height }}>
      <ResponsivePie
        data={data}
        margin={margin}
        innerRadius={innerRadius}
        padAngle={padAngle}
        cornerRadius={cornerRadius}
        activeOuterRadiusOffset={8}
        colors={colors}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={chartTheme.textColor}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        role="application"
        ariaLabel="Pie chart"
        theme={theme}
        isInteractive={true}
        motionConfig="gentle"
      />
    </div>
  );
};