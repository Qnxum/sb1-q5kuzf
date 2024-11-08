import React from 'react';
import { BrainCircuit, LineChart, BarChart3, PieChart } from 'lucide-react';

interface ServiceSelectorProps {
  onSelect: (service: string) => void;
}

export default function ServiceSelector({ onSelect }: ServiceSelectorProps) {
  const services = [
    {
      id: 'goStratXpert',
      name: 'goStratXpert',
      icon: BrainCircuit,
      description: 'Strategy Execution Frameworks'
    },
    {
      id: 'goUprite',
      name: 'goUprite',
      icon: LineChart,
      description: 'Strategy Formulation Frameworks'
    },
    {
      id: 'CIMSuite PAD',
      name: 'CIMSuite PAD',
      icon: BarChart3,
      description: 'Performance & Development'
    },
    {
      id: 'CIMSuite M&E',
      name: 'CIMSuite M&E',
      icon: PieChart,
      description: 'Monitoring & Evaluation'
    }
  ];

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        Please select how you would like me to be of service:
      </p>
      <div className="grid grid-cols-1 gap-2">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onSelect(service.name)}
            className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-left"
          >
            <service.icon className="w-5 h-5 text-blue-500" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                {service.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {service.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}