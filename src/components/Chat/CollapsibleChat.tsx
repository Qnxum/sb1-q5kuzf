import React, { useState, useCallback } from 'react';
import { MessageSquare, Users, FileText, Settings, Maximize2, Minimize2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import DocumentList from '../DocumentList';
import { Message } from './types';

interface CollapsibleChatProps {
  messages: Message[];
  onSendMessage: (text: string, attachments?: File[]) => void;
  onFeedback: (messageId: string, feedback: 'up' | 'down') => void;
  attachedFiles: File[];
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveAttachment: (index: number) => void;
  documents?: File[];
  onRemoveDocument?: (index: number) => void;
  isAnalyzing: boolean;
  showEnhancedPrompt: boolean;
  onToggleEnhancedPrompt: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  showExpandButton: boolean;
}

export default function CollapsibleChat({
  messages,
  onSendMessage,
  onFeedback,
  attachedFiles,
  onFileSelect,
  onRemoveAttachment,
  documents = [],
  onRemoveDocument,
  isAnalyzing,
  showEnhancedPrompt,
  onToggleEnhancedPrompt,
  isExpanded,
  onToggleExpand,
  showExpandButton
}: CollapsibleChatProps) {
  const [sections, setSections] = useState({
    messages: true,
    documents: true,
    participants: false,
    settings: false
  });
  const [input, setInput] = useState('');

  const toggleSection = useCallback((section: keyof typeof sections) => {
    setSections(prev => ({ ...prev, [section]: !prev[section] }));
  }, []);

  const handleSend = useCallback(() => {
    if (input.trim() || attachedFiles.length > 0) {
      onSendMessage(input, attachedFiles);
      setInput('');
    }
  }, [input, attachedFiles, onSendMessage]);

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <motion.div
        initial={false}
        animate={{ height: 'auto' }}
        className="border-b border-gray-700"
      >
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Chat</h2>
          {showExpandButton && (
            <button
              onClick={onToggleExpand}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              aria-label={isExpanded ? 'Collapse chat' : 'Expand chat'}
            >
              {isExpanded ? (
                <Minimize2 className="w-5 h-5 text-gray-400" />
              ) : (
                <Maximize2 className="w-5 h-5 text-gray-400" />
              )}
            </button>
          )}
        </div>
      </motion.div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence initial={false}>
          {/* Messages Section */}
          <Section
            title="Messages"
            icon={<MessageSquare className="w-5 h-5" />}
            isOpen={sections.messages}
            onToggle={() => toggleSection('messages')}
            badge={messages.filter(m => !m.read).length}
          >
            <ChatMessages
              messages={messages}
              onFeedback={onFeedback}
              isAnalyzing={isAnalyzing}
            />
          </Section>

          {/* Documents Section */}
          <Section
            title="Documents"
            icon={<FileText className="w-5 h-5" />}
            isOpen={sections.documents}
            onToggle={() => toggleSection('documents')}
            badge={documents.length}
          >
            <DocumentList
              documents={documents}
              onRemove={onRemoveDocument}
            />
          </Section>

          {/* Participants Section */}
          <Section
            title="Participants"
            icon={<Users className="w-5 h-5" />}
            isOpen={sections.participants}
            onToggle={() => toggleSection('participants')}
          >
            <div className="text-sm text-gray-400">
              No other participants in this conversation.
            </div>
          </Section>

          {/* Settings Section */}
          <Section
            title="Settings"
            icon={<Settings className="w-5 h-5" />}
            isOpen={sections.settings}
            onToggle={() => toggleSection('settings')}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Notifications</span>
                <button className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-gray-200 rounded">
                  Enabled
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Sound</span>
                <button className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-gray-200 rounded">
                  Disabled
                </button>
              </div>
            </div>
          </Section>
        </AnimatePresence>
      </div>

      <ChatInput
        input={input}
        onInputChange={setInput}
        onSend={handleSend}
        onFileSelect={onFileSelect}
        showEnhancedPrompt={showEnhancedPrompt}
        onToggleEnhancedPrompt={onToggleEnhancedPrompt}
        attachedFiles={attachedFiles}
        onRemoveAttachment={onRemoveAttachment}
        fileInputRef={null}
      />
    </div>
  );
}

interface SectionProps {
  title: string;
  icon?: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  badge?: number;
}

function Section({ title, icon, isOpen, onToggle, children, badge }: SectionProps) {
  return (
    <motion.div
      initial={false}
      animate={{ backgroundColor: isOpen ? 'rgba(31, 41, 55, 0.5)' : 'transparent' }}
      className="border-b border-gray-700"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center space-x-2">
          {icon && <span className="text-gray-400">{icon}</span>}
          <span className="font-medium text-gray-200">{title}</span>
          {badge !== undefined && badge > 0 && (
            <span className="px-2 py-0.5 text-xs bg-blue-500/10 text-blue-400 rounded-full">
              {badge}
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}