import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Sparkles, X } from 'lucide-react';
import { ChatViewMode } from './index';
import DocumentList from '../DocumentList';

interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleEnhancedPrompt: () => void;
  showEnhancedPrompt: boolean;
  attachedFiles: File[];
  onRemoveAttachment: (index: number) => void;
  theme?: 'default' | 'minimal' | 'compact';
  viewMode: ChatViewMode;
}

export default function ChatInput({
  input,
  onInputChange,
  onSend,
  onFileSelect,
  onToggleEnhancedPrompt,
  showEnhancedPrompt,
  attachedFiles,
  onRemoveAttachment,
  theme = 'default',
  viewMode
}: ChatInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [rows, setRows] = useState(1);

  useEffect(() => {
    const lines = input.split('\n').length;
    setRows(Math.min(Math.max(lines, 1), 5));
  }, [input]);

  const getInputStyle = () => {
    const baseStyle = 'w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none resize-none transition-shadow duration-200';
    
    switch (viewMode) {
      case 'selection':
        return `${baseStyle} border border-gray-700`;
      case 'strategic':
        return `${baseStyle} border-l-4 border-blue-500`;
      default:
        return baseStyle;
    }
  };

  return (
    <div className="p-4 border-t border-gray-800">
      {attachedFiles.length > 0 && (
        <div className="mb-2">
          <DocumentList 
            documents={attachedFiles}
            onRemove={onRemoveAttachment}
          />
        </div>
      )}

      <div className="flex items-end space-x-2">
        <div className="flex-1 relative">
          <textarea
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Type your message..."
            rows={rows}
            className={`${getInputStyle()} ${
              isFocused ? 'ring-2 ring-blue-500' : ''
            }`}
          />
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-lg hover:bg-gray-800 transition-all transform hover:scale-110 active:scale-95 text-gray-400 hover:text-gray-300"
            title="Attach files"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <button
            onClick={onToggleEnhancedPrompt}
            className={`p-2 rounded-lg hover:bg-gray-800 transition-all transform hover:scale-110 active:scale-95 ${
              showEnhancedPrompt ? 'text-blue-500' : 'text-gray-400 hover:text-gray-300'
            }`}
            title="Enhanced prompt options"
          >
            <Sparkles className="w-5 h-5" />
          </button>
          <button
            onClick={onSend}
            disabled={!input.trim() && attachedFiles.length === 0}
            className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-110 active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        onChange={onFileSelect}
        className="hidden"
        multiple
      />
    </div>
  );
}