import React from 'react';
import { MessageSquare, FileText, Columns, Users } from 'lucide-react';

export type ViewMode = 'chat' | 'document' | 'split' | 'agent' | 'custom';

interface ViewToggleProps {
  activeView: ViewMode;
  onViewToggle: (view: ViewMode) => void;
  availableViews?: ('chat' | 'document' | 'agent')[];
}

export default function ViewToggle({ 
  activeView, 
  onViewToggle,
  availableViews = ['document', 'chat', 'agent']
}: ViewToggleProps) {
  const views = [
    {
      id: 'document' as const,
      icon: FileText,
      label: 'Document View',
      description: 'View and analyze documents'
    },
    {
      id: 'chat' as const,
      icon: MessageSquare,
      label: 'Chat View',
      description: 'Interact with StratXpert'
    },
    {
      id: 'agent' as const,
      icon: Users,
      label: 'Sub Agent View',
      description: 'Work with specialized agents'
    },
    {
      id: 'split' as const,
      icon: Columns,
      label: 'Split View',
      description: 'Customize your workspace'
    }
  ];

  return (
    <div className="flex items-center justify-center space-x-2 p-2 bg-gray-800 border-b dark:border-gray-700">
      {views.map((view) => (
        ((view.id === 'split' || availableViews.includes(view.id)) && (
          <button
            key={view.id}
            onClick={() => onViewToggle(view.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeView === view.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:bg-gray-700'
            }`}
            title={view.description}
          >
            <view.icon className="w-5 h-5" />
            <span>{view.label}</span>
          </button>
        ))
      ))}
    </div>
  );
}