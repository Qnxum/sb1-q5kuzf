import React from 'react';
import { Loader2, FileText, BarChart2, GitBranch, Clock } from 'lucide-react';

interface EnhancedPrompt {
  type: 'analyze' | 'compare' | 'extract' | 'summarize';
  label: string;
  prompt: string;
}

interface EnhancedPromptsProps {
  prompts: EnhancedPrompt[];
  activePrompt: string | null;
  onPromptSelect: (type: EnhancedPrompt['type']) => void;
}

const promptIcons = {
  analyze: BarChart2,
  compare: GitBranch,
  extract: FileText,
  summarize: Clock,
};

export default function EnhancedPrompts({ prompts, activePrompt, onPromptSelect }: EnhancedPromptsProps) {
  return (
    <div className="p-4 bg-gray-800 border-t border-gray-700">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-300">Enhanced Prompt Options</h3>
        <div className="grid grid-cols-2 gap-2">
          {prompts.map((prompt) => {
            const Icon = promptIcons[prompt.type];
            return (
              <button
                key={prompt.type}
                onClick={() => onPromptSelect(prompt.type)}
                disabled={activePrompt !== null}
                className={`text-sm p-3 rounded-lg text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                  activePrompt === prompt.type
                    ? 'bg-blue-600 cursor-wait'
                    : 'bg-gray-700 hover:bg-gray-600'
                } ${activePrompt !== null && activePrompt !== prompt.type ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center space-x-2">
                  {activePrompt === prompt.type ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                  <span>{prompt.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}