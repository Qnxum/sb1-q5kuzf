import React from 'react';
import LineChart from './LineChart';
import BarChart from './BarChart';
import PieChart from './PieChart';
import AreaChart from './AreaChart';
import HeatMap from './HeatMap';
import RadarChart from './RadarChart';

interface DataVisualizationProps {
  type: 'line' | 'bar' | 'pie' | 'area' | 'heatmap' | 'radar';
  data: any[];
  options?: {
    colors?: string[];
    title?: string;
    xAxis?: string;
    yAxis?: string;
    keys?: string[];
    indexBy?: string;
  };
}

export default function DataVisualization({ 
  type, 
  data, 
  options = {
    colors: ['#3B82F6'],
    title: '',
    xAxis: '',
    yAxis: '',
    keys: ['value'],
    indexBy: 'category'
  }
}: DataVisualizationProps) {
  const defaultColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
  const visualizationOptions = {
    ...options,
    colors: options.colors || defaultColors
  };

  const renderVisualization = () => {
    switch (type) {
      case 'line':
        return <LineChart data={data} options={visualizationOptions} />;
      case 'area':
        return <AreaChart data={data} options={visualizationOptions} />;
      case 'bar':
        return <BarChart data={data} options={visualizationOptions} />;
      case 'pie':
        return <PieChart data={data} options={visualizationOptions} />;
      case 'heatmap':
        return <HeatMap data={data} options={visualizationOptions} />;
      case 'radar':
        return <RadarChart data={data} options={visualizationOptions} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      {options.title && (
        <h4 className="text-sm font-medium text-gray-300 mb-4">{options.title}</h4>
      )}
      {renderVisualization()}
    </div>
  );
}