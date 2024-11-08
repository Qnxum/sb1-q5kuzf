import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Menu, Moon, Sun, BrainCircuit } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
}

export default function Header({ isDarkMode, toggleTheme, toggleSidebar }: HeaderProps) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          {!isHome && (
            <>
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Toggle Sidebar"
              >
                <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              <Link
                to="/"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Home"
              >
                <Home className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </Link>
              <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
            </>
          )}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10">
              <BrainCircuit className="w-5 h-5 text-blue-500" />
            </div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">StratXpert</h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-gray-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}