import React, { useState } from 'react';
import { Table, BarChart2, GitBranch, Clock, ChevronDown, ChevronUp } from 'lucide-react';

interface Framework {
  type: 'table' | 'chart' | 'mindmap' | 'timeline';
  title: string;
  content: string;
}

interface FrameworkGeneratorProps {
  frameworks: Framework[];
}

export default function FrameworkGenerator({ frameworks }: FrameworkGeneratorProps) {
  const [expandedFrameworks, setExpandedFrameworks] = useState<number[]>([0]);

  const getIcon = (type: Framework['type']) => {
    switch (type) {
      case 'table':
        return Table;
      case 'chart':
        return BarChart2;
      case 'mindmap':
        return GitBranch;
      case 'timeline':
        return Clock;
      default:
        return Table;
    }
  };

  const toggleFramework = (index: number) => {
    setExpandedFrameworks((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  if (!frameworks.length) return null;

  return (
    <div className="space-y-4">
      {frameworks.map((framework, index) => {
        const Icon = getIcon(framework.type);
        const isExpanded = expandedFrameworks.includes(index);

        return (
          <div
            key={index}
            className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => toggleFramework(index)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Icon className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-medium text-white">
                  {framework.title}
                </h3>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {isExpanded && (
              <div className="p-4 border-t border-gray-700">
                <div className="prose prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: framework.content }} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}