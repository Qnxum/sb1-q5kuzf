import React from 'react';
import { 
  Settings, Bell, Volume2, Palette, MessageSquare, 
  Zap, Shield, X, VolumeX, BellOff 
} from 'lucide-react';

interface ChatSidebarProps {
  selectedTheme: 'default' | 'minimal' | 'compact';
  onThemeChange: (theme: 'default' | 'minimal' | 'compact') => void;
  notificationsEnabled: boolean;
  onNotificationsChange: (enabled: boolean) => void;
  soundEnabled: boolean;
  onSoundChange: (enabled: boolean) => void;
  onClose: () => void;
}

export default function ChatSidebar({
  selectedTheme,
  onThemeChange,
  notificationsEnabled,
  onNotificationsChange,
  soundEnabled,
  onSoundChange,
  onClose
}: ChatSidebarProps) {
  return (
    <div className="h-full bg-gray-900 flex flex-col">
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Settings className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-semibold text-white">Chat Settings</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          <section>
            <h3 className="flex items-center space-x-2 text-sm font-medium text-white mb-3">
              <Palette className="w-4 h-4" />
              <span>Appearance</span>
            </h3>
            <div className="space-y-2">
              {[
                { id: 'default', label: 'Default' },
                { id: 'minimal', label: 'Minimal' },
                { id: 'compact', label: 'Compact' }
              ].map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => onThemeChange(theme.id as any)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                    selectedTheme === theme.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  <span>{theme.label}</span>
                  {selectedTheme === theme.id && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="flex items-center space-x-2 text-sm font-medium text-white mb-3">
              <MessageSquare className="w-4 h-4" />
              <span>Chat Behavior</span>
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => onNotificationsChange(!notificationsEnabled)}
                className="w-full flex items-center justify-between p-2 rounded-lg text-gray-400 hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  {notificationsEnabled ? (
                    <Bell className="w-4 h-4" />
                  ) : (
                    <BellOff className="w-4 h-4" />
                  )}
                  <span>Notifications</span>
                </div>
                <div className={`w-8 h-4 rounded-full transition-colors ${
                  notificationsEnabled ? 'bg-blue-600' : 'bg-gray-700'
                }`}>
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                    notificationsEnabled ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </div>
              </button>

              <button
                onClick={() => onSoundChange(!soundEnabled)}
                className="w-full flex items-center justify-between p-2 rounded-lg text-gray-400 hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  {soundEnabled ? (
                    <Volume2 className="w-4 h-4" />
                  ) : (
                    <VolumeX className="w-4 h-4" />
                  )}
                  <span>Sound Effects</span>
                </div>
                <div className={`w-8 h-4 rounded-full transition-colors ${
                  soundEnabled ? 'bg-blue-600' : 'bg-gray-700'
                }`}>
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                    soundEnabled ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </div>
              </button>
            </div>
          </section>

          <section>
            <h3 className="flex items-center space-x-2 text-sm font-medium text-white mb-3">
              <Shield className="w-4 h-4" />
              <span>Privacy</span>
            </h3>
            <div className="p-3 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400">
                Your conversations are end-to-end encrypted and never stored permanently.
              </p>
            </div>
          </section>

          <section>
            <h3 className="flex items-center space-x-2 text-sm font-medium text-white mb-3">
              <Zap className="w-4 h-4" />
              <span>Performance</span>
            </h3>
            <div className="space-y-2">
              <div className="p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                  <span>Response Time</span>
                  <span>120ms</span>
                </div>
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-green-500 rounded-full" />
                </div>
              </div>
              <div className="p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                  <span>Memory Usage</span>
                  <span>45MB</span>
                </div>
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full w-1/4 bg-blue-500 rounded-full" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}