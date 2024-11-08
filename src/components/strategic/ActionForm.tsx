import React, { useState } from 'react';
import { Calendar, User, X } from 'lucide-react';

interface ActionFormProps {
  onSubmit: (action: {
    description: string;
    dueDate: string;
    owner: string;
  }) => void;
  onCancel: () => void;
  initialValues?: {
    description: string;
    dueDate: string;
    owner: string;
  };
}

export default function ActionForm({ 
  onSubmit, 
  onCancel,
  initialValues = {
    description: '',
    dueDate: '',
    owner: ''
  }
}: ActionFormProps) {
  const [description, setDescription] = useState(initialValues.description);
  const [dueDate, setDueDate] = useState(initialValues.dueDate);
  const [owner, setOwner] = useState(initialValues.owner);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      description,
      dueDate,
      owner
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">
            {initialValues.description ? 'Edit Action' : 'New Action'}
          </h3>
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