import React from 'react';

interface ChartContainerProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  height?: number | string;
}

export function ChartContainer({
  title = '',
  children,
  height = 300,
  className = ''
}: ChartContainerProps) {
  return (
    <div className={`bg-gray-700/50 p-4 rounded-lg ${className}`}>
      {title && (
        <h4 className="font-medium text-white mb-4">{title}</h4>
      )}
      <div style={{ height }} className="w-full">
        {children}
      </div>
    </div>
  );
}