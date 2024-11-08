import React, { useState } from 'react';
import { Calendar, User, X, Target } from 'lucide-react';

interface GoalFormProps {
  onSubmit: (goal: {
    text: string;
    timeframe: 'short' | 'mid' | 'long';
    status: 'pending' | 'inProgress' | 'completed';
    alignment: number;
  }) => void;
  onCancel: () => void;
  initialValues?: {
    text: string;
    timeframe: 'short' | 'mid' | 'long';
    status: 'pending' | 'inProgress' | 'completed';
    alignment: number;
  };
}

export default function GoalForm({
  onSubmit,
  onCancel,
  initialValues = {
    text: '',
    timeframe: 'short' as const,
    status: 'pending' as const,
    alignment: 85
  }
}: GoalFormProps) {
  const [text, setText] = useState(initialValues.text);
  const [timeframe, setTimeframe] = useState(initialValues.timeframe);
  const [status, setStatus] = useState(initialValues.status);
  const [alignment, setAlignment] = useState(initialValues.alignment);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      text,
      timeframe,
      status,
      alignment
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-medium text-white">
              {initialValues.text ? 'Edit Goal' : 'New Goal'}
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
            <label htmlFor="text" className="block text-sm font-medium text-gray-300 mb-1">
              Goal Description
            </label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="timeframe" className="block text-sm font-medium text-gray-300 mb-1">
                Timeframe
              </label>
              <select
                id="timeframe"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value as 'short' | 'mid' | 'long')}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="short">Short-term</option>
                <option value="mid">Mid-term</option>
                <option value="long">Long-term</option>
              </select>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as 'pending' | 'inProgress' | 'completed')}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="pending">Pending</option>
                <option value="inProgress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="alignment" className="block text-sm font-medium text-gray-300 mb-1">
              Vision Alignment (%)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                id="alignment"
                value={alignment}
                onChange={(e) => setAlignment(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                min="0"
                max="100"
                step="5"
              />
              <span className="text-sm text-gray-300 w-12 text-right">{alignment}%</span>
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
              {initialValues.text ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}