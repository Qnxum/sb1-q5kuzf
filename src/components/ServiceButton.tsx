import React from 'react';
import { BrainCircuit, Bot, LineChart, BarChart4 } from 'lucide-react';

interface ServiceButtonProps {
  service: 'goUprite' | 'goStratXpert' | 'CIMSuite PAD' | 'CIMSuite M&E';
  onClick: () => void;
}

const serviceIcons = {
  'goUprite': Bot,
  'goStratXpert': BrainCircuit,
  'CIMSuite PAD': LineChart,
  'CIMSuite M&E': BarChart4,
};

export default function ServiceButton({ service, onClick }: ServiceButtonProps) {
  const Icon = serviceIcons[service];

  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
    >
      <Icon className="w-5 h-5 text-blue-400" />
      <span className="text-white">{service}</span>
    </button>
  );
}