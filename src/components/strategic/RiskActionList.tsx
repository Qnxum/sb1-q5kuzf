import React from 'react';
import { CheckCircle, ArrowUpRight, AlertCircle, User, Calendar, Edit2, Trash2, AlertTriangle } from 'lucide-react';

interface RiskAction {
  id: string;
  description: string;
  status: 'pending' | 'inProgress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  type: 'preventive' | 'detective' | 'corrective';
  dueDate: string;
  owner: string;
}

interface RiskActionListProps {
  actions: RiskAction[];
  onEdit: (action: RiskAction) => void;
  onDelete: (actionId: string) => void;
  onStatusChange: (actionId: string, newStatus: RiskAction['status']) => void;
}

export default function RiskActionList({
  actions,
  onEdit,
  onDelete,
  onStatusChange
}: RiskActionListProps) {
  const getStatusColor = (status: RiskAction['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'inProgress':
        return 'text-blue-400';
      default:
        return 'text-yellow-400';
    }
  };

  const getPriorityColor = (priority: RiskAction['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-400/10 text-red-400';
      case 'medium':
        return 'bg-yellow-400/10 text-yellow-400';
      default:
        return 'bg-green-400/10 text-green-400';
    }
  };

  const getNextStatus = (currentStatus: RiskAction['status']): RiskAction['status'] => {
    switch (currentStatus) {
      case 'pending':
        return 'inProgress';
      case 'inProgress':
        return 'completed';
      case 'completed':
        return 'pending';
      default:
        return 'pending';
    }
  };

  return (
    <div className="space-y-2">
      {actions.map((action) => (
        <div
          key={action.id}
          className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700/50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onStatusChange(action.id, getNextStatus(action.status))}
              className={`p-1 rounded-lg hover:bg-gray-700 transition-colors ${getStatusColor(action.status)}`}
              title="Change status"
            >
              {action.status === 'completed' ? (
                <CheckCircle className="w-4 h-4" />
              ) : action.status === 'inProgress' ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
            </button>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-300">{action.description}</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(action.priority)}`}>
                  {action.priority}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {action.type}
                </span>
              </div>
            </div>
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
              <button
                onClick={() => onEdit(action)}
                className="p-1 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
                title="Edit action"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(action.id)}
                className="p-1 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
                title="Delete action"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}