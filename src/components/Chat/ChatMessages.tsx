import React, { useRef, useEffect } from 'react';
import { Message } from './types';
import ChatMessage from './ChatMessage';
import ChatAnalytics from './ChatAnalytics';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatViewMode } from './index';

interface ChatMessagesProps {
  messages: Message[];
  onFeedback?: (messageId: string, feedback: 'up' | 'down') => void;
  theme?: 'default' | 'minimal' | 'compact';
  viewMode: ChatViewMode;
}

export default function ChatMessages({ 
  messages = [], 
  onFeedback = () => {}, 
  theme = 'default',
  viewMode
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getMessageStyle = () => {
    switch (viewMode) {
      case 'bubbles':
        return 'space-y-2';
      case 'selection':
        return 'space-y-4 px-4';
      case 'strategic':
        return 'space-y-4 px-6';
      default:
        return 'space-y-4';
    }
  };

  const getMessageSize = () => {
    switch (theme) {
      case 'compact':
        return 'max-w-[70%]';
      case 'minimal':
        return 'max-w-[80%]';
      default:
        return 'max-w-[85%]';
    }
  };

  return (
    <div className={getMessageStyle()}>
      <AnimatePresence initial={false}>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`${getMessageSize()}`}
          >
            <ChatMessage
              message={message}
              onFeedback={onFeedback}
              theme={theme}
              viewMode={viewMode}
            />
            {message.analytics && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChatAnalytics analytics={message.analytics} />
              </motion.div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </div>
  );
}