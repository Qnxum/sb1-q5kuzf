import React from 'react';
import { MessageSquare, Layout, Columns } from 'lucide-react';

export type ViewMode = 'chat' | 'views' | 'split';

interface ViewManagerProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

export default function ViewManager({ 
  currentMode = 'split',
  onModeChange = () => {}
}: ViewManagerProps) {
  return (
    <div className="flex items-center justify-center space-x-2 p-2 bg-gray-800 border-b dark:border-gray-700">
      <button
        onClick={() => onModeChange('chat')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          currentMode === 'chat'
            ? 'bg-blue-600 text-white'
            : 'text-gray-400 hover:bg-gray-700'
        }`}
      >
        <MessageSquare className="w-5 h-5" />
        <span>Chat Only</span>
      </button>
      <button
        onClick={() => onModeChange('views')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          currentMode === 'views'
            ? 'bg-blue-600 text-white'
            : 'text-gray-400 hover:bg-gray-700'
        }`}
      >
        <Layout className="w-5 h-5" />
        <span>Views Only</span>
      </button>
      <button
        onClick={() => onModeChange('split')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          currentMode === 'split'
            ? 'bg-blue-600 text-white'
            : 'text-gray-400 hover:bg-gray-700'
        }`}
      >
        <Columns className="w-5 h-5" />
        <span>Split View</span>
      </button>
    </div>
  );
}