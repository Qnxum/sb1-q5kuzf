import React, { useState, useRef, useEffect } from 'react';
import { Send, BrainCircuit, ChevronFirst, ThumbsUp, ThumbsDown, Loader2, Paperclip, Sparkles, MessageSquare } from 'lucide-react';
import { extractTextFromPDF, analyzeContent } from '../services/pdfService';
import ServiceSelector from './ServiceSelector';
import StrategicOptions from './StrategicOptions';
import FrameworkGenerator from './FrameworkGenerator';
import DocumentList from './DocumentList';
import { Message, EnhancedPromptType } from './Chat/types';
import ChatHeader from './Chat/ChatHeader';
import ChatInput from './Chat/ChatInput';
import ChatMessage from './Chat/ChatMessage';
import EnhancedPrompts from './Chat/EnhancedPrompts';
import { 
  StrategicFramework,
  RiskManagement,
  StakeholderEngagement,
  VisionMission,
  ValuesIntegration,
  BalancedScorecard
} from './strategic';

interface ChatProps {
  selectedPDF: File | null;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onToggleDocument: () => void;
  isDocumentCollapsed: boolean;
}

const enhancedPrompts = [
  {
    type: 'analyze' as EnhancedPromptType,
    label: 'Analyze Document',
    prompt: 'Please perform a comprehensive analysis of the document, focusing on key themes, patterns, and insights.'
  },
  {
    type: 'compare' as EnhancedPromptType,
    label: 'Compare Documents',
    prompt: 'Please compare the content, structure, and key points of the uploaded documents.'
  },
  {
    type: 'extract' as EnhancedPromptType,
    label: 'Extract Key Points',
    prompt: 'Please extract and list the main points and critical information from the document.'
  },
  {
    type: 'summarize' as EnhancedPromptType,
    label: 'Generate Summary',
    prompt: 'Please provide a concise summary of the document, highlighting the most important aspects.'
  }
];

const renderStrategicComponent = (componentId: string) => {
  switch (componentId) {
    case 'strategic-framework':
      return <StrategicFramework />;
    case 'risk':
      return <RiskManagement />;
    case 'stakeholder':
      return <StakeholderEngagement />;
    case 'vision-mission':
      return <VisionMission />;
    case 'values':
      return <ValuesIntegration />;
    case 'balanced-scorecard':
      return <BalancedScorecard />;
    default:
      return null;
  }
};

export default function Chat({
  selectedPDF,
  isExpanded,
  onToggleExpand,
  onToggleDocument,
  isDocumentCollapsed
}: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      text: "Hello! I'm StratXpert, your AI strategic planning assistant. I coordinate with specialized agents to help analyze documents and generate comprehensive frameworks. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showStrategicOptions, setShowStrategicOptions] = useState(false);
  const [chatState, setChatState] = useState<'initial' | 'service-selection' | 'strategic-options' | 'pdf-chat'>('initial');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [showEnhancedPrompt, setShowEnhancedPrompt] = useState(false);
  const [activePrompt, setActivePrompt] = useState<EnhancedPromptType | null>(null);
  const [isProcessingPDF, setIsProcessingPDF] = useState(false);
  const [pdfContent, setPdfContent] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const processPDF = async () => {
      if (selectedPDF && chatState === 'initial') {
        setIsProcessingPDF(true);
        try {
          const content = await extractTextFromPDF(selectedPDF);
          setPdfContent(content);
          setChatState('service-selection');
          const uploadMessage: Message = {
            id: generateUniqueId(),
            text: "I've processed your document. You can now select a strategic analysis service.",
            sender: 'ai',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, uploadMessage]);
        } catch (error) {
          const errorMessage: Message = {
            id: generateUniqueId(),
            text: "I encountered an error processing your PDF. Please ensure it's a valid document and try again.",
            sender: 'ai',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, errorMessage]);
        } finally {
          setIsProcessingPDF(false);
        }
      }
    };

    processPDF();
  }, [selectedPDF, chatState]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleFeedback = (messageId: string, feedback: 'up' | 'down') => {
    setMessages(prev => prev.map(message => 
      message.id === messageId 
        ? { ...message, feedback: message.feedback === feedback ? null : feedback }
        : message
    ));
  };

  const handleFileAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachedFiles(prev => [...prev, ...files]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    setChatState('strategic-options');
    const aiResponse: Message = {
      id: generateUniqueId(),
      text: `I'll assist you using ${service}. How would you like to proceed with the analysis?`,
      sender: 'ai',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, aiResponse]);
    setShowStrategicOptions(true);
  };

  const handleStrategicOptionSelect = (optionId: string) => {
    setChatState('pdf-chat');
    const aiResponse: Message = {
      id: generateUniqueId(),
      text: `I'll help you with ${optionId}. Here's the analysis:`,
      sender: 'ai',
      timestamp: new Date(),
      component: optionId,
    };
    setMessages(prev => [...prev, aiResponse]);
    
    // Collapse document view when showing strategic component
    if (onToggleDocument) {
      onToggleDocument();
    }
  };

  const handleSend = async () => {
    if (!input.trim() && attachedFiles.length === 0) return;

    const userMessage: Message = {
      id: generateUniqueId(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
      attachments: attachedFiles,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setAttachedFiles([]);
    setShowEnhancedPrompt(false);
  };

  return (
    <div className="h-full flex flex-col bg-gray-950" ref={chatContainerRef}>
      <ChatHeader 
        isExpanded={isExpanded}
        onToggleExpand={onToggleExpand}
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <React.Fragment key={message.id}>
            <ChatMessage
              message={message}
              onFeedback={handleFeedback}
              onRemoveAttachment={removeAttachment}
            />
            {message.component && (
              <div className="mt-4">
                {renderStrategicComponent(message.component)}
              </div>
            )}
          </React.Fragment>
        ))}
        {selectedPDF && chatState === 'service-selection' && (
          <div className="mt-4">
            <ServiceSelector onSelect={handleServiceSelect} />
          </div>
        )}
        {showStrategicOptions && (
          <div className="mt-4">
            <StrategicOptions onSelect={handleStrategicOptionSelect} />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {showEnhancedPrompt && (
        <EnhancedPrompts
          prompts={enhancedPrompts}
          activePrompt={activePrompt}
          onPromptSelect={setActivePrompt}
        />
      )}

      <ChatInput
        input={input}
        onInputChange={setInput}
        onSend={handleSend}
        onFileSelect={handleFileAttachment}
        onToggleEnhancedPrompt={() => setShowEnhancedPrompt(!showEnhancedPrompt)}
        showEnhancedPrompt={showEnhancedPrompt}
        attachedFiles={attachedFiles}
        onRemoveAttachment={removeAttachment}
        fileInputRef={fileInputRef}
      />
    </div>
  );
}