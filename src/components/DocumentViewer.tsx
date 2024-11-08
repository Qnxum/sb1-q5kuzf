import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, FileText, X, Maximize2, Minimize2, Book } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface DocumentViewerProps {
  documents: File[];
  onRemoveDocument: (index: number) => void;
  onDocumentLoad?: (text: string[]) => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export default function DocumentViewer({
  documents,
  onRemoveDocument,
  onDocumentLoad,
  isExpanded,
  onToggleExpand
}: DocumentViewerProps) {
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [showToolbar, setShowToolbar] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const currentDocument = documents[currentDocIndex];

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setIsLoading(false);
    onDocumentLoad?.([]);
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => {
      const newPageNumber = prevPageNumber + offset;
      return Math.min(Math.max(1, newPageNumber), numPages);
    });
  };

  const changeDocument = (offset: number) => {
    setCurrentDocIndex(prevIndex => {
      const newIndex = prevIndex + offset;
      return Math.min(Math.max(0, newIndex), documents.length - 1);
    });
    setPageNumber(1);
    setIsLoading(true);
  };

  const handleRemove = useCallback((index: number) => {
    if (index === currentDocIndex && index === documents.length - 1) {
      setCurrentDocIndex(Math.max(0, index - 1));
    }
    onRemoveDocument(index);
  }, [currentDocIndex, documents.length, onRemoveDocument]);

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Document Tabs */}
      <div className="flex items-center p-2 bg-gray-800 overflow-x-auto">
        {documents.map((doc, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg mr-2 min-w-max ${
              index === currentDocIndex
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <div
              onClick={() => {
                setCurrentDocIndex(index);
                setIsLoading(true);
              }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span className="truncate max-w-[150px]">{doc.name}</span>
            </div>
            <button
              onClick={() => handleRemove(index)}
              className="ml-2 p-1 rounded-full hover:bg-gray-700/50"
              aria-label="Remove document"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      {showToolbar && (
        <div className="flex items-center justify-between p-2 bg-gray-800 border-t border-gray-700">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => changeDocument(-1)}
              disabled={currentDocIndex === 0}
              className={`p-1 rounded hover:bg-gray-700 ${
                currentDocIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-5 h-5 text-gray-300" />
            </button>
            <span className="text-sm text-gray-300">
              Document {currentDocIndex + 1} of {documents.length}
            </span>
            <button
              onClick={() => changeDocument(1)}
              disabled={currentDocIndex === documents.length - 1}
              className={`p-1 rounded hover:bg-gray-700 ${
                currentDocIndex === documents.length - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
              className="p-1 rounded hover:bg-gray-700"
            >
              <Book className="w-5 h-5 text-gray-300" />
            </button>
            <span className="text-sm text-gray-300 min-w-[4rem] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setScale(s => Math.min(2, s + 0.1))}
              className="p-1 rounded hover:bg-gray-700"
            >
              <Book className="w-5 h-5 text-gray-300 transform rotate-180" />
            </button>
            <button
              onClick={onToggleExpand}
              className="p-1 rounded hover:bg-gray-700"
            >
              {isExpanded ? (
                <Minimize2 className="w-5 h-5 text-gray-300" />
              ) : (
                <Maximize2 className="w-5 h-5 text-gray-300" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Document Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="min-h-full flex flex-col items-center">
          <Document
            file={currentDocument}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center w-full h-32">
                <div className="animate-pulse flex space-x-4">
                  <div className="h-20 w-3/4 bg-gray-700 rounded"></div>
                </div>
              </div>
            }
            error={
              <div className="text-red-500 text-center p-4">
                Error loading document. Please try again.
              </div>
            }
          >
            <Page
              key={`page_${pageNumber}`}
              pageNumber={pageNumber}
              scale={scale}
              className="mb-4"
              loading={
                <div className="animate-pulse flex space-x-4">
                  <div className="h-96 w-full bg-gray-700 rounded"></div>
                </div>
              }
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        </div>
      </div>

      {/* Page Navigation */}
      <div className="flex items-center justify-between p-2 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => changePage(-1)}
            disabled={pageNumber <= 1}
            className={`p-1 rounded hover:bg-gray-700 ${
              pageNumber <= 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-5 h-5 text-gray-300" />
          </button>
          <span className="text-sm text-gray-300">
            Page {pageNumber} of {numPages}
          </span>
          <button
            onClick={() => changePage(1)}
            disabled={pageNumber >= numPages}
            className={`p-1 rounded hover:bg-gray-700 ${
              pageNumber >= numPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  );
}