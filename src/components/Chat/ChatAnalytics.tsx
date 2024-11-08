import React from 'react';
import { BarChart2, TrendingUp, TrendingDown } from 'lucide-react';

interface ChatAnalyticsProps {
  analytics: {
    confidence: number;
    relevance: number;
    sentiment: 'positive' | 'neutral' | 'negative';
  };
}

export default function ChatAnalytics({ 
  analytics = {
    confidence: 0,
    relevance: 0,
    sentiment: 'neutral' as const
  }
}: ChatAnalyticsProps) {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-400';
      case 'negative':
        return 'text-red-400';
      default:
        return 'text-yellow-400';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="w-4 h-4" />;
      case 'negative':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <BarChart2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-300">Analysis Results</h4>
        <div className={`flex items-center space-x-1 ${getSentimentColor(analytics.sentiment)}`}>
          {getSentimentIcon(analytics.sentiment)}
          <span className="text-sm capitalize">{analytics.sentiment}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Confidence</span>
            <span>{Math.round(analytics.confidence * 100)}%</span>
          </div>
          <div className="mt-1 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${analytics.confidence * 100}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Relevance</span>
            <span>{Math.round(analytics.relevance * 100)}%</span>
          </div>
          <div className="mt-1 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${analytics.relevance * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}