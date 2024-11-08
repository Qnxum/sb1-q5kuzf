import React, { useState } from 'react';
import { Heart, Target, Shield, Users, CheckCircle, AlertCircle, ArrowUpRight } from 'lucide-react';

interface ValuesIntegrationProps {
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

interface Value {
  id: string;
  name: string;
  description: string;
  behaviors: string[];
  metrics: {
    name: string;
    score: number;
    target: number;
  }[];
  status: 'strong' | 'moderate' | 'needsWork';
}

const initialValues: Value[] = [
  {
    id: '1',
    name: 'Innovation',
    description: 'Continuously seeking new and better solutions',
    behaviors: [
      'Encourage creative thinking',
      'Embrace change',
      'Take calculated risks'
    ],
    metrics: [
      { name: 'New ideas implemented', score: 85, target: 100 },
      { name: 'Process improvements', score: 92, target: 100 },
      { name: 'Innovation success rate', score: 78, target: 100 }
    ],
    status: 'strong'
  },
  {
    id: '2',
    name: 'Integrity',
    description: 'Acting with honesty and transparency',
    behaviors: [
      'Be truthful in all interactions',
      'Keep commitments',
      'Take responsibility'
    ],
    metrics: [
      { name: 'Ethics violations', score: 95, target: 100 },
      { name: 'Customer trust ratings', score: 88, target: 100 },
      { name: 'Employee feedback', score: 82, target: 100 }
    ],
    status: 'strong'
  },
  {
    id: '3',
    name: 'Excellence',
    description: 'Striving for the highest quality in everything we do',
    behaviors: [
      'Set high standards',
      'Deliver quality work',
      'Continuously improve'
    ],
    metrics: [
      { name: 'Quality metrics', score: 76, target: 100 },
      { name: 'Customer satisfaction', score: 84, target: 100 },
      { name: 'Performance ratings', score: 89, target: 100 }
    ],
    status: 'moderate'
  }
];

export default function ValuesIntegration({
  isExpanded = true,
  onToggleExpand = () => {}
}: ValuesIntegrationProps) {
  const [values, setValues] = useState<Value[]>(initialValues);

  const getStatusColor = (status: Value['status']) => {
    switch (status) {
      case 'strong':
        return 'text-green-400';
      case 'moderate':
        return 'text-blue-400';
      default:
        return 'text-yellow-400';
    }
  };

  const getStatusIcon = (status: Value['status']) => {
    switch (status) {
      case 'strong':
        return <CheckCircle className="w-5 h-5" />;
      case 'moderate':
        return <ArrowUpRight className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-blue-400';
    return 'text-yellow-400';
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-medium text-white">Values Integration</h3>
          </div>
          <button
            onClick={onToggleExpand}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {isExpanded ? (
              <AlertCircle className="w-5 h-5 text-gray-400" />
            ) : (
              <CheckCircle className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="grid gap-6">
          {values.map((value) => (
            <div key={value.id} className="bg-gray-700/50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-blue-400" />
                  <div>
                    <h4 className="font-medium text-white">{value.name}</h4>
                    <p className="text-sm text-gray-300">{value.description}</p>
                  </div>
                </div>
                <div className={`flex items-center space-x-2 ${getStatusColor(value.status)}`}>
                  {getStatusIcon(value.status)}
                  <span className="text-sm capitalize">{value.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="text-sm font-medium text-white mb-2">Key Behaviors</h5>
                  <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                    {value.behaviors.map((behavior, index) => (
                      <li key={index}>{behavior}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-white mb-2">Metrics</h5>
                  <div className="space-y-2">
                    {value.metrics.map((metric, index) => (
                      <div key={index} className="bg-gray-800 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-300">{metric.name}</span>
                          <span className={`text-sm ${getScoreColor(metric.score)}`}>
                            {metric.score}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${getScoreColor(metric.score).replace('text', 'bg')}`}
                            style={{ width: `${metric.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}