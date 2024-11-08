import React from 'react';
import { BrainCircuit, ChevronFirst, Menu } from 'lucide-react';

interface ChatHeaderProps {
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export default function ChatHeader({ 
  isExpanded = false,
  onToggleExpand = () => {},
  isSidebarOpen = true,
  onToggleSidebar = () => {}
}: ChatHeaderProps) {
  return (
    <div className="p-4 border-b border-gray-800 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
          title={isSidebarOpen ? "Hide settings" : "Show settings"}
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2">
          <BrainCircuit className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-white">StratXpert</h2>
        </div>
      </div>
      <button
        onClick={onToggleExpand}
        className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
        title={isExpanded ? "Collapse chat" : "Expand chat"}
      >
        <ChevronFirst 
          className={`w-5 h-5 text-gray-400 transform transition-transform ${
            isExpanded ? '' : 'rotate-180'
          }`}
        />
      </button>
    </div>
  );
}