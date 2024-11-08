import React, { useState } from 'react';
import { Table, BarChart2, GitBranch, Clock, List, Kanban, Map, PieChart, Layout } from 'lucide-react';

interface ViewOption {
  id: string;
  icon: React.ElementType;
  label: string;
}

const viewOptions: ViewOption[] = [
  { id: 'table', icon: Table, label: 'Table View' },
  { id: 'graph', icon: BarChart2, label: 'Graphical View' },
  { id: 'list', icon: List, label: 'List View' },
  { id: 'summary', icon: GitBranch, label: 'Summary View' },
  { id: 'timeline', icon: Clock, label: 'Timeline View' },
  { id: 'kanban', icon: Kanban, label: 'Kanban Board' },
  { id: 'impact', icon: Map, label: 'Impact Map' },
  { id: 'swot', icon: PieChart, label: 'SWOT Analysis' },
  { id: 'dashboard', icon: Layout, label: 'Dashboard View' }
];

interface FrameworkViewerProps {
  framework: any; // Replace with proper type
  onViewChange?: (viewType: string) => void;
}

export default function FrameworkViewer({ framework, onViewChange }: FrameworkViewerProps) {
  const [activeView, setActiveView] = useState('table');

  const handleViewChange = (viewId: string) => {
    setActiveView(viewId);
    onViewChange?.(viewId);
  };

  return (
    <div className="h-full flex flex-col bg-gray-950">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Strategic Framework</h2>
          <div className="flex space-x-2">
            {viewOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleViewChange(option.id)}
                className={`p-2 rounded-lg transition-colors ${
                  activeView === option.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800'
                }`}
                title={option.label}
              >
                <option.icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {/* Framework content based on activeView */}
        <div className="bg-gray-900 rounded-lg p-4">
          {/* Replace with actual framework content */}
          <p className="text-gray-300">Framework content will be displayed here based on the selected view.</p>
        </div>
      </div>
    </div>
  );
}