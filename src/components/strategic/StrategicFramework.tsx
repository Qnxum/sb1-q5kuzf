import React, { useState } from 'react';
import { 
  Table, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  AlertCircle, 
  Filter, 
  Search, 
  ArrowUpRight,
  Plus,
  Edit2,
  Trash2,
  MoreHorizontal,
  Calendar,
  User
} from 'lucide-react';

interface StrategicFrameworkProps {
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

interface StrategicPillar {
  id: string;
  pillar: string;
  problemStatement: string;
  goals: string;
  longTermOutcomes: string;
  midTermOutcomes: string;
  shortTermOutcomes: string;
  outputs: string;
  activities: string;
  inputs: string;
  impactStatement: string;
  status: 'onTrack' | 'atRisk' | 'offTrack';
  progress: number;
  owner: string;
  dueDate: string;
  actions: Action[];
}

interface Action {
  id: string;
  description: string;
  status: 'pending' | 'inProgress' | 'completed';
  dueDate: string;
  owner: string;
}

const initialPillars: StrategicPillar[] = [
  {
    id: '1',
    pillar: 'Strategic Planning',
    problemStatement: 'Lack of clear organizational direction',
    goals: 'Establish clear strategic vision',
    longTermOutcomes: 'Sustainable competitive advantage',
    midTermOutcomes: 'Improved market position',
    shortTermOutcomes: 'Clear objectives defined',
    outputs: 'Strategic plan document',
    activities: 'Stakeholder workshops',
    inputs: 'Market analysis data',
    impactStatement: 'Enhanced organizational direction',
    status: 'onTrack',
    progress: 85,
    owner: 'Strategy Team',
    dueDate: '2024-06-30',
    actions: [
      {
        id: 'a1',
        description: 'Conduct stakeholder analysis',
        status: 'completed',
        dueDate: '2024-03-15',
        owner: 'John Doe'
      },
      {
        id: 'a2',
        description: 'Develop strategic objectives',
        status: 'inProgress',
        dueDate: '2024-04-30',
        owner: 'Jane Smith'
      }
    ]
  },
  {
    id: '2',
    pillar: 'Operational Excellence',
    problemStatement: 'Inefficient processes',
    goals: 'Optimize operations',
    longTermOutcomes: 'Industry-leading efficiency',
    midTermOutcomes: 'Streamlined workflows',
    shortTermOutcomes: 'Process improvements',
    outputs: 'Efficiency metrics',
    activities: 'Process mapping',
    inputs: 'Current process data',
    impactStatement: 'Improved operational efficiency',
    status: 'atRisk',
    progress: 72,
    owner: 'Operations Team',
    dueDate: '2024-05-15',
    actions: [
      {
        id: 'a3',
        description: 'Map current processes',
        status: 'completed',
        dueDate: '2024-03-01',
        owner: 'Mike Johnson'
      },
      {
        id: 'a4',
        description: 'Identify improvement areas',
        status: 'inProgress',
        dueDate: '2024-04-15',
        owner: 'Sarah Wilson'
      }
    ]
  },
  {
    id: '3',
    pillar: 'Innovation',
    problemStatement: 'Limited new product development',
    goals: 'Drive innovation',
    longTermOutcomes: 'Market leadership',
    midTermOutcomes: 'New product launches',
    shortTermOutcomes: 'Prototype development',
    outputs: 'Innovation metrics',
    activities: 'R&D initiatives',
    inputs: 'Research resources',
    impactStatement: 'Enhanced market competitiveness',
    status: 'onTrack',
    progress: 88,
    owner: 'Innovation Team',
    dueDate: '2024-07-31',
    actions: [
      {
        id: 'a5',
        description: 'Research market trends',
        status: 'completed',
        dueDate: '2024-02-28',
        owner: 'Alex Brown'
      },
      {
        id: 'a6',
        description: 'Develop prototype',
        status: 'pending',
        dueDate: '2024-05-31',
        owner: 'Chris Lee'
      }
    ]
  }
];

export default function StrategicFramework({ 
  isExpanded = true, 
  onToggleExpand = () => {} 
}: StrategicFrameworkProps) {
  const [pillars, setPillars] = useState<StrategicPillar[]>(initialPillars);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StrategicPillar['status'] | 'all'>('all');
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);
  const [showActions, setShowActions] = useState<boolean>(false);

  const getStatusColor = (status: StrategicPillar['status']) => {
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

  const getActionStatusColor = (status: Action['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'inProgress':
        return 'text-blue-400';
      default:
        return 'text-yellow-400';
    }
  };

  const filteredPillars = pillars.filter(pillar => {
    const matchesSearch = Object.values(pillar).some(
      value => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesStatus = statusFilter === 'all' || pillar.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedPillarData = selectedPillar 
    ? pillars.find(p => p.id === selectedPillar)
    : null;

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Table className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-medium text-white">Strategic Framework</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-400 hover:text-white"
              title={showActions ? "Hide actions" : "Show actions"}
            >
              {showActions ? <Table className="w-5 h-5" /> : <MoreHorizontal className="w-5 h-5" />}
            </button>
            <button
              onClick={onToggleExpand}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
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
                  placeholder="Search framework..."
                  className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as StrategicPillar['status'] | 'all')}
                  className="bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="onTrack">On Track</option>
                  <option value="atRisk">At Risk</option>
                  <option value="offTrack">Off Track</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Pillars</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Problem Statement</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Goals</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Progress</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Owner</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Due Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredPillars.map((pillar) => (
                  <React.Fragment key={pillar.id}>
                    <tr 
                      className={`hover:bg-gray-700/50 cursor-pointer ${
                        selectedPillar === pillar.id ? 'bg-gray-700/50' : ''
                      }`}
                      onClick={() => setSelectedPillar(
                        selectedPillar === pillar.id ? null : pillar.id
                      )}
                    >
                      <td className="px-4 py-3">
                        <div className={`flex items-center space-x-2 ${getStatusColor(pillar.status)}`}>
                          {pillar.status === 'onTrack' ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : pillar.status === 'atRisk' ? (
                            <ArrowUpRight className="w-5 h-5" />
                          ) : (
                            <AlertCircle className="w-5 h-5" />
                          )}
                          <span className="text-sm capitalize">{pillar.status}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">{pillar.pillar}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{pillar.problemStatement}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{pillar.goals}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${getProgressColor(pillar.progress)}`}
                              style={{ width: `${pillar.progress}%` }}
                            />
                          </div>
                          <span className={`text-sm ${getStatusColor(pillar.status)}`}>
                            {pillar.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span>{pillar.owner}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{pillar.dueDate}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        <div className="flex items-center space-x-2">
                          <span className="bg-gray-700 px-2 py-1 rounded-full text-xs">
                            {pillar.actions.length} actions
                          </span>
                        </div>
                      </td>
                    </tr>
                    {selectedPillar === pillar.id && (
                      <tr>
                        <td colSpan={8} className="px-4 py-4 bg-gray-700/30">
                          <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-white">Long-term Outcomes</h4>
                                <p className="text-sm text-gray-300">{pillar.longTermOutcomes}</p>
                              </div>
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-white">Mid-term Outcomes</h4>
                                <p className="text-sm text-gray-300">{pillar.midTermOutcomes}</p>
                              </div>
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-white">Short-term Outcomes</h4>
                                <p className="text-sm text-gray-300">{pillar.shortTermOutcomes}</p>
                              </div>
                            </div>

                            {showActions && (
                              <div className="mt-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="text-sm font-medium text-white">Action Items</h4>
                                  <button
                                    className="flex items-center space-x-1 text-sm text-blue-400 hover:text-blue-300"
                                  >
                                    <Plus className="w-4 h-4" />
                                    <span>Add Action</span>
                                  </button>
                                </div>
                                <div className="space-y-2">
                                  {pillar.actions.map((action) => (
                                    <div
                                      key={action.id}
                                      className="flex items-center justify-between p-2 bg-gray-800 rounded-lg"
                                    >
                                      <div className="flex items-center space-x-3">
                                        <div className={getActionStatusColor(action.status)}>
                                          {action.status === 'completed' ? (
                                            <CheckCircle className="w-4 h-4" />
                                          ) : action.status === 'inProgress' ? (
                                            <ArrowUpRight className="w-4 h-4" />
                                          ) : (
                                            <AlertCircle className="w-4 h-4" />
                                          )}
                                        </div>
                                        <span className="text-sm text-gray-300">{action.description}</span>
                                      </div>
                                      <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                                          <User className="w-4 h-4" />
                                          <span>{action.owner}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                                          <Calendar className="w-4 h-4" />
                                          <span>{action.dueDate}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <button className="p-1 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white">
                                            <Edit2 className="w-4 h-4" />
                                          </button>
                                          <button className="p-1 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white">
                                            <Trash2 className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}