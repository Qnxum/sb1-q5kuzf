import React, { useCallback, useState, useRef } from 'react';
import { FileUp, ChevronFirst, Loader2, Maximize2, Minimize2, Book } from 'lucide-react';
import DocumentViewer from './DocumentViewer';

interface PDFViewerProps {
  selectedPDF: File | null;
  setSelectedPDF: (file: File | null) => void;
  onFileSelect?: (file: File) => void;
  onToggleCollapse?: () => void;
  isCollapsed?: boolean;
  showCollapseButton?: boolean;
}

export default function PDFViewer({ 
  selectedPDF, 
  setSelectedPDF, 
  onFileSelect,
  onToggleCollapse,
  isCollapsed,
  showCollapseButton = true
}: PDFViewerProps) {
  const [documents, setDocuments] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files).filter(
        file => file.type === 'application/pdf'
      );
      if (files.length) {
        setIsLoading(true);
        setDocuments(prev => [...prev, ...files]);
        onFileSelect?.(files[0]);
      }
    },
    [onFileSelect]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(
      file => file.type === 'application/pdf'
    );
    if (files.length) {
      setIsLoading(true);
      setDocuments(prev => [...prev, ...files]);
      onFileSelect?.(files[0]);
    }
  };

  const handleRemoveDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
    if (documents.length === 1) {
      setSelectedPDF(null);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-950">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Document Viewer</h2>
        {showCollapseButton && selectedPDF && (
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            title={isCollapsed ? "Show document" : "Hide document"}
          >
            <ChevronFirst 
              className={`w-5 h-5 text-gray-400 transform transition-transform ${
                isCollapsed ? 'rotate-180' : ''
              }`}
            />
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col overflow-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
              <p className="text-sm text-gray-200">Processing document...</p>
            </div>
          </div>
        )}

        {documents.length === 0 && (
          <div
            className="flex-1 flex items-center justify-center p-8"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="text-center">
              <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gray-800">
                <FileUp className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-white">
                Upload PDF Document
              </h3>
              <p className="mb-4 text-sm text-gray-400">
                Drag and drop your PDF here, or click to select
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Select PDF
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf"
                multiple
                onChange={handleFileChange}
              />
            </div>
          </div>
        )}

        {documents.length > 0 && (
          <div className="flex-1 min-h-0">
            <DocumentViewer
              documents={documents}
              onRemoveDocument={handleRemoveDocument}
              isExpanded={isExpanded}
              onToggleExpand={() => setIsExpanded(!isExpanded)}
              onDocumentLoad={() => setIsLoading(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}