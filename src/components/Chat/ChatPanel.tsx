import React, { useState } from 'react';
import ViewManager, { ViewMode } from './ViewManager';
import ChatMessages from './ChatMessages';
import { Message } from './types';

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  onFeedback?: (messageId: string, feedback: 'up' | 'down') => void;
}

export default function ChatPanel({
  messages,
  onSendMessage,
  onFeedback = () => {}
}: ChatPanelProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('split');

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <ViewManager currentMode={viewMode} onModeChange={setViewMode} />
      
      <div className="flex-1 flex overflow-hidden">
        {(viewMode === 'chat' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} overflow-y-auto`}>
            <ChatMessages
              messages={messages}
              onFeedback={onFeedback}
            />
          </div>
        )}
        
        {(viewMode === 'views' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} border-l border-gray-700 overflow-y-auto`}>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-white mb-4">Strategic Views</h2>
              {/* Strategic views content will be rendered here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}