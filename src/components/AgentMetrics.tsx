import React from 'react';
import { Activity, CheckCircle, Clock } from 'lucide-react';

interface AgentMetricsProps {
  progress: number;
  tasks: number;
  completedTasks: number;
}

export default function AgentMetrics({ progress, tasks, completedTasks }: AgentMetricsProps) {
  const getProgressColor = (value: number) => {
    if (value >= 90) return 'text-green-400';
    if (value >= 70) return 'text-blue-400';
    return 'text-yellow-400';
  };

  return (
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-2">
        <Activity className={`w-5 h-5 ${getProgressColor(progress)}`} />
        <div>
          <div className="text-sm font-medium text-white">{progress}%</div>
          <div className="text-xs text-gray-400">Progress</div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <CheckCircle className="w-5 h-5 text-green-400" />
        <div>
          <div className="text-sm font-medium text-white">{completedTasks}/{tasks}</div>
          <div className="text-xs text-gray-400">Tasks</div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Clock className="w-5 h-5 text-blue-400" />
        <div>
          <div className="text-sm font-medium text-white">Active</div>
          <div className="text-xs text-gray-400">Status</div>
        </div>
      </div>
    </div>
  );
}