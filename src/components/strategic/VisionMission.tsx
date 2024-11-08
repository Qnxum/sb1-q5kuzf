import React, { useState } from 'react';
import { Eye, Target, Compass, ArrowUpRight, CheckCircle, AlertCircle } from 'lucide-react';

interface VisionMissionProps {
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

interface Goal {
  id: string;
  text: string;
  timeframe: 'short' | 'mid' | 'long';
  status: 'pending' | 'inProgress' | 'completed';
  alignment: number;
}

export default function VisionMission({
  isExpanded = true,
  onToggleExpand = () => {}
}: VisionMissionProps) {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      text: 'Market expansion',
      timeframe: 'short',
      status: 'inProgress',
      alignment: 85
    },
    {
      id: '2',
      text: 'Industry leadership',
      timeframe: 'mid',
      status: 'pending',
      alignment: 92
    },
    {
      id: '3',
      text: 'Global presence',
      timeframe: 'long',
      status: 'pending',
      alignment: 78
    }
  ]);

  const getStatusColor = (status: Goal['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'inProgress':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  const getAlignmentColor = (alignment: number) => {
    if (alignment >= 90) return 'text-green-400';
    if (alignment >= 70) return 'text-blue-400';
    return 'text-yellow-400';
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-medium text-white">Vision & Mission</h3>
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
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700/50 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <Compass className="w-5 h-5 text-blue-400" />
                <h4 className="font-medium text-white">Vision Statement</h4>
              </div>
              <p className="text-sm text-gray-300 mb-4">
                To be the global leader in innovative solutions that transform industries and enhance lives.
              </p>
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-white">Key Components:</h5>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                  <li>Future-oriented perspective</li>
                  <li>Aspirational goals</li>
                  <li>Global impact</li>
                  <li>Innovation focus</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-700/50 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-5 h-5 text-blue-400" />
                <h4 className="font-medium text-white">Mission Statement</h4>
              </div>
              <p className="text-sm text-gray-300 mb-4">
                We deliver exceptional value through innovative solutions, fostering sustainable growth and positive impact for our stakeholders.
              </p>
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-white">Key Components:</h5>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                  <li>Core purpose</li>
                  <li>Value proposition</li>
                  <li>Stakeholder focus</li>
                  <li>Sustainability commitment</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-700/50 p-6 rounded-lg">
            <div className="flex items-center space-x-2 mb-4">
              <ArrowUpRight className="w-5 h-5 text-blue-400" />
              <h4 className="font-medium text-white">Strategic Alignment</h4>
            </div>
            <div className="space-y-4">
              {['short', 'mid', 'long'].map((timeframe) => (
                <div key={timeframe}>
                  <h5 className="text-sm font-medium text-white mb-2 capitalize">
                    {timeframe}-term Goals
                  </h5>
                  <div className="space-y-2">
                    {goals
                      .filter((goal) => goal.timeframe === timeframe)
                      .map((goal) => (
                        <div
                          key={goal.id}
                          className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`${getStatusColor(goal.status)}`}>
                              {goal.status === 'completed' ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : goal.status === 'inProgress' ? (
                                <ArrowUpRight className="w-5 h-5" />
                              ) : (
                                <AlertCircle className="w-5 h-5" />
                              )}
                            </div>
                            <span className="text-sm text-gray-300">{goal.text}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm ${getAlignmentColor(goal.alignment)}`}>
                              {goal.alignment}% aligned
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}