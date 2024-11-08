import React, { useState } from 'react';
import { Calendar, User, X, AlertTriangle } from 'lucide-react';

interface RiskActionFormProps {
  onSubmit: (action: {
    description: string;
    dueDate: string;
    owner: string;
    priority: 'high' | 'medium' | 'low';
    type: 'preventive' | 'detective' | 'corrective';
  }) => void;
  onCancel: () => void;
  initialValues?: {
    description: string;
    dueDate: string;
    owner: string;
    priority: 'high' | 'medium' | 'low';
    type: 'preventive' | 'detective' | 'corrective';
  };
}

export default function RiskActionForm({
  onSubmit,
  onCancel,
  initialValues = {
    description: '',
    dueDate: '',
    owner: '',
    priority: 'medium' as const,
    type: 'preventive' as const
  }
}: RiskActionFormProps) {
  const [description, setDescription] = useState(initialValues.description);
  const [dueDate, setDueDate] = useState(initialValues.dueDate);
  const [owner, setOwner] = useState(initialValues.owner);
  const [priority, setPriority] = useState(initialValues.priority);
  const [type, setType] = useState(initialValues.type);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      description,
      dueDate,
      owner,
      priority,
      type
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-medium text-white">
              {initialValues.description ? 'Edit Risk Action' : 'New Risk Action'}
            </h3>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-300 mb-1">
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">
                Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as 'preventive' | 'detective' | 'corrective')}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="preventive">Preventive</option>
                <option value="detective">Detective</option>
                <option value="corrective">Corrective</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-300 mb-1">
              Due Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="owner" className="block text-sm font-medium text-gray-300 mb-1">
              Owner
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="owner"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
            >
              {initialValues.description ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}