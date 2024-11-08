import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2, X } from 'lucide-react';

interface LayoutPane {
  id: string;
  type: 'chat' | 'document' | 'agent';
  size: number;
  component: React.ReactNode;
}

interface FlexibleLayoutProps {
  panes: LayoutPane[];
  onRemovePane: (id: string) => void;
  onResizePane: (id: string, newSize: number) => void;
}

export default function FlexibleLayout({
  panes,
  onRemovePane,
  onResizePane
}: FlexibleLayoutProps) {
  const [maximizedPane, setMaximizedPane] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startSizes, setStartSizes] = useState<{ id: string; size: number }[]>([]);

  const handleDragStart = (e: React.MouseEvent, index: number) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartSizes(panes.map(pane => ({ id: pane.id, size: pane.size })));
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
  };

  const handleDragMove = (e: MouseEvent) => {
    if (!isDragging || !startSizes.length) return;

    const deltaX = e.clientX - startX;
    const containerWidth = document.getElementById('flexible-layout')?.clientWidth || 1;
    const deltaPercent = (deltaX / containerWidth) * 100;

    const newSizes = startSizes.map((pane, index) => {
      if (index === startSizes.length - 1) return pane;
      const newSize = Math.max(20, Math.min(80, pane.size + deltaPercent));
      onResizePane(pane.id, newSize);
      return { ...pane, size: newSize };
    });

    setStartSizes(newSizes);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
  };

  return (
    <div 
      id="flexible-layout"
      className="flex-1 flex overflow-hidden relative"
      style={{ cursor: isDragging ? 'col-resize' : 'default' }}
    >
      {panes.map((pane, index) => (
        <React.Fragment key={pane.id}>
          <motion.div
            className={`relative flex flex-col ${
              maximizedPane ? (
                maximizedPane === pane.id ? 'w-full' : 'w-0 opacity-0'
              ) : ''
            }`}
            style={{ 
              width: maximizedPane ? undefined : `${pane.size}%`,
              minWidth: maximizedPane ? undefined : '20%'
            }}
            animate={{ 
              width: maximizedPane ? (
                maximizedPane === pane.id ? '100%' : '0%'
              ) : `${pane.size}%`
            }}
          >
            <div className="absolute top-2 right-2 z-10 flex items-center space-x-2">
              <button
                onClick={() => setMaximizedPane(
                  maximizedPane === pane.id ? null : pane.id
                )}
                className="p-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
              >
                {maximizedPane === pane.id ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => onRemovePane(pane.id)}
                className="p-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-hidden">
              {pane.component}
            </div>

            {index < panes.length - 1 && !maximizedPane && (
              <div
                className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize bg-gray-800 hover:bg-blue-500 transition-colors"
                onMouseDown={(e) => handleDragStart(e, index)}
              />
            )}
          </motion.div>
        </React.Fragment>
      ))}
    </div>
  );
}