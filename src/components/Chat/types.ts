export type EnhancedPromptType = 'analyze' | 'compare' | 'extract' | 'summarize' | 'visualize' | 'predict';

export interface EnhancedPrompt {
  type: EnhancedPromptType;
  label: string;
  prompt: string;
}

export interface Visualization {
  type: 'line' | 'bar' | 'pie' | 'area';
  data: any[];
  options?: {
    colors?: string[];
    title?: string;
    xAxis?: string;
    yAxis?: string;
  };
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  frameworks?: Array<{
    type: 'table' | 'chart' | 'mindmap' | 'timeline';
    title: string;
    content: string;
  }>;
  feedback?: 'up' | 'down' | null;
  isProcessing?: boolean;
  contextPage?: number;
  attachments?: File[];
  insights?: string[];
  component?: string;
  visualizations?: Visualization[];
  analytics?: {
    confidence: number;
    relevance: number;
    sentiment: 'positive' | 'neutral' | 'negative';
  };
}