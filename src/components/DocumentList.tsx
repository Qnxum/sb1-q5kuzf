import React from 'react';
import { File, X } from 'lucide-react';

interface DocumentListProps {
  documents: File[];
  onRemove?: (index: number) => void;
}

export default function DocumentList({ documents, onRemove }: DocumentListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {documents.map((doc, index) => (
        <div
          key={index}
          className="flex items-center space-x-2 bg-gray-700 rounded-lg px-3 py-1"
        >
          <File className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-gray-200 truncate max-w-[150px]">
            {doc.name}
          </span>
          {onRemove && (
            <button
              onClick={() => onRemove(index)}
              className="p-1 hover:bg-gray-600 rounded-full transition-colors"
            >
              <X className="w-3 h-3 text-gray-400 hover:text-gray-200" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}