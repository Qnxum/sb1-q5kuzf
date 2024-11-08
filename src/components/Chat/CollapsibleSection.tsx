import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CollapsibleSectionProps {
  title: string;
  icon?: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  badge?: number;
}

export default function CollapsibleSection({
  title,
  icon = null,
  isOpen,
  onToggle,
  children,
  badge
}: CollapsibleSectionProps) {
  return (
    <div className="border-b border-gray-700">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-700/50 transition-colors"
        aria-expanded={isOpen}
        aria-controls={`section-${title}`}
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
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`section-${title}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-gray-800/50">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}