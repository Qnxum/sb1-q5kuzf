import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { chartTheme } from './ChartTheme';

interface NivoBarProps {
  data: Array<{
    [key: string]: string | number;
  }>;
  keys?: string[];
  indexBy?: string;
  height?: number;
  margin?: { 
    top: number; 
    right: number; 
    bottom: number; 
    left: number; 
  };
  colors?: string[];
  axisBottom?: {
    tickSize?: number;
    tickPadding?: number;
    tickRotation?: number;
    legend?: string;
    legendPosition?: 'start' | 'middle' | 'end';
    legendOffset?: number;
  };
  axisLeft?: {
    tickSize?: number;
    tickPadding?: number;
    tickRotation?: number;
    legend?: string;
    legendPosition?: 'start' | 'middle' | 'end';
    legendOffset?: number;
  };
}

export const NivoBar = ({ 
  data,
  keys = ['value'],
  indexBy = 'name',
  height = 400,
  margin = { top: 20, right: 20, bottom: 60, left: 60 },
  colors = ['#3B82F6'],
  axisBottom = {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: -45,
    legend: 'Category',
    legendPosition: 'middle',
    legendOffset: 50
  },
  axisLeft = {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'Value',
    legendPosition: 'middle',
    legendOffset: -50
  }
}: NivoBarProps) => {
  const theme = {
    ...chartTheme,
    axis: {
      ...chartTheme.axis,
      ticks: {
        ...chartTheme.axis.ticks,
        text: {
          fill: chartTheme.textColor,
          fontSize: chartTheme.fontSize
        }
      }
    }
  };

  return (
    <div style={{ height }}>
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        margin={margin}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={colors}
        borderRadius={4}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={axisBottom}
        axisLeft={axisLeft}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        role="application"
        ariaLabel="Bar chart"
        theme={theme}
        enableGridY={true}
        gridYValues={5}
        isInteractive={true}
        motionConfig="gentle"
      />
    </div>
  );
};