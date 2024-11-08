import React, { useState } from 'react';
import { Users, MessageCircle, BarChart, UserCheck, Target, Activity, CheckCircle, AlertCircle } from 'lucide-react';

interface StakeholderEngagementProps {
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

interface Stakeholder {
  group: string;
  interest: string;
  influence: 'High' | 'Medium' | 'Low';
  engagement: string;
  strategy: string;
  satisfaction: number;
}

const stakeholders: Stakeholder[] = [
  {
    group: 'Employees',
    interest: 'Career development, work environment',
    influence: 'High',
    engagement: 'Regular meetings, surveys',
    strategy: 'Active involvement in decision-making',
    satisfaction: 85
  },
  {
    group: 'Customers',
    interest: 'Product quality, service',
    influence: 'High',
    engagement: 'Feedback channels, support',
    strategy: 'Regular communication and feedback loops',
    satisfaction: 78
  },
  {
    group: 'Investors',
    interest: 'Financial performance, growth',
    influence: 'High',
    engagement: 'Reports, meetings',
    strategy: 'Transparent communication of results',
    satisfaction: 92
  },
  {
    group: 'Partners',
    interest: 'Collaboration, mutual growth',
    influence: 'Medium',
    engagement: 'Partnership reviews',
    strategy: 'Joint planning and development',
    satisfaction: 88
  }
];

export default function StakeholderEngagement({
  isExpanded = true,
  onToggleExpand = () => {}
}: StakeholderEngagementProps) {
  const [stakeholderList] = useState(stakeholders);

  const getStatusColor = (satisfaction: number) => {
    if (satisfaction >= 90) return 'text-green-400';
    if (satisfaction >= 75) return 'text-blue-400';
    return 'text-yellow-400';
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-medium text-white">Stakeholder Engagement</h3>
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
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <MessageCircle className="w-5 h-5 text-blue-400 mb-2" />
              <h4 className="font-medium text-white mb-2">Communication</h4>
              <p className="text-sm text-gray-300">Establish clear channels for stakeholder dialogue and feedback.</p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <BarChart className="w-5 h-5 text-blue-400 mb-2" />
              <h4 className="font-medium text-white mb-2">Impact Analysis</h4>
              <p className="text-sm text-gray-300">Assess and monitor stakeholder influence and interests.</p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <UserCheck className="w-5 h-5 text-blue-400 mb-2" />
              <h4 className="font-medium text-white mb-2">Engagement Plan</h4>
              <p className="text-sm text-gray-300">Develop and implement targeted engagement strategies.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Stakeholder Group</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Key Interests</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Influence Level</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Engagement Methods</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Engagement Strategy</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Satisfaction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {stakeholderList.map((stakeholder, index) => (
                  <tr key={index} className="hover:bg-gray-700/50">
                    <td className="px-4 py-3 text-sm text-gray-300">{stakeholder.group}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{stakeholder.interest}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        stakeholder.influence === 'High' ? 'bg-blue-400/10 text-blue-400' :
                        stakeholder.influence === 'Medium' ? 'bg-yellow-400/10 text-yellow-400' :
                        'bg-green-400/10 text-green-400'
                      }`}>
                        {stakeholder.influence}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">{stakeholder.engagement}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{stakeholder.strategy}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 h-2 bg-gray-600 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${stakeholder.satisfaction}%` }}
                          />
                        </div>
                        <span className={getStatusColor(stakeholder.satisfaction)}>
                          {stakeholder.satisfaction}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-5 h-5 text-blue-400" />
                <h4 className="font-medium text-white">Action Items</h4>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-300">Quarterly Surveys</span>
                    <span className="text-xs text-blue-400">In Progress</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-full w-3/4 bg-blue-500 rounded-full" />
                  </div>
                </div>
                <div className="p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-300">Engagement Reports</span>
                    <span className="text-xs text-green-400">Completed</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-full w-full bg-green-500 rounded-full" />
                  </div>
                </div>
                <div className="p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-300">Strategy Reviews</span>
                    <span className="text-xs text-yellow-400">Planned</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-full w-1/4 bg-yellow-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-700/50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <Activity className="w-5 h-5 text-blue-400" />
                <h4 className="font-medium text-white">Engagement Metrics</h4>
              </div>
              <div className="text-center p-8">
                <p className="text-sm text-gray-400">Graphs temporarily disabled</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}