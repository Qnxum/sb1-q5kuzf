import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { chartTheme } from './ChartTheme';

interface NivoLineProps {
  data: Array<{
    id: string;
    data: Array<{
      x: string | number;
      y: number;
    }>;
  }>;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
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

export const NivoLine = ({
  data,
  height = 400,
  margin = { top: 20, right: 20, bottom: 60, left: 60 },
  colors = ['#3B82F6'],
  axisBottom = {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: -45,
    legend: 'Time',
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
}: NivoLineProps) => {
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
      <ResponsiveLine
        data={data}
        margin={margin}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={axisBottom}
        axisLeft={axisLeft}
        colors={colors}
        pointSize={8}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableArea={true}
        areaOpacity={0.15}
        useMesh={true}
        role="application"
        ariaLabel="Line chart"
        theme={theme}
        enableGridX={true}
        enableGridY={true}
        gridYValues={5}
        isInteractive={true}
        motionConfig="gentle"
      />
    </div>
  );
};