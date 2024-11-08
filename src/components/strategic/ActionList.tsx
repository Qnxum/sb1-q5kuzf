import React from 'react';
import { CheckCircle, ArrowUpRight, AlertCircle, User, Calendar, Edit2, Trash2 } from 'lucide-react';

interface Action {
  id: string;
  description: string;
  status: 'pending' | 'inProgress' | 'completed';
  dueDate: string;
  owner: string;
}

interface ActionListProps {
  actions: Action[];
  onEdit: (action: Action) => void;
  onDelete: (actionId: string) => void;
  onStatusChange: (actionId: string, newStatus: Action['status']) => void;
}

export default function ActionList({
  actions,
  onEdit,
  onDelete,
  onStatusChange
}: ActionListProps) {
  const getStatusColor = (status: Action['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'inProgress':
        return 'text-blue-400';
      default:
        return 'text-yellow-400';
    }
  };

  const getNextStatus = (currentStatus: Action['status']): Action['status'] => {
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
          className="flex items-center justify-between p-2 bg-gray-800 rounded-lg hover:bg-gray-700/50 transition-colors"
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