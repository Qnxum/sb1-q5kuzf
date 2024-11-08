import React, { useState } from 'react';
import { 
  BrainCircuit, Bot, LineChart, BarChart4, ChevronRight, Users, Target, 
  Clock, ChevronLeft, X, Search, Filter, Activity, CheckCircle, AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AgentContent from './AgentContent';
import AgentMetrics from './AgentMetrics';

interface AgentPanelProps {
  onAgentSelect: (agent: string) => void;
  selectedAgent: string | null;
  onClose?: () => void;
}

const agents = [
  {
    id: 'goStratXpert',
    name: 'goStratXpert',
    icon: BrainCircuit,
    description: 'Strategy Execution Frameworks',
    capabilities: [
      'Strategic framework analysis',
      'Implementation planning',
      'Performance tracking'
    ],
    category: 'Strategy',
    components: ['StrategicFramework', 'RiskManagement', 'StakeholderEngagement'],
    status: 'active',
    progress: 85,
    tasks: 12,
    completedTasks: 8
  },
  {
    id: 'goUprite',
    name: 'goUprite',
    icon: Bot,
    description: 'Strategy Formulation Frameworks',
    capabilities: [
      'Strategy development',
      'Market analysis',
      'Competitive positioning'
    ],
    category: 'Strategy',
    components: ['VisionMission', 'ValuesIntegration'],
    status: 'active',
    progress: 92,
    tasks: 8,
    completedTasks: 7
  },
  {
    id: 'CIMSuite PAD',
    name: 'CIMSuite PAD',
    icon: LineChart,
    description: 'Performance & Development',
    capabilities: [
      'Performance analytics',
      'Development tracking',
      'Growth metrics'
    ],
    category: 'Performance',
    components: ['BalancedScorecard'],
    status: 'active',
    progress: 78,
    tasks: 15,
    completedTasks: 10
  },
  {
    id: 'CIMSuite M&E',
    name: 'CIMSuite M&E',
    icon: Clock,
    description: 'Monitoring & Evaluation',
    capabilities: [
      'Progress monitoring',
      'Impact evaluation',
      'Results tracking'
    ],
    category: 'Performance',
    components: ['RiskManagement', 'StakeholderEngagement'],
    status: 'active',
    progress: 65,
    tasks: 18,
    completedTasks: 11
  }
];

const categories = ['Strategy', 'Performance', 'Analysis'];

export default function AgentPanel({ onAgentSelect, selectedAgent, onClose }: AgentPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const selectedAgentData = agents.find(agent => agent.id === selectedAgent);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
    const matchesCategory = !selectedCategory || agent.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleAgentSelect = (agentId: string) => {
    onAgentSelect(agentId);
    setSelectedCategory(agents.find(agent => agent.id === agentId)?.category || null);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 70) return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  return (
    <div className="h-full bg-gray-900 border-l border-gray-800">
      <div className="flex h-full">
        <motion.div
          initial={{ width: 320 }}
          animate={{ width: isExpanded ? 320 : 64 }}
          transition={{ duration: 0.2 }}
          className="h-full flex flex-col overflow-hidden border-r border-gray-800"
        >
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1"
                >
                  <h2 className="text-lg font-semibold text-white">StratXpert Sub-Agents</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Select an agent to analyze your document
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400"
              >
                {isExpanded ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 overflow-hidden flex flex-col"
              >
                <div className="p-4 border-b border-gray-800">
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search agents..."
                      className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                      className="bg-gray-800 text-white text-sm rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <div className="flex space-x-2 p-4 border-b border-gray-800 overflow-x-auto">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                        !selectedCategory
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      All
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(
                          selectedCategory === category ? null : category
                        )}
                        className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                          selectedCategory === category
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  <div className="p-4 space-y-3">
                    {filteredAgents.map((agent) => (
                      <button
                        key={agent.id}
                        onClick={() => handleAgentSelect(agent.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all transform hover:scale-[1.02] ${
                          selectedAgent === agent.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${
                            selectedAgent === agent.id ? 'bg-blue-500' : 'bg-gray-700'
                          }`}>
                            <agent.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium truncate">{agent.name}</h3>
                              <Activity className={`w-4 h-4 ${
                                agent.status === 'active' ? 'text-green-400' : 'text-gray-400'
                              }`} />
                            </div>
                            <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                              {agent.description}
                            </p>
                            
                            <div className="mt-3">
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span className={selectedAgent === agent.id ? 'text-blue-200' : 'text-gray-400'}>
                                  Progress
                                </span>
                                <span className={selectedAgent === agent.id ? 'text-blue-200' : 'text-gray-400'}>
                                  {agent.progress}%
                                </span>
                              </div>
                              <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${getProgressColor(agent.progress)}`}
                                  style={{ width: `${agent.progress}%` }}
                                />
                              </div>
                            </div>

                            <div className="mt-3 flex items-center justify-between text-sm">
                              <div className={`flex items-center space-x-1 ${
                                selectedAgent === agent.id ? 'text-blue-200' : 'text-gray-400'
                              }`}>
                                <CheckCircle className="w-4 h-4" />
                                <span>{agent.completedTasks}/{agent.tasks} tasks</span>
                              </div>
                              <ChevronRight className={`w-4 h-4 ${
                                selectedAgent === agent.id ? 'text-white' : 'text-gray-400'
                              }`} />
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isExpanded && (
            <div className="flex-1 py-2">
              {agents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => handleAgentSelect(agent.id)}
                  className={`w-full p-2 flex justify-center hover:bg-gray-800 transition-colors ${
                    selectedAgent === agent.id ? 'text-blue-400' : 'text-gray-400'
                  }`}
                  title={agent.name}
                >
                  <agent.icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {selectedAgent && selectedAgentData && (
          <div className="flex-1 overflow-y-auto">
            <div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <selectedAgentData.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {selectedAgentData.name}
                    </h2>
                    <p className="text-sm text-gray-400">
                      {selectedAgentData.description}
                    </p>
                  </div>
                </div>
                <AgentMetrics
                  progress={selectedAgentData.progress}
                  tasks={selectedAgentData.tasks}
                  completedTasks={selectedAgentData.completedTasks}
                />
              </div>
            </div>
            <div className="p-4">
              <AgentContent
                agentId={selectedAgentData.id}
                components={selectedAgentData.components}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}