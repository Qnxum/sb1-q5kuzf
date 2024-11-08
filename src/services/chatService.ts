import { analyzeContent } from './pdfService';
import { Message, Visualization } from '../components/Chat/types';

interface ChatResponse {
  response: string;
  insights: string[];
  frameworks?: Array<{
    type: 'table' | 'chart' | 'mindmap' | 'timeline';
    title: string;
    content: string;
  }>;
  visualizations?: Visualization[];
  analytics?: {
    confidence: number;
    relevance: number;
    sentiment: 'positive' | 'neutral' | 'negative';
  };
}

export async function generateResponse(
  query: string,
  pdfContent: string[],
  context?: {
    previousMessages?: Array<{ text: string; sender: 'user' | 'ai' }>;
    selectedService?: string;
  }
): Promise<ChatResponse> {
  // Analyze content if PDF is provided
  if (pdfContent.length > 0) {
    const analysis = analyzeContent(pdfContent);
    return {
      response: `I've analyzed the document. Here are my findings:\n\n${analysis.summary}`,
      insights: analysis.recommendations,
      frameworks: analysis.frameworks,
      visualizations: analysis.visualizations.map(viz => ({
        type: viz.type,
        data: viz.data,
        options: {
          colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
          ...viz.options
        }
      })),
      analytics: {
        confidence: analysis.confidence,
        relevance: 0.85,
        sentiment: analysis.sentiment
      }
    };
  }

  // Handle regular chat queries
  return {
    response: `I understand you're asking about "${query}". Let me help you with that.`,
    insights: [
      "Analyzing your request...",
      "Considering context...",
      "Generating insights..."
    ],
    visualizations: [
      {
        type: 'line',
        data: generateSampleData(),
        options: {
          colors: ['#3B82F6'],
          title: 'Trend Analysis',
          xAxis: 'period',
          yAxis: 'value'
        }
      }
    ],
    analytics: {
      confidence: 0.85,
      relevance: 0.9,
      sentiment: 'neutral'
    }
  };
}

function generateSampleData() {
  return Array.from({ length: 12 }, (_, i) => ({
    period: `Period ${i + 1}`,
    value: Math.floor(Math.random() * 100)
  }));
}