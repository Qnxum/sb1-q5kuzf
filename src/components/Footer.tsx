import React from 'react';
import { BrainCircuit } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="h-16 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="h-full flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300">
        <span>Powered by</span>
        <BrainCircuit className="w-5 h-5 text-blue-500" />
        <span className="font-semibold">StratXpert</span>
      </div>
    </footer>
  );
}