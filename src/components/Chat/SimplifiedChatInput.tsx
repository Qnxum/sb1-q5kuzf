import React, { useState, useRef } from 'react';
import { Send, Paperclip } from 'lucide-react';

interface SimplifiedChatInputProps {
  onSend: (text: string, files?: File[]) => void;
  value: string;
  onChange: (value: string) => void;
  attachedFiles: File[];
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveAttachment: (index: number) => void;
}

export default function SimplifiedChatInput({
  onSend = () => {},
  value = '',
  onChange = () => {},
  attachedFiles = [],
  onFileSelect = () => {},
  onRemoveAttachment = () => {}
}: SimplifiedChatInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (value.trim() || attachedFiles.length > 0) {
      onSend(value, attachedFiles);
      onChange('');
    }
  };

  return (
    <div className="p-4 border-t dark:border-gray-700">
      <div className="flex items-center space-x-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Type your message..."
            className={`w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none transition-shadow duration-200 ${
              isFocused ? 'ring-2 ring-blue-500' : ''
            }`}
          />
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-lg hover:bg-gray-800 transition-all transform hover:scale-110 active:scale-95 text-gray-400 hover:text-gray-300"
          title="Attach files"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <button
          onClick={handleSend}
          disabled={!value.trim() && attachedFiles.length === 0}
          className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-110 active:scale-95"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {attachedFiles.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {attachedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-gray-700 rounded-lg px-3 py-1"
            >
              <Paperclip className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-200 truncate max-w-[150px]">
                {file.name}
              </span>
              <button
                onClick={() => onRemoveAttachment(index)}
                className="p-1 hover:bg-gray-600 rounded-full transition-colors"
              >
                <svg className="w-3 h-3 text-gray-400 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

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