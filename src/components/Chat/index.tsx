import React, { useState } from 'react';
import { Message } from './types';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import ChatSidebar from './ChatSidebar';
import ChatViewSelector from './ChatViewSelector';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatProps {
  selectedPDF: File | null;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export type ChatViewMode = 'full' | 'bubbles' | 'selection' | 'strategic';

export default function Chat({
  selectedPDF,
  isExpanded,
  onToggleExpand
}: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      text: "Hello! I'm StratXpert, your AI strategic planning assistant. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [input, setInput] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [showEnhancedPrompt, setShowEnhancedPrompt] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<'default' | 'minimal' | 'compact'>('default');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [viewMode, setViewMode] = useState<ChatViewMode>('full');

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
  };

  const handleFeedback = (messageId: string, feedback: 'up' | 'down') => {
    setMessages(prev => prev.map(message => 
      message.id === messageId 
        ? { ...message, feedback: message.feedback === feedback ? null : feedback }
        : message
    ));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachedFiles(prev => [...prev, ...files]);
    if (files.length > 0) {
      setViewMode('selection');
    }
  };

  return (
    <div className="h-full flex bg-gray-900">
      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-r border-gray-800"
          >
            <ChatSidebar
              selectedTheme={selectedTheme}
              onThemeChange={setSelectedTheme}
              notificationsEnabled={notificationsEnabled}
              onNotificationsChange={setNotificationsEnabled}
              soundEnabled={soundEnabled}
              onSoundChange={setSoundEnabled}
              onClose={() => setIsSidebarOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader 
          isExpanded={isExpanded}
          onToggleExpand={onToggleExpand}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <ChatViewSelector
          activeView={viewMode}
          onViewChange={setViewMode}
        />
        
        <div className="flex-1 overflow-y-auto p-4">
          <ChatMessages
            messages={messages}
            onFeedback={handleFeedback}
            theme={selectedTheme}
            viewMode={viewMode}
          />
        </div>
        
        <ChatInput
          input={input}
          onInputChange={setInput}
          onSend={() => handleSendMessage(input)}
          onFileSelect={handleFileSelect}
          onToggleEnhancedPrompt={() => setShowEnhancedPrompt(!showEnhancedPrompt)}
          showEnhancedPrompt={showEnhancedPrompt}
          attachedFiles={attachedFiles}
          onRemoveAttachment={(index) => {
            setAttachedFiles(prev => prev.filter((_, i) => i !== index));
          }}
          theme={selectedTheme}
          viewMode={viewMode}
        />
      </div>
    </div>
  );
}