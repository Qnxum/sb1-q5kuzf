import React from 'react';
import { BookOpen, MessageSquare, Users } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const menuItems = [
    { icon: BookOpen, label: 'Documents', count: 0 },
    { icon: MessageSquare, label: 'Conversations', count: 1 },
    { icon: Users, label: 'Collaborators', count: 0 },
  ];

  if (!isOpen) return null;

  return (
    <div className="w-64 border-r dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="p-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <item.icon className="w-5 h-5" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.count > 0 && (
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 text-xs font-medium px-2 py-0.5 rounded-full">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}