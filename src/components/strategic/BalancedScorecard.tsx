import React, { useState } from 'react';
import { LayoutDashboard, DollarSign, Users, Settings, Lightbulb, CheckCircle, AlertCircle } from 'lucide-react';

interface BalancedScorecardProps {
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

interface Perspective {
  id: string;
  name: string;
  icon: React.ElementType;
  objectives: string[];
  measures: string[];
  targets: string[];
  initiatives: string[];
  status: 'onTrack' | 'atRisk' | 'offTrack';
  progress: number;
}

const initialPerspectives: Perspective[] = [
  {
    id: '1',
    name: 'Financial',
    icon: DollarSign,
    objectives: ['Increase revenue', 'Reduce costs', 'Improve ROI'],
    measures: ['Revenue growth', 'Cost reduction', 'ROI percentage'],
    targets: ['+15% YoY', '-10% costs', '20% ROI'],
    initiatives: ['Market expansion', 'Cost optimization', 'Investment strategy'],
    status: 'onTrack',
    progress: 85
  },
  {
    id: '2',
    name: 'Customer',
    icon: Users,
    objectives: ['Improve satisfaction', 'Increase retention', 'Expand base'],
    measures: ['CSAT score', 'Retention rate', 'New customers'],
    targets: ['95% CSAT', '90% retention', '+20% customers'],
    initiatives: ['CX program', 'Loyalty rewards', 'Market penetration'],
    status: 'atRisk',
    progress: 72
  },
  {
    id: '3',
    name: 'Internal Process',
    icon: Settings,
    objectives: ['Optimize operations', 'Enhance quality', 'Reduce cycle time'],
    measures: ['Process efficiency', 'Quality metrics', 'Cycle time'],
    targets: ['95% efficiency', '99% quality', '-25% cycle time'],
    initiatives: ['Process automation', 'Quality program', 'Lean implementation'],
    status: 'onTrack',
    progress: 88
  },
  {
    id: '4',
    name: 'Learning & Growth',
    icon: Lightbulb,
    objectives: ['Develop talent', 'Foster innovation', 'Enhance culture'],
    measures: ['Training completion', 'Innovation rate', 'Employee engagement'],
    targets: ['100% trained', '+25% innovation', '90% engagement'],
    initiatives: ['Training program', 'Innovation lab', 'Culture initiatives'],
    status: 'atRisk',
    progress: 68
  }
];

export default function BalancedScorecard({
  isExpanded = true,
  onToggleExpand = () => {}
}: BalancedScorecardProps) {
  const [perspectives, setPerspectives] = useState<Perspective[]>(initialPerspectives);

  const getStatusColor = (status: Perspective['status']) => {
    switch (status) {
      case 'onTrack':
        return 'text-green-400';
      case 'atRisk':
        return 'text-yellow-400';
      default:
        return 'text-red-400';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 85) return 'bg-green-500';
    if (progress >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <LayoutDashboard className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-medium text-white">Balanced Scorecard</h3>
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
        <div className="grid grid-cols-2 gap-4">
          {perspectives.map((perspective) => (
            <div key={perspective.id} className="bg-gray-700/50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <perspective.icon className="w-5 h-5 text-blue-400" />
                  <h4 className="font-medium text-white">{perspective.name} Perspective</h4>
                </div>
                <div className={`flex items-center space-x-2 ${getStatusColor(perspective.status)}`}>
                  {perspective.status === 'onTrack' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <span className="text-sm capitalize">{perspective.status}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">Overall Progress</span>
                  <span className={`text-sm ${getStatusColor(perspective.status)}`}>
                    {perspective.progress}%
                  </span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${getProgressColor(perspective.progress)}`}
                    style={{ width: `${perspective.progress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-white mb-2">Objectives</h5>
                  <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                    {perspective.objectives.map((objective, idx) => (
                      <li key={idx}>{objective}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-white mb-2">Measures</h5>
                  <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                    {perspective.measures.map((measure, idx) => (
                      <li key={idx}>{measure}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-white mb-2">Targets</h5>
                  <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                    {perspective.targets.map((target, idx) => (
                      <li key={idx}>{target}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-white mb-2">Initiatives</h5>
                  <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                    {perspective.initiatives.map((initiative, idx) => (
                      <li key={idx}>{initiative}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}