import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FileText, Smartphone, Book, Layout, Presentation, Video, Bot, BrainCircuit, LineChart, BarChart4 } from 'lucide-react';

export default function LandingPage() {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const quickStarts = [
    {
      icon: BrainCircuit,
      text: 'Strategy Execution Frameworks with goStratXpert',
      href: '/app'
    },
    {
      icon: Bot,
      text: 'Strategy Formulation Frameworks with goUprite',
      href: '/app'
    },
    {
      icon: LineChart,
      text: 'Performance & Development with CIMSuite PAD',
      href: '/app'
    },
    {
      icon: BarChart4,
      text: 'Monitoring & Evaluation with CIMSuite M&E',
      href: '/app'
    },
    {
      icon: Layout,
      text: 'Custom Framework Development',
      href: '/app'
    },
    {
      icon: FileText,
      text: 'Document Analysis & Insights',
      href: '/app'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/app', { state: { initialPrompt: prompt } });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center px-4 py-16">
      <div className="absolute top-4 right-4 flex space-x-4">
        <Link to="/app" className="text-sm text-gray-400 hover:text-white transition-colors">
          Dashboard
        </Link>
        <a href="#about" className="text-sm text-gray-400 hover:text-white transition-colors">
          About
        </a>
      </div>

      <h1 className="text-5xl font-bold mb-4 text-center">
        StratXpert AI Agency
      </h1>
      <p className="text-xl text-gray-400 mb-8 text-center max-w-2xl">
        Your intelligent partner for strategic planning, process automation, and performance analysis.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl mb-12">
        <div className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="How can StratXpert assist with your business objectives today?"
            className="w-full px-4 py-4 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
          />
          <div className="absolute right-3 top-3 flex space-x-2">
            <button
              type="button"
              className="p-2 hover:bg-gray-800 rounded transition-colors"
              title="Attach file"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <button
              type="button"
              className="p-2 hover:bg-gray-800 rounded transition-colors"
              title="AI Assistant"
            >
              <BrainCircuit className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {quickStarts.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="flex items-center space-x-3 px-4 py-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors group"
          >
            <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
              <item.icon className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-gray-300 font-medium">{item.text}</span>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Powered by Advanced AI Agents</h2>
        <p className="text-gray-400">
          StratXpert coordinates with specialized AI agents to deliver comprehensive business solutions, 
          from strategic planning to performance monitoring.
        </p>
      </div>
    </div>
  );
}