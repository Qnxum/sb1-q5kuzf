import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PDFViewer from './components/PDFViewer';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import Footer from './components/Footer';
import ViewToggle from './components/ViewToggle';
import AgentPanel from './components/AgentPanel';
import FlexibleLayout from './components/FlexibleLayout';

type ViewMode = 'chat' | 'document' | 'split' | 'agent' | 'custom';

interface LayoutPane {
  id: string;
  type: 'chat' | 'document' | 'agent';
  size: number;
  component: React.ReactNode;
}

function MainApp() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState<File | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [showAgentPanel, setShowAgentPanel] = useState(false);
  const [activeView, setActiveView] = useState<ViewMode>('split');
  const [layoutPanes, setLayoutPanes] = useState<LayoutPane[]>([
    {
      id: 'document',
      type: 'document',
      size: 50,
      component: (
        <PDFViewer
          selectedPDF={selectedPDF}
          setSelectedPDF={setSelectedPDF}
          onFileSelect={(file) => {
            setSelectedPDF(file);
            setShowAgentPanel(true);
          }}
        />
      )
    },
    {
      id: 'chat',
      type: 'chat',
      size: 50,
      component: (
        <Chat
          selectedPDF={selectedPDF}
          isExpanded={false}
          onToggleExpand={() => {}}
        />
      )
    }
  ]);

  React.useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  React.useEffect(() => {
    if (selectedPDF) {
      setShowAgentPanel(true);
    }
  }, [selectedPDF]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleViewToggle = (view: ViewMode) => {
    setActiveView(view);
    
    if (view === 'document') {
      setLayoutPanes([{
        id: 'document',
        type: 'document',
        size: 100,
        component: (
          <PDFViewer
            selectedPDF={selectedPDF}
            setSelectedPDF={setSelectedPDF}
            onFileSelect={(file) => {
              setSelectedPDF(file);
              setShowAgentPanel(true);
            }}
          />
        )
      }]);
    } else if (view === 'chat') {
      setLayoutPanes([{
        id: 'chat',
        type: 'chat',
        size: 100,
        component: (
          <Chat
            selectedPDF={selectedPDF}
            isExpanded={true}
            onToggleExpand={() => {}}
          />
        )
      }]);
    } else if (view === 'agent') {
      setLayoutPanes([{
        id: 'agent',
        type: 'agent',
        size: 100,
        component: (
          <AgentPanel
            onAgentSelect={setSelectedAgent}
            selectedAgent={selectedAgent}
            onClose={() => setShowAgentPanel(false)}
          />
        )
      }]);
    } else if (view === 'split') {
      setLayoutPanes([
        {
          id: 'document',
          type: 'document',
          size: 40,
          component: (
            <PDFViewer
              selectedPDF={selectedPDF}
              setSelectedPDF={setSelectedPDF}
              onFileSelect={(file) => {
                setSelectedPDF(file);
                setShowAgentPanel(true);
              }}
            />
          )
        },
        {
          id: 'chat',
          type: 'chat',
          size: 30,
          component: (
            <Chat
              selectedPDF={selectedPDF}
              isExpanded={false}
              onToggleExpand={() => {}}
            />
          )
        },
        {
          id: 'agent',
          type: 'agent',
          size: 30,
          component: (
            <AgentPanel
              onAgentSelect={setSelectedAgent}
              selectedAgent={selectedAgent}
              onClose={() => setShowAgentPanel(false)}
            />
          )
        }
      ]);
    }
  };

  const handleRemovePane = (id: string) => {
    const remainingPanes = layoutPanes.filter(pane => pane.id !== id);
    const totalSize = remainingPanes.reduce((sum, pane) => sum + pane.size, 0);
    
    if (remainingPanes.length > 0) {
      const adjustmentFactor = 100 / totalSize;
      setLayoutPanes(
        remainingPanes.map(pane => ({
          ...pane,
          size: pane.size * adjustmentFactor
        }))
      );
    }
  };

  const handleResizePane = (id: string, newSize: number) => {
    setLayoutPanes(panes => {
      const paneIndex = panes.findIndex(p => p.id === id);
      if (paneIndex === -1) return panes;

      const newPanes = [...panes];
      const oldSize = newPanes[paneIndex].size;
      const sizeDiff = newSize - oldSize;

      newPanes[paneIndex] = { ...newPanes[paneIndex], size: newSize };
      
      if (paneIndex < newPanes.length - 1) {
        newPanes[paneIndex + 1] = {
          ...newPanes[paneIndex + 1],
          size: newPanes[paneIndex + 1].size - sizeDiff
        };
      }

      return newPanes;
    });
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex pt-16">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <ViewToggle 
            activeView={activeView} 
            onViewToggle={handleViewToggle}
            availableViews={['document', 'chat', ...(showAgentPanel ? ['agent'] : [])]}
          />
          
          <FlexibleLayout
            panes={layoutPanes}
            onRemovePane={handleRemovePane}
            onResizePane={handleResizePane}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<MainApp />} />
    </Routes>
  );
}