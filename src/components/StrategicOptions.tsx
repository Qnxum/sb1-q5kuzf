import React from 'react';
import { LineChart, AlertTriangle, Users, Eye, Target, LayoutDashboard, FileText } from 'lucide-react';

interface StrategicOptionsProps {
  onSelect: (option: string) => void;
}

export default function StrategicOptions({ onSelect }: StrategicOptionsProps) {
  const options = [
    {
      id: 'strategic-framework',
      name: 'Strategic Framework',
      description: 'View comprehensive strategic framework with pillars, outcomes, and impact analysis',
      icon: FileText
    },
    {
      id: 'risk',
      name: 'Risk Management',
      description: 'Identify and assess strategic risks',
      icon: AlertTriangle
    },
    {
      id: 'stakeholder',
      name: 'Stakeholder Engagement',
      description: 'Analyze key stakeholder relationships',
      icon: Users
    },
    {
      id: 'vision-mission',
      name: 'Vision & Mission',
      description: 'Review organizational vision and mission',
      icon: Eye
    },
    {
      id: 'values',
      name: 'Values Integration',
      description: 'Align core values with strategy',
      icon: Target
    },
    {
      id: 'balanced-scorecard',
      name: 'Balanced Scorecard',
      description: 'View performance metrics across key perspectives',
      icon: LayoutDashboard
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.id)}
          className="flex flex-col p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-left"
        >
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10">
              <option.icon className="w-5 h-5 text-blue-400" />
            </div>
            <span className="font-medium text-white text-sm">
              {option.name}
            </span>
          </div>
          <p className="text-xs text-gray-300 line-clamp-2">
            {option.description}
          </p>
        </button>
      ))}
    </div>
  );
}