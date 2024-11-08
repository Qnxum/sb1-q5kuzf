import React, { useState } from 'react';
import { AlertTriangle, Shield, Target, CheckCircle, AlertCircle, Search, Filter, ArrowUpRight } from 'lucide-react';

interface RiskManagementProps {
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

interface Risk {
  id: string;
  category: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  likelihood: 'High' | 'Medium' | 'Low';
  mitigation: string;
  status: 'active' | 'mitigated' | 'monitoring';
  progress: number;
  owner: string;
  dueDate: string;
}

const initialRisks: Risk[] = [
  {
    id: '1',
    category: 'Strategic',
    description: 'Market competition intensifies',
    impact: 'High',
    likelihood: 'Medium',
    mitigation: 'Continuous market analysis and agile strategy adaptation',
    status: 'active',
    progress: 65,
    owner: 'Strategy Team',
    dueDate: '2024-06-30'
  },
  {
    id: '2',
    category: 'Operational',
    description: 'Resource constraints',
    impact: 'Medium',
    likelihood: 'High',
    mitigation: 'Implement resource optimization and allocation framework',
    status: 'monitoring',
    progress: 82,
    owner: 'Operations Team',
    dueDate: '2024-05-15'
  },
  {
    id: '3',
    category: 'Financial',
    description: 'Budget overruns',
    impact: 'High',
    likelihood: 'Medium',
    mitigation: 'Regular financial monitoring and control measures',
    status: 'mitigated',
    progress: 95,
    owner: 'Finance Team',
    dueDate: '2024-04-30'
  }
];

export default function RiskManagement({
  isExpanded = true,
  onToggleExpand = () => {}
}: RiskManagementProps) {
  const [risks, setRisks] = useState<Risk[]>(initialRisks);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Risk['status'] | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const getImpactColor = (impact: Risk['impact']) => {
    switch (impact) {
      case 'High':
        return 'bg-red-400/10 text-red-400';
      case 'Medium':
        return 'bg-yellow-400/10 text-yellow-400';
      default:
        return 'bg-green-400/10 text-green-400';
    }
  };

  const getStatusColor = (status: Risk['status']) => {
    switch (status) {
      case 'mitigated':
        return 'text-green-400';
      case 'monitoring':
        return 'text-blue-400';
      default:
        return 'text-yellow-400';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 85) return 'bg-green-500';
    if (progress >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const categories = Array.from(new Set(risks.map(risk => risk.category)));

  const filteredRisks = risks.filter(risk => {
    const matchesSearch = Object.values(risk).some(
      value => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesStatus = statusFilter === 'all' || risk.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || risk.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-medium text-white">Risk Management</h3>
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

      {isExpanded && (
        <>
          <div className="p-4 border-b border-gray-700 bg-gray-800/50">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search risks..."
                  className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as Risk['status'] | 'all')}
                  className="bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="mitigated">Mitigated</option>
                  <option value="monitoring">Monitoring</option>
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="p-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Description</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Impact</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Likelihood</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Mitigation Progress</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Owner</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredRisks.map((risk) => (
                  <tr key={risk.id} className="hover:bg-gray-700/50">
                    <td className="px-4 py-3">
                      <div className={`flex items-center space-x-2 ${getStatusColor(risk.status)}`}>
                        {risk.status === 'mitigated' ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : risk.status === 'monitoring' ? (
                          <ArrowUpRight className="w-5 h-5" />
                        ) : (
                          <AlertCircle className="w-5 h-5" />
                        )}
                        <span className="text-sm capitalize">{risk.status}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">{risk.category}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{risk.description}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getImpactColor(risk.impact)}`}>
                        {risk.impact}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getImpactColor(risk.likelihood)}`}>
                        {risk.likelihood}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${getProgressColor(risk.progress)}`}
                            style={{ width: `${risk.progress}%` }}
                          />
                        </div>
                        <span className={`text-sm ${getStatusColor(risk.status)}`}>
                          {risk.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">{risk.owner}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{risk.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}