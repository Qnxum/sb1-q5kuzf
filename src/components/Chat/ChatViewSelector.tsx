import React from 'react';
import { MessageSquare, MessageCircle, List, Target } from 'lucide-react';

export type ChatViewMode = 'full' | 'bubbles' | 'selection' | 'strategic';

interface ChatViewSelectorProps {
  activeView: ChatViewMode;
  onViewChange: (view: ChatViewMode) => void;
}

const views = [
  {
    id: 'full' as const,
    icon: MessageSquare,
    label: 'Full View',
    description: 'Messages, bubbles, and options'
  },
  {
    id: 'bubbles' as const,
    icon: MessageCircle,
    label: 'Chat Only',
    description: 'Message bubbles'
  },
  {
    id: 'selection' as const,
    icon: List,
    label: 'Selection',
    description: 'Service selection'
  },
  {
    id: 'strategic' as const,
    icon: Target,
    label: 'Strategic',
    description: 'Strategic options'
  }
];

export default function ChatViewSelector({
  activeView = 'full',
  onViewChange = () => {}
}: ChatViewSelectorProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b dark:border-gray-700 bg-gray-800/50">
      <div className="flex space-x-2">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => onViewChange(view.id)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors ${
              activeView === view.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:bg-gray-700'
            }`}
            title={view.description}
          >
            <view.icon className="w-4 h-4" />
            <span className="text-sm">{view.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}