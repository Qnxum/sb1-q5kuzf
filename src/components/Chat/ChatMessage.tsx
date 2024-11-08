import React from 'react';
import { ThumbsUp, ThumbsDown, Loader2, MessageSquare, BrainCircuit } from 'lucide-react';
import { Message } from './types';
import { ChatViewMode } from './index';
import DocumentList from '../DocumentList';

interface ChatMessageProps {
  message: Message;
  onFeedback: (messageId: string, feedback: 'up' | 'down') => void;
  theme?: 'default' | 'minimal' | 'compact';
  viewMode: ChatViewMode;
}

export default function ChatMessage({
  message,
  onFeedback,
  theme = 'default',
  viewMode
}: ChatMessageProps) {
  const getMessageStyle = () => {
    const baseStyle = 'rounded-lg p-3';
    const colorStyle = message.sender === 'user'
      ? 'bg-blue-600 text-white'
      : 'bg-gray-800 text-white';
    
    switch (viewMode) {
      case 'bubbles':
        return `${baseStyle} ${colorStyle} shadow-lg`;
      case 'selection':
        return `${baseStyle} ${colorStyle} border border-gray-700`;
      case 'strategic':
        return `${baseStyle} ${colorStyle} border-l-4 border-blue-500`;
      default:
        return `${baseStyle} ${colorStyle}`;
    }
  };

  const getTextStyle = () => {
    switch (theme) {
      case 'compact':
        return 'text-sm leading-relaxed';
      case 'minimal':
        return 'text-base leading-relaxed';
      default:
        return 'text-base leading-relaxed';
    }
  };

  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={getMessageStyle()}>
        {message.sender === 'ai' && message.id === 'initial' && (
          <div className="flex items-center space-x-2 mb-2">
            <BrainCircuit className="w-5 h-5 text-blue-400" />
            <span className="font-semibold text-blue-400">StratXpert</span>
          </div>
        )}

        {message.isProcessing ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{message.text}</span>
          </div>
        ) : (
          <>
            <p className={getTextStyle()}>{message.text}</p>

            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-2">
                <DocumentList documents={message.attachments} />
              </div>
            )}

            {message.sender === 'ai' && !message.isProcessing && (
              <div className="mt-2 flex items-center space-x-2">
                <button
                  onClick={() => onFeedback(message.id, 'up')}
                  className={`p-1 rounded hover:bg-gray-700 transition-colors ${
                    message.feedback === 'up' ? 'text-green-500' : 'text-gray-400'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onFeedback(message.id, 'down')}
                  className={`p-1 rounded hover:bg-gray-700 transition-colors ${
                    message.feedback === 'down' ? 'text-red-500' : 'text-gray-400'
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                </button>
              </div>
            )}

            <span className="text-xs opacity-70 mt-2 block">
              {message.timestamp.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
              })}
            </span>
          </>
        )}
      </div>
    </div>
  );
}